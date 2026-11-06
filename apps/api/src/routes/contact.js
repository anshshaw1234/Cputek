import express from "express";
import Contact from "../models/Contact.js";
import authMiddleware from "../middleware/auth.js";
import { sendContactEmail } from "../services/emailService.js";
import { addToGoogleSheet } from "../services/googleSheetsService.js";

const router = express.Router();
const validStatuses = new Set(["New", "Contacted", "Converted"]);
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.post("/send-email", async (req, res) => {
  const { name, email, phone = "", subject = "", message } = req.body ?? {};

  if (
    typeof name !== "string" ||
    !name.trim() ||
    typeof email !== "string" ||
    !emailPattern.test(email.trim()) ||
    typeof phone !== "string" ||
    typeof message !== "string" ||
    !message.trim() ||
    name.length > 200 ||
    email.length > 320 ||
    phone.length > 100 ||
    typeof subject !== "string" ||
    subject.length > 300 ||
    message.length > 10000
  ) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid name, email address, and message.",
    });
  }

  const contactDetails = {
    name: name.trim(),
    email: email.trim(),
    phone: phone.trim(),
    subject: subject.trim(),
    message: message.trim(),
  };

  let contact;
  try {
    contact = await Contact.create(contactDetails);
  } catch (error) {
    console.error("Contact submission could not be saved:", error.message);
    return res.status(500).json({
      success: false,
      message: "We could not save your message. Please try again.",
    });
  }

  addToGoogleSheet(contactDetails).catch((error) => {
    console.error("Contact could not be added to the Google Sheet:", error.message);
  });

  try {
    await sendContactEmail(contactDetails);
  } catch (error) {
    console.error("Contact notification email could not be sent:", error.message);
    return res.status(502).json({
      success: false,
      saved: true,
      contactId: contact._id,
      message:
        "Your message was saved, but the email notification could not be sent. Please contact us by phone if your inquiry is urgent.",
    });
  }

  return res.status(202).json({
    success: true,
    saved: true,
    message: "Your message was sent successfully.",
  });
});

router.get("/leads", authMiddleware, async (_req, res) => {
  try {
    const [leads, total] = await Promise.all([
      Contact.find().sort({ createdAt: -1 }).limit(50).lean(),
      Contact.countDocuments(),
    ]);

    return res.status(200).json({
      success: true,
      leads,
      total,
    });
  } catch (error) {
    console.error("Contact submissions could not be loaded:", error.message);
    return res.status(500).json({
      success: false,
      message: "Contact submissions could not be loaded.",
    });
  }
});

router.patch("/leads/:id/status", authMiddleware, async (req, res) => {
  const { status } = req.body ?? {};
  if (!validStatuses.has(status)) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid contact status.",
    });
  }

  try {
    const updatedLead = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true },
    );

    if (!updatedLead) {
      return res.status(404).json({
        success: false,
        message: "Contact submission not found.",
      });
    }

    return res.status(200).json({
      success: true,
      lead: updatedLead,
    });
  } catch (error) {
    console.error("Contact status could not be updated:", error.message);
    return res.status(500).json({
      success: false,
      message: "Contact status could not be updated.",
    });
  }
});

router.delete("/leads/:id", authMiddleware, async (req, res) => {
  try {
    const deletedLead = await Contact.findByIdAndDelete(req.params.id);
    if (!deletedLead) {
      return res.status(404).json({
        success: false,
        message: "Contact submission not found.",
      });
    }

    return res.status(200).json({
      success: true,
      deletedLead,
    });
  } catch (error) {
    console.error("Contact submission could not be deleted:", error.message);
    return res.status(500).json({
      success: false,
      message: "Contact submission could not be deleted.",
    });
  }
});

export default router;

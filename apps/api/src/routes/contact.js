import express from "express";
import Contact from "../models/Contact.js";
import { sendContactEmail } from "../services/emailService.js";
import { addToGoogleSheet } from "../services/googleSheetsService.js";

const router = express.Router();

console.log("NEW CONTACT.JS LOADED");
router.post("/send-email", async (req, res) => {
  try {
    console.log("CONTACT ROUTE HIT");
    console.log("BODY:", req.body);

    // Save contact to MongoDB first
    const contact = await Contact.create(req.body);

    console.log("SAVED:", contact._id);

    // Respond immediately to frontend
    res.status(202).json({
      success: true,
      message: "Message received successfully",
    });

    // Continue background processing
    sendContactEmail(req.body)
      .then(() => {
        console.log("✅ EMAIL SENT SUCCESSFULLY");
      })
      .catch((error) => {
        console.error("❌ EMAIL ERROR:", error);
      });

    addToGoogleSheet(req.body)
      .then(() => {
        console.log("✅ GOOGLE SHEET UPDATED");
      })
      .catch((error) => {
        console.error("❌ GOOGLE SHEET ERROR:", error);
      });

  } catch (error) {
    console.error("SAVE ERROR:", error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});


router.get("/leads", async (req, res) => {
  try {
    const leads = await Contact.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      leads,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

router.patch("/leads/:id/status", async (req, res) => {
  try {
    const { status } = req.body;

    const updatedLead = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.status(200).json({
      success: true,
      lead: updatedLead,
    });
  } catch (error) {
    console.error("STATUS UPDATE ERROR:", error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

router.delete("/leads/:id", async (req, res) => {
  try {
    console.log("DELETE ROUTE HIT");
    console.log("ID:", req.params.id);

    const deletedLead = await Contact.findByIdAndDelete(
      req.params.id
    );

    console.log("DELETED LEAD:", deletedLead);

    const remaining = await Contact.countDocuments();

    console.log("REMAINING LEADS:", remaining);

    res.status(200).json({
      success: true,
      deletedLead,
    });
  } catch (error) {
    console.error("DELETE ERROR:", error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});
export default router;
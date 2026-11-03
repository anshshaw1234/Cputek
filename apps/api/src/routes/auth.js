import { timingSafeEqual } from "node:crypto";
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


import Admin from "../models/Admin.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.json({
      success: true,
      message: "Auth route is working",
    });
  });

  router.post("/login", async (req, res) => {
    try {
      const { username, email, password } = req.body ?? {};
      const loginName = typeof username === "string" ? username : email;
  
      if (typeof loginName !== "string" || typeof password !== "string" || !password) {
        return res.status(400).json({
          success: false,
          message: "Username and password are required",
        });
      }
  
      if (!process.env.JWT_SECRET) {
        return res.status(503).json({
          success: false,
          message: "Admin login is not configured on the server.",
        });
      }

      const normalizedLoginName = loginName.trim().toLowerCase();
      const admin = await Admin.findOne({
        $or: [{ username: normalizedLoginName }, { email: normalizedLoginName }],
      });
  
      if (!admin) {
        return res.status(401).json({
          success: false,
          message: "Invalid username or password",
        });
      }
  
      const isMatch = await bcrypt.compare(password, admin.password);
  
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: "Invalid username or password",
        });
      }
  
      const token = jwt.sign(
        {
          id: admin._id,
          username: admin.username,
          email: admin.email,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_EXPIRES || "7d",
        }
      );
  
      res.json({
        success: true,
        message: "Login successful",
        token,
        admin: {
          id: admin._id,
          name: admin.name,
          username: admin.username,
          email: admin.email,
        },
      });
    } catch (error) {
      console.error("Admin login failed:", error.message);
  
      res.status(500).json({
        success: false,
        message: "Unable to log in. Please try again.",
      });
    }
  });



  router.post("/register", async (req, res) => {
    try {
      const { name, username, email, password } = req.body ?? {};

      const registrationSecret = process.env.ADMIN_REGISTRATION_SECRET;
      const providedSecret = req.get("x-admin-registration-secret") || "";
      const expectedSecretBuffer = Buffer.from(registrationSecret || "");
      const providedSecretBuffer = Buffer.from(providedSecret);
      if (
        !registrationSecret ||
        expectedSecretBuffer.length !== providedSecretBuffer.length ||
        !timingSafeEqual(expectedSecretBuffer, providedSecretBuffer)
      ) {
        return res.status(registrationSecret ? 401 : 503).json({
          success: false,
          message: registrationSecret
            ? "Invalid admin registration credentials."
            : "Admin registration is not configured.",
        });
      }

      if (await Admin.exists()) {
        return res.status(403).json({
          success: false,
          message: "Initial admin registration is already complete.",
        });
      }

      if (
        typeof name !== "string" ||
        !name.trim() ||
        typeof email !== "string" ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ||
        typeof password !== "string" ||
        password.length < 12
      ) {
        return res.status(400).json({
          success: false,
          message: "Provide a name, valid email, and password of at least 12 characters.",
        });
      }

      // Check existing admin
      const normalizedEmail = email.trim().toLowerCase();
      const existingAdmin = await Admin.findOne({ email: normalizedEmail });
  
      if (existingAdmin) {
        return res.status(400).json({
          success: false,
          message: "Admin already exists",
        });
      }
  
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Save admin
      const admin = await Admin.create({
        name: name.trim(),
        username: (typeof username === "string" && username.trim()
          ? username
          : email.split("@")[0]).trim().toLowerCase(),
        email: normalizedEmail,
        password: hashedPassword,
      });
  
      res.status(201).json({
        success: true,
        message: "Admin registered successfully",
        admin: {
          id: admin._id,
          name: admin.name,
          username: admin.username,
          email: admin.email,
        },
      });
    } catch (error) {
        console.error("REGISTER ERROR:", error);
      
        res.status(500).json({
          success: false,
          message: "Unable to register admin. Please try again.",
        });
      }
  });

export default router;
console.log("✅ AUTH.JS LOADED");
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
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "Email and password are required",
        });
      }
  
      const admin = await Admin.findOne({ email });
  
      if (!admin) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password",
        });
      }
  
      const isMatch = await bcrypt.compare(password, admin.password);
  
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password",
        });
      }
  
      const token = jwt.sign(
        {
          id: admin._id,
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
          email: admin.email,
        },
      });
    } catch (error) {
      console.error(error);
  
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  });



  router.post("/register", async (req, res) => {
    console.log("Headers:", req.headers);
    console.log("Body:", req.body);
  
    try {
      const { name, email, password } = req.body;
      // Validation
      if (!name || !email || !password) {
        return res.status(400).json({
          success: false,
          message: "All fields are required",
        });
      }
  
      // Check existing admin
      const existingAdmin = await Admin.findOne({ email });
  
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
        name,
        email,
        password: hashedPassword,
      });
  
      res.status(201).json({
        success: true,
        message: "Admin registered successfully",
        admin: {
          id: admin._id,
          name: admin.name,
          email: admin.email,
        },
      });
    } catch (error) {
        console.error("REGISTER ERROR:", error);
      
        res.status(500).json({
          success: false,
          message: error.message,
        });
      }
  });

export default router;
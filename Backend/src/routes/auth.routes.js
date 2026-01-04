import express from "express";
import { register, login } from "../controllers/auth.controller.js";

const router = express.Router();

// Middleware to validate password format (exactly 4 digits)
const validatePassword = (req, res, next) => {
  const { password } = req.body;

  // Check if password exists
  if (!password) {
    return res.status(400).json({ 
      message: "Password is required" 
    });
  }

  // Check if password is exactly 4 digits
  if (!/^\d{4}$/.test(password)) {
    return res.status(400).json({ 
      message: "Password must be exactly 4 digits" 
    });
  }

  // Password is valid, proceed to next middleware
  next();
};

// POST for registration
router.post("/register", validatePassword, register);

// POST for login
router.post("/login", validatePassword, login);

export default router;

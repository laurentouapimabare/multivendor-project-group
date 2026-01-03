// src/routes/auth.routes.js
import express from "express";
import { register, login } from "../controllers/auth.controller.js";

const router = express.Router();

// POST pour l'inscription (R majuscule)
router.post("/register", register);

// POST pour la connexion
router.post("/login", login);

export default router;


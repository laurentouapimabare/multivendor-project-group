import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// REGISTER
export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Tous les champs sont obligatoires" });
    }
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) return res.status(409).json({ message: "Email déjà utilisé" });
    const hashedPassword = await bcrypt.hash(password, 10);
    const allowedRoles = ["BUYER", "SELLER"];
    const userRole = allowedRoles.includes(role) ? role : "BUYER";
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: userRole,
    });
    res.status(201).json({
      message: "Inscription réussie",
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    console.log("=== DÉBUT LOGIN ===");
    console.log("📧 Email reçu:", email);
    console.log("🔑 Password reçu:", password);
    
    if (!email || !password) {
      return res.status(400).json({ message: "Email et mot de passe requis" });
    }
    
    const user = await User.findOne({ where: { email } });
    console.log("👤 Utilisateur trouvé:", user ? "OUI" : "NON");
    
    if (user) {
      console.log("📋 User ID:", user.id);
      console.log("📋 User email:", user.email);
      console.log("📋 User role:", user.role);
      console.log("🔒 Password dans DB (hashé):", user.password);
    }
    
    if (!user) {
      console.log("❌ Utilisateur non trouvé dans la base de données");
      return res.status(401).json({ message: "Identifiants invalides" });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("✅ Mot de passe correspond:", isMatch);
    
    if (!isMatch) {
      console.log("❌ Mot de passe incorrect");
      return res.status(401).json({ message: "Identifiants invalides" });
    }
    
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
    
    console.log("🎉 Connexion réussie!");
    console.log("=== FIN LOGIN ===");
    
    res.status(200).json({
      message: "Connexion réussie",
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    console.error("💥 Erreur serveur:", error);
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

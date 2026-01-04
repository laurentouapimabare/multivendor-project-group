// src/server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// Routes
import productRoutes from "./routes/product.routes.js";
import authRoutes from "./routes/auth.routes.js";

// Sequelize et modèles
import sequelize from "./config/db.js";
import User from "./models/User.js";
import Product from "./models/Product.js";
import { Order, OrderItem } from "./models/Order.js";

dotenv.config();

// Pour utiliser __dirname avec ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// ======================
// Middlewares
// ======================
app.use(cors());
app.use(express.json());


// Routes API

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);


// Servir le Frontend en Production

if (process.env.NODE_ENV === "production") {
  
  const frontendPath = path.join(__dirname, "../../Frontend/dist");
  app.use(express.static(frontendPath));
  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
} else {
  app.get("/", (req, res) => res.send(" API Multi-Vendor Marketplace OK"));
}


// Associations Sequelize

User.hasMany(Product, { foreignKey: "sellerId" });
Product.belongsTo(User, { foreignKey: "sellerId" });
User.hasMany(Order, { foreignKey: "buyerId" });
Order.belongsTo(User, { foreignKey: "buyerId" });
Order.belongsToMany(Product, { through: OrderItem });
Product.belongsToMany(Order, { through: OrderItem });


// Lancer le serveur

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log(" Connexion à PostgreSQL réussie");
    await sequelize.sync({ alter: true });
    console.log(" Tables synchronisées avec succès !");
    console.log(`Server running on port ${PORT}`);
    console.log(` Mode: ${process.env.NODE_ENV || "development"}`);
    if (process.env.NODE_ENV === "production") {
      console.log(" Serving frontend from dist folder");
    }
  } catch (err) {
    console.error(" Erreur de connexion à la DB :", err);
  }
});

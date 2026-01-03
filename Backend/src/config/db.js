// src/config/db.js
import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

// Création de la connexion Sequelize à PostgreSQL
const sequelize = new Sequelize(
  process.env.DB_NAME,      // nom de la base
  process.env.DB_USER,      // utilisateur
  process.env.DB_PASSWORD,  // mot de passe
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    dialect: "postgres",
    logging: false, // mettre true pour voir les requêtes SQL
  }
);

// Test de la connexion
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connexion à PostgreSQL via Sequelize réussie !");
  } catch (error) {
    console.error("Impossible de se connecter à PostgreSQL :", error);
  }
})();

export default sequelize;


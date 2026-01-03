// src/config/db.js
import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

// Connexion à PostgreSQL Render ou fallback local
const DATABASE_URL = process.env.DB_URL || "postgres://user:password@localhost:5432/your_local_db";

const sequelize = new Sequelize(DATABASE_URL, {
  dialect: "postgres",
  protocol: "postgres",
  logging: false, // mettre true pour debug
  dialectOptions: {
    ssl: process.env.DB_URL
      ? { require: true, rejectUnauthorized: false } // nécessaire pour Render
      : false,
  },
});

export default sequelize;

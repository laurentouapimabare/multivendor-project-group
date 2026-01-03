// src/config/db.js
import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

console.log('=== DEBUG DB CONNECTION ===');
console.log('DATABASE_URL env var:', process.env.DATABASE_URL ? 'DEFINED' : 'UNDEFINED');
console.log('NODE_ENV:', process.env.NODE_ENV);

const DATABASE_URL = process.env.DATABASE_URL || "postgres://user:password@localhost:5432/your_local_db";

console.log('Using DATABASE_URL:', DATABASE_URL.substring(0, 50) + '...');

const sequelize = new Sequelize(DATABASE_URL, {
  dialect: "postgres",
  protocol: "postgres",
  logging: false,
  dialectOptions: {
    ssl: process.env.DATABASE_URL
      ? { require: true, rejectUnauthorized: false }
      : false,
  },
});

export default sequelize;

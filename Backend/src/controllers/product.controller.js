// src/controllers/product.controller.js
import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";
import Product from "../models/Product.js";

// GET /api/products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/products
export const createProduct = async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const product = await Product.create({ name, price, description });
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


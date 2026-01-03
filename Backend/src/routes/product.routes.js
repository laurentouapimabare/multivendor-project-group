// src/routes/product.routes.js
import { Router } from "express";
import { getAllProducts, createProduct } from "../controllers/product.controller.js";
import auth from "../middleware/auth.middleware.js";
import role from "../middleware/role.middleware.js";

const router = Router();

// Routes
router.get("/", getAllProducts);          // <- vérifier que getAllProducts est bien exporté
router.post("/", auth, role(["SELLER"]), createProduct); // idem pour createProduct

export default router;


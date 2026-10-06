import { Router } from "express";

import {
  getProducts,
  getProductById,
  getProductByCategory,
  searchProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller";

import {
  authenticate
} from "../middleware/auth.middleware";

const router = Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.get("/:category", getProductByCategory);
router.get("/search", searchProduct);
router.post("/", authenticate, createProduct);
router.put("/:id", authenticate, updateProduct);
router.delete("/:id", authenticate, deleteProduct);

export default router;
import { Router } from "express";

import {
  createOrder,
  getOrderByNumber,
  getOrders,
  updateOrderStatus
} from "../controllers/order.controller";

import { authenticate } from "../middleware/auth.middleware";

const router = Router();

// Customer guest
router.post("/", createOrder);

// Admin - daftar semua pesanan
router.get(
  "/admin/all",
  authenticate,
  getOrders
);

// Admin - ubah status pesanan
router.put(
  "/admin/:orderNumber/status",
  authenticate,
  updateOrderStatus
);

// Customer - tracking pesanan
router.get(
  "/:orderNumber",
  getOrderByNumber
);

export default router;
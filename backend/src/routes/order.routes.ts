import { Router } from "express";

import {
  createOrder,
  getOrderByNumber
} from "../controllers/order.controller";

const router = Router();

// Customer guest
router.post("/", createOrder);

// Tracking pesanan
router.get("/:orderNumber", getOrderByNumber);

export default router;

import { Router } from "express";

import {
  getSlides,
  createSlide,
  updateSlide,
  deleteSlide
} from "../controllers/carousel.controller";

const router = Router();

router.get("/", getSlides);
router.post("/", createSlide);
router.put("/:id", updateSlide);
router.delete("/:id", deleteSlide);

export default router;
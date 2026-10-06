import { Router } from "express";
import { uploadImage } from "../controllers/upload.controller";

import {
  upload
} from "../middleware/upload.middleware";

import {
  authenticate
} from "../middleware/auth.middleware";

const router = Router();

router.post(
  "/:bucket",
  authenticate,
  upload.single("image"),
  uploadImage
);

export default router;
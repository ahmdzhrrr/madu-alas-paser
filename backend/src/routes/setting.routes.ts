import { Router } from "express";

import {
  getSetting,
  updateSetting
} from "../controllers/setting.controller";

const router = Router();

router.get("/", getSetting);

router.put("/", updateSetting);

export default router;
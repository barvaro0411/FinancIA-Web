// backend/routes/aiRoutes.js
import express from "express";
import { chatWithAI } from "../controllers/aiController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.use(authMiddleware);
router.post("/chat", chatWithAI);

export default router;

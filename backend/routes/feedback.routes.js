import express from "express";

import {
  createFeedback,
  getMyFeedback,
} from "../controllers/feedback.controller.js";

import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

// Submit Feedback
router.post("/", verifyToken, createFeedback);

// Get My Feedback
router.get("/my-feedback", verifyToken, getMyFeedback);

export default router;
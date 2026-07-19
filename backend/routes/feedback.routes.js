import express from "express";
import { createFeedback, getMyFeedback } from "../controllers/feedback.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();


// Protected feedback submit route
router.post("/", authMiddleware, createFeedback);


// Protected get user's feedback route
router.get("/my-feedback", authMiddleware, getMyFeedback);


export default router;
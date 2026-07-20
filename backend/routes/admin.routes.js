import express from "express";

import {
  getDashboard,
  getAllUsers,
  getAllFeedbacks,
  getLoginHistory,
} from "../controllers/admin.controller.js";

import {
  verifyToken,
  isAdmin,
} from "../middleware/auth.middleware.js";

const router = express.Router();

// ==============================
// Dashboard Statistics
// GET /api/admin/dashboard
// ==============================
router.get(
  "/dashboard",
  verifyToken,
  isAdmin,
  getDashboard
);

// ==============================
// Get All Users
// GET /api/admin/users
// ==============================
router.get(
  "/users",
  verifyToken,
  isAdmin,
  getAllUsers
);

// ==============================
// Get All Feedbacks
// GET /api/admin/feedbacks
// ==============================
router.get(
  "/feedbacks",
  verifyToken,
  isAdmin,
  getAllFeedbacks
);

// ==============================
// Get Login History
// GET /api/admin/login-history
// ==============================
router.get(
  "/login-history",
  verifyToken,
  isAdmin,
  getLoginHistory
);

export default router;
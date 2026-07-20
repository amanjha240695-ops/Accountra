import express from "express";

import {
  getDashboard,
  getAllUsers,
  getAllFeedbacks,
  getLoginHistory,
  getUserDetails,
  updateUserRole,
  deleteUser,
} from "../controllers/admin.controller.js";


import {
  verifyToken,
  isAdmin,
} from "../middleware/auth.middleware.js";


const router = express.Router();


// ==============================
// Dashboard
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
// Get Single User
// GET /api/admin/users/:id
// ==============================
router.get(
  "/users/:id",
  verifyToken,
  isAdmin,
  getUserDetails
);



// ==============================
// Update User Role
// PUT /api/admin/users/:id/role
// ==============================
router.put(
  "/users/:id/role",
  verifyToken,
  isAdmin,
  updateUserRole
);



// ==============================
// Delete User
// DELETE /api/admin/users/:id
// ==============================
router.delete(
  "/users/:id",
  verifyToken,
  isAdmin,
  deleteUser
);



// ==============================
// Feedbacks
// GET /api/admin/feedbacks
// ==============================
router.get(
  "/feedbacks",
  verifyToken,
  isAdmin,
  getAllFeedbacks
);



// ==============================
// Login History
// GET /api/admin/login-history
// ==============================
router.get(
  "/login-history",
  verifyToken,
  isAdmin,
  getLoginHistory
);


export default router;
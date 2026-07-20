import express from "express";
import { testDatabase, getProfile } from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";
const router = express.Router();

console.log("USER ROUTER FILE EXECUTED");


// Database test
router.get("/test", testDatabase);


// Protected profile route
router.get("/profile",verifyToken, getProfile);


export default router;
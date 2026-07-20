import express from "express";
import cors from "cors";

import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import feedbackRoutes from "./routes/feedback.routes.js";
import adminRoutes from "./routes/admin.routes.js";

const app = express();


// middleware
app.use(cors());
app.use(express.json());


// Test app route
app.get("/test", (req, res) => {
    res.json({
        success: true,
        message: "App route working"
    });
});


// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/admin",adminRoutes)


// default route
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Welcome to Accountra API"
    });
});


export { app };
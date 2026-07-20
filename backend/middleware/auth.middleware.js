import jwt from "jsonwebtoken";

// ==============================
// Verify JWT Token
// ==============================
const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Authorization token missing.",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Invalid token format.",
      });
    }

const decoded = jwt.verify(
  token,
  process.env.JWT_SECRET
);

console.log("JWT USER:", decoded);

req.user = decoded;
    next();

  } catch (error) {

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });

  }
};


// ==============================
// Admin Middleware
// ==============================
const isAdmin = (req, res, next) => {
  try {

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated.",
      });
    }


    if (req.user.role !== "admin") {

      return res.status(403).json({
        success: false,
        message: "Access denied. Admin only.",
      });

    }


    next();


  } catch (error) {

    return res.status(500).json({
      success: false,
      message: "Authorization failed.",
    });

  }
};


export {
  verifyToken,
  isAdmin,
};
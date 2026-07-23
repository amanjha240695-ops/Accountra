import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js";

// =============================
// REGISTER USER
// =============================
const registerUser = async (req, res) => {
  try {
    const { username, email, phoneNumber, password } = req.body;

    // Check required fields
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Username, email and password are required.",
      });
    }

    // Check existing email
    const existingEmail = await prisma.user.findUnique({
      where: { email },
    });

    if (existingEmail) {
      return res.status(409).json({
        success: false,
        message: "Email already registered.",
      });
    }

    // Check existing username
    const existingUsername = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUsername) {
      return res.status(409).json({
        success: false,
        message: "Username already taken.",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
  // Convert empty phone number to null
const normalizedPhone =
  phoneNumber && phoneNumber.trim() !== ""
    ? phoneNumber.trim()
    : null;

const user = await prisma.user.create({
  data: {
    username,
    email,
    phoneNumber: normalizedPhone,
    password: hashedPassword,
  },
});

    res.status(201).json({
      success: true,
      message: "User registered successfully.",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =============================
// LOGIN USER
// =============================
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Compare password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid password.",
      });
    }

    // Update last login
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        lastLogin: new Date(),
      },
    });

    // Save login history
    await prisma.loginHistory.create({
      data: {
        userId: user.id,
        ipAddress: req.ip || "Unknown",
      },
    });

    // Create JWT Token
 const token = jwt.sign(
  {
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "7d",
  }
);
    // Response
    res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
          user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
    }
});
 
  } catch (error) {
    console.error("LOGIN ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { registerUser, loginUser };
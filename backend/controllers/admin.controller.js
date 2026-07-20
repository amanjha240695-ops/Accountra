import prisma from "../config/prisma.js";

// ==============================
// Dashboard
// ==============================
const getDashboard = async (req, res) => {
  try {
    const totalUsers = await prisma.user.count();

    const totalFeedbacks = await prisma.feedback.count();

    const totalLogins = await prisma.loginHistory.count();

    const recentUsers = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    const recentFeedbacks = await prisma.feedback.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
      include: {
        user: {
          select: {
            username: true,
            email: true,
          },
        },
      },
    });

    res.status(200).json({
      success: true,
      dashboard: {
        totalUsers,
        totalFeedbacks,
        totalLogins,
        recentUsers,
        recentFeedbacks,
      },
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Get All Users
// ==============================
const getAllUsers = async (req, res) => {
  try {

    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        username: true,
        email: true,
        phoneNumber: true,
        role: true,
        lastLogin: true,
        createdAt: true,
      },
    });

    res.status(200).json({
      success: true,
      users,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ==============================
// Get All Feedbacks
// ==============================
const getAllFeedbacks = async (req, res) => {

  try {

    const feedbacks = await prisma.feedback.findMany({

      orderBy: {
        createdAt: "desc",
      },

      include: {
        user: {
          select: {
            username: true,
            email: true,
          },
        },
      },

    });

    res.status(200).json({
      success: true,
      feedbacks,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

// ==============================
// Login History
// ==============================
const getLoginHistory = async (req, res) => {

  try {

    const history = await prisma.loginHistory.findMany({

      orderBy: {
        loginAt: "desc",
      },

      include: {
        user: {
          select: {
            username: true,
            email: true,
          },
        },
      },

    });

    res.status(200).json({
      success: true,
      history,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

export {
  getDashboard,
  getAllUsers,
  getAllFeedbacks,
  getLoginHistory,
};
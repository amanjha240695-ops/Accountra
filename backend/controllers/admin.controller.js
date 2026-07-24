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

console.log("Dashboard Data:", {
  totalUsers,
  totalFeedbacks,
  totalLogins,
  recentUsers,
  recentFeedbacks,
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


  } catch(error) {
console.error("Dashboard Error:", error);

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

        createdAt:"desc",

      },


      select: {

        id:true,
        username:true,
        email:true,
        phoneNumber:true,
        role:true,
        lastLogin:true,
        createdAt:true,

      },


    });


    res.status(200).json({

      success:true,
      users,

    });


  } catch(error) {


    res.status(500).json({

      success:false,
      message:error.message,

    });


  }

};



// ==============================
// Get Single User Details
// ==============================
const getUserDetails = async (req, res) => {

  try {


    const { id } = req.params;


    const user = await prisma.user.findUnique({

      where:{

        id:Number(id),

      },


      select:{

        id:true,
        username:true,
        email:true,
        phoneNumber:true,
        role:true,
        lastLogin:true,
        createdAt:true,

      },


    });



    if(!user){

      return res.status(404).json({

        success:false,
        message:"User not found",

      });

    }



    res.status(200).json({

      success:true,
      user,

    });



  } catch(error) {


    res.status(500).json({

      success:false,
      message:error.message,

    });


  }

};



// ==============================
// Update User Role
// ==============================
const updateUserRole = async (req,res)=>{

  try {


    const { id } = req.params;

    const { role } = req.body;



    if(!["user","admin"].includes(role)){


      return res.status(400).json({

        success:false,
        message:"Invalid role",

      });


    }



    const user = await prisma.user.update({

      where:{

        id:Number(id),

      },


      data:{

        role,

      },


    });



    res.status(200).json({

      success:true,

      message:"User role updated successfully",

      user,

    });



  } catch(error){


    res.status(500).json({

      success:false,
      message:error.message,

    });


  }

};



// ==============================
// Delete User
// ==============================
const deleteUser = async (req,res)=>{

  try {


    const { id } = req.params;



    await prisma.user.delete({

      where:{

        id:Number(id),

      },

    });



    res.status(200).json({

      success:true,

      message:"User deleted successfully",

    });



  } catch(error){


    res.status(500).json({

      success:false,
      message:error.message,

    });


  }

};



// ==============================
// Get All Feedbacks
// ==============================
const getAllFeedbacks = async (req, res) => {

  try {


    const feedbacks = await prisma.feedback.findMany({

      orderBy:{

        createdAt:"desc",

      },


      include:{

        user:{

          select:{

            username:true,
            email:true,

          },

        },

      },


    });



    res.status(200).json({

      success:true,
      feedbacks,

    });



  } catch(error){


    res.status(500).json({

      success:false,
      message:error.message,

    });


  }

};



// ==============================
// Login History
// ==============================
const getLoginHistory = async (req,res)=>{

  try {


    const history = await prisma.loginHistory.findMany({

      orderBy:{

        loginAt:"desc",

      },


      include:{

        user:{

          select:{

            username:true,
            email:true,

          },

        },

      },


    });



    res.status(200).json({

      success:true,
      history,

    });



  } catch(error){


    res.status(500).json({

      success:false,
      message:error.message,

    });


  }

};



// ==============================
// Export
// ==============================
export {

  getDashboard,

  getAllUsers,

  getUserDetails,

  updateUserRole,

  deleteUser,

  getAllFeedbacks,

  getLoginHistory,

};
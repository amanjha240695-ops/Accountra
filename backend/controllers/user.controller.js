import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


// Database test controller
export const testDatabase = async (req, res) => {

    try {

        const users = await prisma.user.findMany();

        res.json({
            success: true,
            message: "Database connected successfully.",
            users
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Database error."
        });

    }

};


// Get logged-in user profile
export const getProfile = async (req, res) => {

    try {

        const user = await prisma.user.findUnique({
            where: {
                id: req.user.id
            },
            select: {
                id: true,
                username: true,
                email: true,
                phoneNumber: true,
                createdAt: true
            }
        });


        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }


        res.json({
            success: true,
            user
        });


    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Internal server error."
        });

    }

};
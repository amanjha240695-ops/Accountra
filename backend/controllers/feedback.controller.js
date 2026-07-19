import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


// Create feedback
export const createFeedback = async (req, res) => {

    try {

        const { message, rating } = req.body;


        if (!message) {
            return res.status(400).json({
                success: false,
                message: "Feedback message is required."
            });
        }


        const feedback = await prisma.feedback.create({

            data: {
                message,
                rating,
                userId: req.user.id
            }

        });


        res.status(201).json({

            success: true,
            message: "Feedback submitted successfully.",
            feedback

        });


    } catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,
            message: "Internal server error."

        });

    }

};



// Get logged-in user's feedback
export const getMyFeedback = async (req, res) => {

    try {

        const feedbacks = await prisma.feedback.findMany({

            where: {
                userId: req.user.id
            },

            select: {
                id: true,
                message: true,
                rating: true,
                createdAt: true
            }

        });


        res.json({

            success: true,
            feedbacks

        });


    } catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,
            message: "Internal server error."

        });

    }

};
"use server"

import { db } from "@/lib/prisma";


export const getInterviewerProfile = async (interviewerId) => {
    try{
        const interviewer = await db.user.findUnique({
            where: { id: interviewerId,role: "INTERVIEWER" },
            select: {
                id: true,
                name: true,
                imageUrl: true,
                title: true,
                company: true,
                yearsExp: true,
                bio: true,
                categories: true,
                creditRate: true,
            },
        });
    }
    catch(error){
    }
};
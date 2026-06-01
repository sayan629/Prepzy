"use server"

import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";


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
                availabilities:{
                    where: { status: "AVAILABLE" },
                    select: { startTime: true, endTime: true },
                    take: 1,
                },
                bookingsAsInterviewer: {
                    where: { status: "SCHEDULED" },
                    select: { startTime: true, endTime: true },
                },
            },
        });
        return interviewer ?? null;
    }
    catch(error){
        console.error("Error fetching interviewer profile:", error);
        return null;
    }
};

export const bookSlot = async ({ interviewerId, startTime, endTime }) => {
    const user = await currentUser();
    if(!user) throw new Error("Unauthorized");

    // ---- Arject rate limit ---------------------------------------------------------

    const [dbUser, interviewer] = await Promise.all([
        db.user.findUnique({where: { clerkUserId: user.id }}),
        db.user.findUnique({where: { id: interviewerId }}),
    ]);
};
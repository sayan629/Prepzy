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

    if(!dbUser || dbUser.role !== "INTERVIEWEE") 
        throw new Error("Only interviewees can book slots");
    if(!interviewer || interviewer.role !== "INTERVIEWER")
        throw new Error("Invalid interviewer");

    const credits = interviewer.creditRate ?? 1;

    if (dbUser.credits < credits)
        throw new Error("Insufficient credits. Please Upgrade your plan.");


    //check if slot is still available
    const conflict = await db.booking.findFirst({
        where: {
            interviewerId,
            status: "SCHEDULED",
            startTime: { lt: new Date(endTime) },
            endTime: { gt: new Date(startTime) },
        },
    });

    if(conflict) 
        throw new Error("This slot has already been booked. Please choose another one.");

    // *** --- Create Stream Call -------------------------------------------------------------------
};
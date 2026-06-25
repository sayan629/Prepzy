"use server";
import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server"


export const setAvailability = async ({ startTime, endTime }) => {
    const user = await currentUser();
    if (!user) throw new Error("Unauthorized");

    const dbUser = await db.user.findUnique({ where: { clerkUserId: user.id }});
    if(!dbUser || dbUser.role !== "INTERVIEWER") throw new Error("Forbidden");

    if (!startTime || !endTime ) throw new Error("Start and end time required");
    if (new Date(startTime) >= new Date(endTime))
        throw new Error("Start time must be before end time");

    try {
        const existing = await db.availability.findFirst({
            where: { interviewerId: dbUser.id, status:"AVAILABLE" },
        });
    
        if(existing){
            await db.availability.update({
                where: {id:existing.id},
                data: { startTime: new Date(startTime), endTime: new Date(endTime)},
            });
        } else{
            await db.availability.create({
                data:{
                    interviewerId: dbUser.id,
                    startTime: new Date(startTime),
                    endTime: new Date(endTime),
                    status: "AVAILABLE",
                },
            });
        }
    } catch (error) {

    }
}
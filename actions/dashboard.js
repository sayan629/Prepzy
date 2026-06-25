"use server";
import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server"


export const setAvailability = async ({ startTime, endTime }) => {
    const user = await currentUser();
    if (!user) throw new Error("Unauthorized");

    const dbUser = await db.user.findUnique({ where: { clerkUserId: user.id }});
    if(!dbUser || dbUser.role !== "INTERVIEWER") throw new Error("Forbidden");
}
"use server";

import { currentUser } from "@clerk/nextjs/server"

export const getCallData = async (callId) => {
    const user = await currentUser();
    if (!user) return { error: "Unauthorized" };

    const booking = await db.booking.findUnique({
        where: {streamCallId: callId},
        include:{
            interviewer: {
                id: true,
                clerkUserId: true,
                name: true,
                imageUrl: true,
                categories: true,
            },
        },

        interviewee: {
            select: {
                id: true,
                clerkUserId: true,
                name: true,
                imageUrl: true,
            },
        },
    });
};
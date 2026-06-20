"use server";

import { currentUser } from "@clerk/nextjs/server"

export const getCallData = async (callId) => {
    const user = await currentUser();
    if (!user) return { error: "Unauthorized" };

    const booking = await db.booking.findUnique({
        where: {streamCallId: callId},
        include:{}
    });
};
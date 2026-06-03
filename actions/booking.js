"use server"

import { createRateLimiter } from "@/lib/arject";
import { db } from "@/lib/prisma";
import { request } from "@arcjet/next";
import { currentUser } from "@clerk/nextjs/server";
import { StreamClient } from "@stream-io/node-sdk";
import { revalidatePath } from "next/cache";

const bookingLimiter = createRateLimiter({
    refillRate: 2, // tokens
    interval: "1h", // 1 hour
    capacity: 5, // max tokens
});

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
      
      const req = await request();
        const rateLimitError = await checkRateLimit(bookingLimiter, req, user.id);
          if(rateLimitError) throw new Error(rateLimitError);




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
    let streamCallId;
    try{
        const streamClient = new StreamClient (
            process.env.NEXT_PUBLIC_STREAM_API_KEY,
            process.env.STREAM_SECRET_KEY
        );

        await streamClient.upsertUsers([
        {
            id: dbUser.clerkUserId,
            name: dbUser.name ?? "Interviewee",
            image: dbUser.imageUrl ?? undefined,
            role: "user",
        },
        {
        id: interviewer.clerkUserId,
        name: interviewer.name ?? "Interviewer",
        image: interviewer.imageUrl ?? undefined,
        role: "user",
        },
    ]);

    streamCallId = `mock_${Date.now()}_${Math.random()
        .toString(36)
        .substring(2, 7)}`;

        const { call } = streamClient.video.call("default", streamCallId);

        await call.getOrCreate({
            data:{
                created_by_id : dbUser.clerkUserId,
                members:[
                    { user_id: dbUser.clerkUserId , role: "host"},
                    { user_id: interviewer.clerkUserId , role: "host"}
                ],
                settings_override: {
                    recording: {mode: "available", quality: "1080p"},
                    screensharing: {
                        enabled: true,  // target_resolution: { width: 1920, height: 1080 },
                    },
                    transcription: {
                        mode: "auto-on",   // starts when first user joins, stops when all leave
                    },
                },
            },
        });
    }
    catch(error){
        console.error("Stream call creation failed:", err);
        throw new Error("Failed to create video call. Please try again.");
    }
    try{
        const booking = await db.$transaction(async (tx) => {
            const newBooking = await tx.booking.create({
                data: {
                    intervieweeId: dbUser.id,
                    interviewerId,
                    startTime: new Date(startTime),
                    endTime: new Date(endTime),
                    status: "SCHEDULED",
                    creditsCharged: credits,
                    streamCallId,
                },
            });
            await tx.creditTransaction.create({
                data: {
                    userId: dbUser.id,
                    amount: -credits,
                    type: "BOOKING_DEDUCTION",
                    bookingId: newBooking.id,
                },
            });
            await tx.user.update({
                where: { id: dbUser.id },
                data: { credits: { decrement: credits } },
                });

            await tx.user.update({
                where: { id: interviewerId },
                data: { creditBalance: { increment: credits } },
                });

            return newBooking;
    });

      revalidatePath(`/interviewers/${interviewerId}`);
      revalidatePath("/dashboard");

      return { success: true, bookingId: booking.id, streamCallId };

    } catch(error){
        console.error("bookSlot transaction failed:", err);
        throw new Error("Failed to book the slot. Please try again.");
    }
};
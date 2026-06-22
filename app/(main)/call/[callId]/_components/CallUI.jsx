"use client";

import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import { useEffect, useState } from "react";
import { useCreateChatClient } from "stream-chat-react";
import "stream-chat-react/dist/css/v2/index.css";



// ---- Call UI (inside StreamCall context) ------------------------

export default function CallUI({
    callId,
    isInterviewer,
    booking,
    onLeave,
    apiKey,
    token,
    currentUser,
}) {
    const { useCallCallingState } = useCallStateHooks();
    const call = useCall();
    const callingState = useCallCallingState();

    const [activeTab, setActiveTab] = useState("chat");

    const chatClient = useCreateChatClient({
        apiKey,
        tokenOrProvider:token,
        userData: {
            id: currentUser.id,
            name: currentUser.name,
            image: currentUser.imageUrl,
        },
    });

    const[chatChannel, setChatChannel] = useState(null);

    useEffect (() => {
        if (!chatClient) return;

        const channel = chatClient.channel("messaging", callId, {
            name: "Interview Chat",
            members: [
                booking.interviewer.clerkUserId,
                booking.interviewee.clerkUserId,
            ],
        });

        channel
            .watch()
            .then(() => setChatChannel(channel))
            .catch(console.error);

            return () => {
                channel.stopWatching().catch(() => {});
            };
    },[chatClient, callId, booking]);


}
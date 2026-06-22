"use client";

import { Badge } from "@/components/ui/badge";
import { CallingState, useCall, useCallStateHooks } from "@stream-io/video-react-sdk";
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

        if(callingState === CallingState.LEFT){
            return(
                <div className="min-h-screen bg-[#0a0a0b] flex flex-col items-center justify-center gap-3">
                    <p className="text-stone-400 text-sm"> Leaving call…</p>
                </div>
            );
        }

    return(
        <div className="min-h-[92vh] bg-[#0a0a0b] flex flex-col overflow-hidden">
            {/*... Top bar... */}
            <div className="flex items-center justify-between px-6 py-3 border-b border-white/8 shrink-0">
                 <div className="flex items-center gap-2">
                    <Badge
                        variant="outline"
                        className="border-white/10 text-stone-500 text-xs"
                        >
                            {booking.interviewer.name}
                            <span className="text-stone-700 mx-1.5">×</span>
                            {booking.interviewee.name}
                    </Badge>

                    {isInterviewer && (
                        <Badge
                            variant="outline"
                            className= "border-amber-400/20 bg-amber-400/5 text-amber-400 text-xs" >
                                Interviewer
                            </Badge>
                    )}
                 </div>
            </div>

            <div className="flex flex-1 min-h-0">
                <div className="flex flex-col flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                        <Badge
                            variant="outline"
                            className="border-white/10 text-stone-500 text-xs">
                                    {booking.interviewer.name}
                                    <span className="text-stone-700 mx-1.5">×</span>
                                    {booking.interviewee.name}
                            </Badge>
                    </div>
                </div>
            </div>
        </div>
    );
};
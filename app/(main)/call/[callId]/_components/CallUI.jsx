"use client";

import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";
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

    
}
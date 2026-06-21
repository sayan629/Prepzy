"use client";

import { useRef, useState } from "react";


export default function CallRoom({
    callId,
    token,
    apiKey,
    currentUser,
    booking,
    isInterviewer,
}) {
    const [videoClient, setVideoClient] = useState(null);
    const [ callId, setCall] = useState(null);

    const clientRef = useRef(null);
    const joinedRef = useRef(false);
}
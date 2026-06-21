"use client";


import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";


export default function CallRoom({
    callId,
    token,
    apiKey,
    currentUser,
    booking,
    isInterviewer,
}) {
    const router = useRouter();
    const [videoClient, setVideoClient] = useState(null);
    const [ callId, setCall] = useState(null);

    const clientRef = useRef(null);
    const joinedRef = useRef(false);

    useEffect(() => {})

    const handleLeave = useCallback(() => {
        router.push(isInterviewer ? "/dashboard" : "/appointments");
    }, [isInterviewer, router]);

    
    })
};
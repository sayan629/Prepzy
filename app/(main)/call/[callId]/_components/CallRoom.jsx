"use client";


import { StreamVideoClient } from "@stream-io/video-react-sdk";
import { Loader2 } from "lucide-react";
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

    useEffect(() => {
        // Guard against React StrictMode double-invoke in development
        if(joinedRef.current) return;
        joinedRef.current = true;

        const client = new StreamVideoClient({
            apiKey,
            user:{
                id: currentUser.id,
                name: currentUser.name,
                image: currentUser.imageUrl,
            },
            token,
        });
    }, []);

    const handleLeave = useCallback(() => {
        router.push(isInterviewer ? "/dashboard" : "/appointments");
    }, [isInterviewer, router]);

    if(!videoClient || !call){
        return (
            <div className="min-h-screen bg-[#0a0a0b] flex flex-col items-center justify-center gap-3 ">
                <Loader2 size={28} className="text-amber-400 animate-spin"/>
                    <p className="text-stone-500 text-sm font-light">Connecting to call…</p>
            </div>
        );
    }
    })
};
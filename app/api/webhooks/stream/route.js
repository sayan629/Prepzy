import { db } from "@/lib/prisma";


export async function POST(request) {
    const body = await request.json();
    const eventType = body.type;

    if (
        eventType !== "call.transcription_ready" &&
        eventType !== "call.recording_ready"
    ){
    return Response.json({ ok: true });
    }
    const callCid = body.call_cid ?? "";
    const streamCallId = callCid.includes(":") ? callCid.split(":")[1] : callCid;

    if(!streamCallId){
       return Response.json({ ok: true });
    }

    try{
        const booking = await db.booking.findUnique({
        where: { streamCallId },
        include: {
            interviewer: {
            select: { id: true, clerkUserId: true, name: true, categories: true },
            },
            interviewee: {
            select: { id: true, clerkUserId: true, name: true },
            },
            feedback: { select: { id: true } },
        },
        });  
        
        if(!booking){
            return Response.json({ ok: true });
        }

        // ------- Recording ------
        if (eventType === "call.recording_ready"){
            const recordingUrl = body.call_recording?.url;

            if(!recordingUrl){
                return Response.json({ ok: true });
            }

            await db.booking.update({
                where: { id: booking.id},
                data: { recordingUrl },
            });
            return Response.json({ ok:true });
        }

        //----- Transcription -------
        if (eventType === "call.transcription_ready"){
            if(!booking.feedback){
                return Response.json({ ok:true });
            }

            const transcriptUrl = body.call_transcription?.url;
            if(!transcriptUrl){
                return Response.json({ ok:true });
            }

            // 1. Download JSONL from Stream CDN

            const transcriptRes = await fetch(transcriptUrl);
            const transcriptText = await transcriptRes.text();

            // 2. Parse JSONL into readable conversation
            const lines = transcriptText
                .trim()
                .split("\n")
                .filter(Boolean)
                .map((line) => {
                    try{
                        return JSON.parse(line);
                    } catch{
                        return null;
                    }
                })
                .filter((entry) => entry?.type === "speech");

        }
    } catch(error){

    }
}
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
        
    } catch(error){

    }
}
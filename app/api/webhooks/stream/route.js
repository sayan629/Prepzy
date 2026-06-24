

export async function POST(request) {
    const body = await request.json();
    const eventType = body.type;

    if (
        eventType !== "call.transcription_ready" &&
        eventType !== "call.recording_ready"
    ){
    return Response.json({ ok: true })
    }
    const callCid = body.call_cid ?? "";
    const streamCallId = callCid.includes(":") ? callCid.split(":")[1] : callCid;
}
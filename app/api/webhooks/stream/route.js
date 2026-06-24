

export async function POST(request) {
    const body = await request.json();
    const eventType = body.type;

    return Response.json({ message: "Subscribe" })
    
}
import { db } from "@/lib/prisma";

export default async function PayoutReviewPage({ params }{
    const { id } = await params;
    
    const payout = await db.payout.findUnique({
        where: { id },
        include: {
            interviewer: { select : {name:true, email:true }},
        },
    });
})
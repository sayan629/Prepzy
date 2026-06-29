import { SectionLabel } from "@/components/reusables";
import { db } from "@/lib/prisma";
import { notFound } from "next/navigation";


export default async function PayoutReviewPage({ params }{
    const { id } = await params;

    const payout = await db.payout.findUnique({
        where: { id },
        include: {
            interviewer: { select : {name:true, email:true }},
        },
    });
    if(!payout) notFound();

    return(
        <main className="min-h-screen bg-[#0a0a0b] text-stone-100 antialiased px-6 flex items-center justify-center">
        <div className="w-full max-w-sm flex flex-col gap-6">
            <SectionLabel>Admin</SectionLabel>
            <h1 className="font-serif text-4xl tracking-tighter mt-1">
            </h1>
        </div>
        </main>
    )

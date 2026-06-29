import { approvePayout } from "@/actions/payout";
import { GrayTitle } from "@/components/reusables";
import useFetch from "@/hooks/use-fetch";
import { useEffect, useState } from "react";

export default function PayoutReviewClient({ payout }){
    const [password, setPassword ] = useState("");
    const [done, setDone] = useState(payout.status === "PROCESSED");

    const { data, loading, error, fn: approveFn } = useFetch(approvePayout);

    useEffect(() => {
        if (data?.success) setDone(true);
    }, [data]);

    if(done){
        return (
            <div className="bg-[#0f0f11] border border-white/10 rounded-2xl p-10 flex flex-col items-center gap-3 text-center">
                <span className="text-3xl">✅</span>
                <p className="font-serif text-xl">
                    <GrayTitle>Withdrawal approved</GrayTitle>
                </p>
                <p className="text-xs text-stone-500 font-light">
                    {payout.interviewerName } · ${payout.netAmount.toFixed(2)} via{" "}
                    {payout.paymentMethod}
                </p>
            </div>
        );
    }
}
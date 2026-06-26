"use client";

import { setAvailability } from "@/actions/dashboard";
import { GrayTitle } from "@/components/reusables";
import useFetch from "@/hooks/use-fetch";
import { Clock } from "lucide-react";
import { useState } from "react";


export default function AvailabilitySection( { initial }){

    const [startTime, setStartTime ] = useState(
        initial?.startTime
            ? new Date(initial.startTime).toTimeString().slice(0,5)
            : "",
    );

    const [endTime, setEndTime] = useState(
        initial?.endTime
            ? new Date(initial.endTime).toTimeString().slice(0, 5)
            : "", 
    );

    const [saved, setSaved ] = useState(false);
    const { data, loading, error, fn:saveFn } = useFetch(setAvailability);

    return (
        <section className="bg-[#0f0f11] border border-white/10 rounded-2xl p-8 flex flex-col gap-7">
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
                <div>
                    <span className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-lg mb-4">
                        <Clock size={18} className="text-amber-400"/>
                    </span>

                    <h2 className="font-serif text-xl tracking-tight">
                        <GrayTitle>Daily availability window </GrayTitle>
                    </h2>
                     <p className="text-xs text-stone-500 font-light mt-1">
                        Interviewees can book within this window every day.
                     </p>
                </div>
            </div>
        </section>
    )
};


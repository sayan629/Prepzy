"use client";

import { setAvailability } from "@/actions/dashboard";
import { GrayTitle } from "@/components/reusables";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
                        <GrayTitle>Daily Availability </GrayTitle>
                    </h2>
                     <p className="text-xs text-stone-500 font-light mt-1">
                        Set the hours during which interviewees can book you each day.
                     </p>
                </div>

                {initial && (
                    <Badge
                        variant="outline"
                        className="shrink-0 border-green-500/20 bg-green-500/10 text-green-400"
                        >
                            Active
                        </Badge>
                )}
            </div>

            <div className="h-px bg-white/5" />
            
            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-4">
                    <Label className="text-stone-400 text-xs">Start Time</Label>
                    <Input
                        type="time"
                        value = {startTime}
                        onChange = {(e) => setStartTime(e.target.value)}
                        className="bg-[#141417] border-white/10 text-stone-100" />
                </div>
            </div>
        </section>
    )
};


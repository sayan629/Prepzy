import { GrayTitle } from '@/components/reusables';
import { ClipboardList } from 'lucide-react';
import React from 'react'

export default function AppointmentsSection({ appointments }){
    const now = new Date();
    const scheduled = appointments.filter(
        (a) => a.status === "SCHEDULED" && new Date(a.startTime) > now
    );
    const past = appointments.filter(
        (a) => a.status !== "SCHEDULED" || new Date(a.endTime) <= now,
    );

    return (
        <section className='flex flex-col gap-6'>
            <div className='bg-[#0f0f11] border border-white/10 rounded-2xl p-8'>
                <span className='w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center mb-4'>
                    <ClipboardList size={18} className='text-amber-400' />
                </span>
                <h2 className='font-serif text-xl tracking-tight'>
                    <GrayTitle>Appointments</GrayTitle>
                </h2>
                <p className='text-xs text-stone-500 font-light mt-1'>
                    All your scheduled and past sessions.
                </p>
            </div>
        </section>
    );
};
"use client";

import { bookSlot } from '@/actions/booking';
import { GrayTitle } from '@/components/reusables';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import UpgradeModal from '@/components/UpgradeModal';
import useFetch from '@/hooks/use-fetch';
import { formatDateTab, generateDates, generateSlots } from '@/lib/helpers';
import { useRouter } from 'next/navigation';
import React, { useMemo, useState } from 'react';


const SLOT_DURATION_MINUTES = 45;
const DAYS_AHEAD = 7;

const SlotPicker = ({interviewer , interviewerCredits, userCredits}) => {
    const router = useRouter();
    const dates = useMemo(() => generateDates(DAYS_AHEAD), []);
    const [selectedDate, setSelectedDate] = useState(dates[0]);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [upgradeOpen, setUpgradeOpen] = useState(false);


    const { data, loading, error, fn: bookFn } = useFetch(bookSlot);

    const availability = interviewer.availabilities?.[0];
    const canAffroad = userCredits >= interviewerCredits;

    const slots = useMemo(() => {
      if(!availability) return [];

      return generateSlots(
        selectedDate,
        availability.startTime,
        availability.endTime,
        interviewer.bookingAsInterviewer ?? [],
        SLOT_DURATION_MINUTES,
      );

    }, [selectedDate,availability,interviewer.bookingAsInterviewer]);

    const handleDateChange = (date) => {
      setSelectedDate(date);
      setSelectedSlot(null);
    };

    if(!availability){
      return(
        <div className='bg-[#0f0f11] border border-white/10 rounded-2xl p-8 text-center
        flex flex-col items-center gap-2'>
          <span className='text-2xl'>🕐</span>
          <p className='text-sm text-stone-500'>No availability set yet.</p>
          <p className='text-xs text-stone-700'>Check back later.</p>
        </div>
      );
    }


  return (
  <>
  <UpgradeModal
  open={upgradeOpen}
  onOpenChange={setUpgradeOpen}
  reason={`You need ${interviewerCredits} credits to book this season. Your current balance is ${userCredits}.`}
  />
  <div className='flex flex-col gap-4'>
    {/* ── Main picker card ── */}
    <div className='bg-[#0f0f11] border border-white/10 rounded-2xl p-5 flex flex-col gap-8' >
    
      {/* Header */}
      <div className='flex items-start justify-between gap-3'>
        <div>
          <h2 className='font-serif text-xl tracking-tight'>
            <GrayTitle>Book a Session</GrayTitle>
          </h2>
          <p className='text-xs text-stone-500 font-light mt-1'>
            Select a date and available time slot.
          </p>
        </div>

          <div className='text-right shrink-0'>
            <p className='text-xs text-stone-600'>Cost</p>
            <p className='font-serif text-2xl leading-none bg-linear-to-br from-amber-300 to-amber-500 bg-clip-text text-transparent'>
              {interviewerCredits}
              <span className='text-xs font-sans text-stone-500 ml-1'>
                cr
              </span>
            </p>   
          </div>
      </div>
       

         {/* Date tabs */}
         <div className='flex gap-2 overflow-x-auto pb-0.5 scrollbar-none -mx-1 px-1'>
          {dates.map((date)=>{
            const label = formatDateTab(date);
            const active = date.toDateString() === selectedDate.toDateString();
            return(
              <button
                key ={date.toDateString()}
                type ="button"
                onClick={()=> handleDateChange(date)}

                  className={`shrink-0 flex flex-col items-center px-3.5 py-2.5 rounded-xl border text-xs transition-all duration-200 ${
                    active
                      ? "border-amber-400/40 bg-amber-400/10 text-amber-400"
                      : "border-white/10 text-stone-500 hover:border-white/20 hover:text-stone-400"
                  }`}                               
                >
                  <span className='font-medium'>{label.top}</span>
                  <span
                    className={`mt-0.5 ${
                      active ? "text-amber-500/70" : "text-stone-700"}`}
                      >
                        {label.bottom}
                      </span>
                </button>
            );
          })}
         </div>

         <Separator/>
         
    </div>
  </div>
  </>
  );
};

export default SlotPicker;
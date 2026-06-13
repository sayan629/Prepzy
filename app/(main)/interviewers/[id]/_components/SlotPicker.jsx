"use client";

import { bookSlot } from '@/actions/booking';
import useFetch from '@/hooks/use-fetch';
import { generateDates, generateSlots } from '@/lib/helpers';
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
      
    }, [
        selectedDate,
        availability,
        interviewer.bookingAsInterviewer,
    ]);
  return <div>SlotPicker</div>
}

export default SlotPicker;
"use client";

import React, { useState } from 'react'

const AppointmentCard = ({booking, mode, isPast = false}) => {
    const [feedbackOpen, setFeedbackOpen] = useState(false);
    const{
        startTime,
        endTime,
        status,
        creditCharged,
        streamCallId,
        recordingUrl,
        feedback,
    } = booking;

    const person = 
        mode === 'interviewer' ? booking.interview : booking.interviewer;

    const creditsLabel =
     mode === "interviewer"
  return <div>AppointmentCard</div>

};

export default AppointmentCard
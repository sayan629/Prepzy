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
  return <div>AppointmentCard</div>

};

export default AppointmentCard
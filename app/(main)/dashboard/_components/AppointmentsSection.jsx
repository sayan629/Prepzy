import React from 'react'

export default function AppointmentsSection({ appointments }){
    const now = new Date();
    const scheduled = appointments.filter(
        (a) => a.status === "SCHEDULED" && new Date(a.startTime) > now
    );
    const past = appointments.filter(
        (a) => 
    )
}
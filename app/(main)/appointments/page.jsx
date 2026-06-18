import { getIntervieweeAppointments } from '@/actions/appointment';
import PageHeader from '@/components/reusables';
import React from 'react'

const MyAppointmentsPage = async () => {

    const appointments = await getIntervieweeAppointments();
    const now = new Date();
    const scheduled = appointments.filter(
        (a) => a.status === "SCHEDULED" && new Date(a.startTime) > now
    );
    const past = appointments.filter(
        (a) => a.status !== "SCHEDULED" && new Date(a.endTime) <= now
    );

  return <main className='min-h-screen bg-black'>
    <PageHeader
        label="My appointments"
        gray= "Your Interview"
        gold = "sessions"
        description= "All your upcoming ans past mock interviwes in one place."
        />
        <div classname = "max-w-6xl mx-auto px-8 lg:px-0 py-8 flex flex-col gap-14"></div>
    </main>;
};

export default MyAppointmentsPage
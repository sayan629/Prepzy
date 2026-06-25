import { getAvailability, getInterviewerAppointments, getInterviewerStats } from "@/actions/dashboard";
import { getCurrentUser } from "@/actions/user";



export default async function InterviewerDashboardPage() {

    const dbUser = await getCurrentUser();

    const [avaialability, appointments, stats ] =
    await Promise.all([
        getAvailability(),
        getInterviewerAppointments(),
        getInterviewerStats(),
    ]);

    return <main className="min-h-screen bg-black">
        
    </main>

};
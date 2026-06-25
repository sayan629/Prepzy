import { getAvailability, getInterviewerAppointments, getInterviewerStats } from "@/actions/dashboard";
import { getCurrentUser } from "@/actions/user";
import PageHeader from "@/components/reusables";



export default async function InterviewerDashboardPage() {

    const dbUser = await getCurrentUser();

    const [avaialability, appointments, stats ] =
    await Promise.all([
        getAvailability(),
        getInterviewerAppointments(),
        getInterviewerStats(),
    ]);

    return <main className="min-h-screen bg-black">
        {/* Page Head */}
        <PageHeader
            label = "Interviewer Dashboard"
            gray = "Welcome Back,"
            gold = {dbUser.name?.split(" ")[0] ?? "Interviewer"}
            description={
                dbUser.title && dbUser.comapny
                    ? `${dbUser.title} · ${dbUser.comapny}` : undefined
            }
            
    </main>

};
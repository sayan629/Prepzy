import { getAvailability, getInterviewerAppointments, getInterviewerStats } from "@/actions/dashboard";
import { getCurrentUser } from "@/actions/user";
import PageHeader from "@/components/reusables";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";



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
                dbUser.title && dbUser.company
                    ? `${dbUser.title} · ${dbUser.company}` : undefined
            }
            right={
                <div>
                    <p className="text-xs text-stone-600">Credit Balance</p>
                    <p className="font-serif text-3xl leading-none bg-linear-to-br from-amber-300 to-amber-500 bg-clip-text text-transparent text-right">
                        {stats?.creditBalance ?? 0}
                    </p>
                </div>
            }
            />

            <div className="max-w-6xl mx-auto px-8 py-10">
                <Tabs defaultValue="account" className="w-[400px]">
                    <TabsList>
                        <TabsTrigger value="account">Account</TabsTrigger>
                        <TabsTrigger value="password">Password</TabsTrigger>
                    </TabsList>
                    <TabsContent value="account">Make changes to your account here.</TabsContent>
                    <TabsContent value="password">Change your password here.</TabsContent>
                </Tabs>
            </div>
    </main>

};
import { getCallData } from '@/actions/call';
import { notFound, redirect } from 'next/navigation';
import { toast } from 'sonner';

export default async function CallPage({ params }){
  const { callId } = await params;

  const result = await getCallData(callId);
  if(result.error === "Unauthorized"){
    toast.error("You must be signed in to access this call");
    redirect("/");
  }
  if(result.error === "Call not found"){
    toast.error("This call does not exist");
    notFound()
  }
  if(result.error === "Forbidden"){
    redirect("/");
  }
  
};

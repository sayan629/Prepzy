import { getCallData } from '@/actions/call';
import React from 'react'
import { toast } from 'sonner';

export default async function CallPage({ params }){
  const { callId } = await params;

  const result = await getCallData(callId);
  if(result.error === "Unauthorized"){
    toast.error("You must be signed in to access this call");
    redirect("/");
  }
  if()
};

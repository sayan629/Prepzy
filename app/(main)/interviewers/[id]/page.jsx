import { getInterviewerProfile } from '@/actions/booking';
import { Button } from '@/components/animate-ui/primitives/buttons/button';
import { StarsBackgroundDemo } from '@/components/demo-components-backgrounds-stars';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react'

const InterviewerProfilePage = async({ params }) => {
  const { id } = await params;

  const interviewer= await getInterviewerProfile(id);
  if(!interviewer) notFound();


  return <main className='min-h-screen bg-black'>
    <section className="relative border-b border-white/8 overflow-hidden">
    <StarsBackgroundDemo/>
    
    <div className="relative max-w-6xl mx-auto px-8 pt-20 pb-14 flex flex-col gap-8">
      <Link href="/explore">
        <Button variant = "link" className="text-stone-500 cursor-pointer">
          <ArrowLeft size={13}/>
          Back to explore
        </Button>
      </Link>
    </div>
    </section>
  </main>
}

export default InterviewerProfilePage
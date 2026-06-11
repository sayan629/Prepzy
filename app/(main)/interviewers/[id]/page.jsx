import { getInterviewerProfile } from '@/actions/booking';
import { Button } from "@/components/ui/button";
import { StarsBackgroundDemo } from '@/components/demo-components-backgrounds-stars';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { GrayTitle } from '@/components/reusables';
import { Badge } from '@/components/ui/badge';

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

      <div className='flex items-start gap-8'>
        <Avatar classname = "w-24 h-24 border-2 border-white/10 shrink-0 rounded-2xl">
          <AvatarImage
            src = {interviewer.imageUrl}
            alt = {interviewer.name}
            className= "rounded-2xl"
            />
          <AvatarFallback className= "rounded-2xl bg-amber-400/10 border border-amber-400/20 text-amber-400 text-3xl font-medium">
            {interviewer.name?.[0] ?? "?"}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col gap-3 min-w-0 pt-1">
          <h1 className="font-serif text-[clamp(2rem,4vw,3rem)] leading-[1.05] tracking-tight">
              <GrayTitle>{interviewer.name}</GrayTitle>
          </h1>

              {interviewer.title && interviewer.company && (
                <p className="text-base text-stone-400 font-light">
                  {interviewer.title}
                  <span className="text-stone-700 mx-2">·</span>
                  {interviewer.company}
                </p>
              )}  


              <div className="flex items-center gap-2 flex-wrap mt-1">
                {interviewer.yearsExp && (
                  <Badge
                    variant="outline"
                    className="border-white/10 text-stone-400 text-xs px-3 py-1"
                  >
                    {interviewer.yearsExp}+ yrs experience
                  </Badge>
                )}

                
      </div>
      </div>
    </div>
    </section>
  </main>
}

export default InterviewerProfilePage
import { getInterviewerProfile } from '@/actions/booking';
import { StarsBackgroundDemo } from '@/components/demo-components-backgrounds-stars';
import { GrayTitle, SectionLabel } from '@/components/reusables';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CATEGORY_LABEL } from '@/lib/data';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react'

const InterviewerProfilePage = async ({ params }) => {

  const { id } = await params;

  const interviwer = await getInterviewerProfile(id);
  if(!interviwer) notFound();

  return <main className='min-h-screen bg-black'>
    <section className="relative border-b border-white/8 overflow-hidden">
      <StarsBackgroundDemo/>


      <div className="relative max-w-6xl mx-auto px-8 pt-20 pb-14 flex flex-col gap-8">
        <Link href="/explore">
          <Button variant="link" className="text-stone-500 cursor-pointer">
            <ArrowLeft size={13} />
              Back to explore
          </Button>
        </Link>

        <div className="flex items-start gap-8">
            <Avatar className="w-24 h-24 border-2 border-white/10 shrink-0 rounded-2xl">
              <AvatarImage
                src={interviwer.imageUrl}
                alt={interviwer.name}
                className="rounded-2xl"
              />
              <AvatarFallback className="rounded-2xl bg-amber-400/10 border border-amber-400/20 text-amber-400 text-3xl font-medium">
                {interviwer.name?.[0] ?? "?"}
              </AvatarFallback>
            </Avatar>       
            <div className='flex flex-col gap-3 min-w-0 pt-1'>
              <h1 className="font-serif text-[clamp(2rem,4vw,3rem)] leading-[1.05] tracking-tight">
                <GrayTitle>{interviwer.name}</GrayTitle>
              </h1>
              {interviwer.title && interviwer.company && (
                <p className="text-base text-stone-400 font-light">
                  {interviwer.title}
                  <span className="text-stone-700 mx-2">                  ·                  </span>
                  {interviwer.company}
                </p>
              )}             

            <div className='flex items-center gap-2 flex-wrap mt-1'>
              {interviwer.yearsExp && (
                  <Badge
                    variant="outline"
                    className="border-white/10 text-stone-400 text-xs px-3 py-1"
                  >
                    {interviwer.yearsExp}+ yrs experience
                  </Badge>
                )}

                <Badge
                  variant="gold"
                >
                  {interviwer.creditRate ?? 10} credits / session
                </Badge>   
    

                {interviwer.availabilities?.[0] && (
                  <Badge
                    variant="outline"
                    className="border-green-500/20 bg-green-500/8 text-green-400 text-xs px-3 py-1"
                  >
                    🟢 Available
                  </Badge>
                )}

            </div>
            </div>  
        </div>
      </div>
    </section>

     {/* ── Body ── */}
      <div className="max-w-6xl mx-auto px-8 py-12 grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
    {/* ── LEFT ── */}
      <div className="lg:col-span-3 flex flex-col gap-6 order-2 lg:-order-1">
        {interviwer.bio && (
            <div className="bg-[#0f0f11] border border-white/10 rounded-2xl p-8 flex flex-col gap-5">
              <SectionLabel>About</SectionLabel>
              <p className="text-base text-stone-300 font-light leading-relaxed">
                {interviwer.bio}
              </p>
            </div>
          )}

          {interviwer.categories?.length > 0 && (
            <div className="bg-[#0f0f11] border border-white/10 rounded-2xl p-8 flex flex-col gap-5">
              <div>
                <SectionLabel>Specialties</SectionLabel>
                <p className="text-sm text-stone-500 font-light mt-1">
                  Interview categories this expert covers.
                </p>
              </div>
            
            <div className='flex flex-wrap gap-2.5'>
              {interviwer.categories.map((cat) =>(
                <span
                  key ={cat}
                  className='text-sm px-4 py-2 rounded-xl border-amber-400/20 bg-amber-400/5 text-amber-400'>
                    {CATEGORY_LABEL[cat] ??  cat}

                </span>
              ))}
       </div>
       </div>
          )}

          
        </div>
      </div>
  </main>

};

export default InterviewerProfilePage;
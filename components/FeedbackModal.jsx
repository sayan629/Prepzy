"use client";

import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { RATING_CONFIG } from '@/lib/data';
import { StarsBackground } from './animate-ui/components/backgrounds/stars';
import { GrayTitle } from './reusables';

export function FeedbackModal ({open, onOpenChange, feedback, intervieweeName,})
{
        if(!feedback) return null;
        const rating = RATING_CONFIG[feedback.overallRating];

  return (
    <Dialog open ={open} onOpenChange={onOpenChange}>
    <DialogContent className='bg-black border border-amber-200/20 text-stone-100 sm:max-w-3xl max-h-[85vh] overflow-y-auto'>

    <StarsBackground/>


        <DialogHeader className='relative'>
        <DialogTitle className='font-serif text-2xl tracking-tight'>
            <GrayTitle>AI Feedback Report</GrayTitle>
        </DialogTitle>

        {intervieweeName && (
            <p className='text-xs text-stone-500 font-light mt-1'>
                Performance analysis for {intervieweeName}
            </p>
        )}
        </DialogHeader>

        <div className='relative flex flex-col gap-5 mt-2'>
            {/*Rating */}
            <div className={`rounded-2xl border ${rating.className} bg-linear-to-br ${rating.bg} to-transparent p-6 flex items-center justify-between`}
            >
                <div>
                    <p className='text-[10px] uppercase tracking-widest opacity-60'>
                        Overall rating
                    </p>
                    <p className='font-serif text-3xl'>{rating.label}</p>
                </div>

                <span className='text-4xl'>{rating.emoji}</span>
            </div>

        </div>
    </DialogContent>
    </Dialog>
  );
};


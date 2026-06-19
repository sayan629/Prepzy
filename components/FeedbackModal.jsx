"use client";

import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { RATING_CONFIG } from '@/lib/data';
import { StarsBackground } from './animate-ui/components/backgrounds/stars';
import { GrayTitle } from './reusables';
import { Brain, MessageSquare, Sparkles, TrendingUp } from 'lucide-react';

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

            {/* Summary */}
            <div className='bg-[#141417] border border-white/8 rounded-2xl p-5'>
                <div className='flex items-center gap-2 mb-2'>
                    <Sparkles size ={13} className='tem-amber-400'/>
                        <p className='text-[10px] uppercase tracking-widest text-stone-500'>
                            Summary 
                        </p>
                </div>
                <p className='text-sm text-stone-300'>{feedback.summary}</p>
            </div>

            {/* Recommendation */}
            <div className='bg-[#141417] border border-white/8 rounded-xl p-5'>
                <p className='text-[10px] uppercase tracking-widest text-stone-500 mb-2'>
                    Recommendation 
                </p>
                <p className='text-sm text-stone-300'>{feedback.recommendation}</p>
            </div>

            {/* Sections */}
            <div className='grid gap-3'>
                {[
                    {
                        icon: <Brain size ={14} className='text-amber-400' />,
                        label: "Technical",
                        value: feedback.technical,
                    },
                    {
                        icon: <MessageSquare size={14} className='text-amber-400'/>,
                        label: "Communication",
                        value: feedback.communication,
                    },
                    {
                        icon: <TrendingUp size={14} className='text-amber-400'/>,
                        label: "Problem Solving",
                        value: feedback.problemSolving,
                    },
                ]}
            </div>
        </div>
    </DialogContent>
    </Dialog>
  );
};


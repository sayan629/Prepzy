import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import React from 'react'

const InterviewerCard = ({ interviewer }) => {
    const {
        id,
        name,
        imageUrl,
        title,
        company,
        yearsExp,
        bio,
        categories,
        creditRate,
        availabilities,
    } = interviewer;

    const availability = availabilities?.[0];

  return(
    <Card className="relative border border-white/10 hover:border-amber-400/20">
        <div className="absolute inset-0 bg-linear-to-br from-amber-400/5 via-transparent to-transparent pointer-events-none" />

    <CardContent className="flex flex-col gap-5">
         {/* Top row — avatar + name + years */}
        <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
                <Avatar className="w-11 h-11 border border-white/10 shrink-0">
                <AvatarImage src={imageUrl} alt={name} />
                <AvatarFallback className="bg-amber-400/10 border border-amber-400/20 text-amber-400 text-sm font-medium">
                    {name?.[0] ?? "?"}
                </AvatarFallback>
                </Avatar>
                <div>
                    <p className="text-sm font-medium text-stone-200 leading-tight">
                    {name}
                </p>
                {title && company && (
                    <p className="text-xs text-stone-500 mt-0.5">
                    {title} · {company}
                    </p>
                )}
                </div>
            </div>
        </div>
    </CardContent>

  </Card>
  );
}

export default InterviewerCard
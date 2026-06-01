import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { CATEGORY_LABEL } from '@/lib/data';
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

            {yearsExp && (
            <Badge
              variant="outline"
              className="shrink-0 border-white/10 text-stone-500 text-xs"
            >
              {yearsExp}+ yrs
            </Badge>
          )}
        </div>


        {/* Bio */}
        {bio && (
          <p className="text-xs text-stone-400 font-light leading-relaxed line-clamp-2">
            {bio}
          </p>
        )}
    </CardContent>

    {/* Categories */}
        {categories?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 ml-3">
            {categories.slice(0, 4).map((cat) => (
              <span
                key={cat}
                className="text-xs px-2.5 py-1 rounded-lg border border-amber-400/20 bg-amber-400/5 text-amber-400"
              >
                {CATEGORY_LABEL[cat] ?? cat}
              </span>
            ))}
            {categories.length > 4 && (
              <span className="text-xs px-2.5 py-1 rounded-lg border border-white/10 text-stone-600">
                +{categories.length - 4} more
              </span>
            )}
          </div>
        )}
        

  </Card>
  );
}

export default InterviewerCard
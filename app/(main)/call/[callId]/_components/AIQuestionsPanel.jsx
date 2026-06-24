"use client";

import { generateInterviewQuestions } from "@/actions/aiQuestions";
import { Button } from "@/components/ui/button";
import useFetch from "@/hooks/use-fetch";
import { CATEGORY_LABEL } from "@/lib/data";
import { useState } from "react";


export default function AIQuestionsPanel({ categories }){

    const [selectedCategory, setSelectedCategory] = useState(
      categories?.[0] ?? null
    );

      const { data, loading, error, fn:generateFn } = useFetch(generateInterviewQuestions);
      const questions = data?.questions ?? [];

      return <div className="flex flex-col gap-4 h-full overflow-hidden">
            <div className="flex flex-wrap gap-1.5">
              {categories?.map((cat) =>(
                <Button
                  key={cat}
                  type = "button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                    selectedCategory === cat
                      ? "border-amber-400/40 bg-amber-400/10 text-amber-400"
                      : "border-white/10 text-stone-500 hover:border-white/20 hover:text-stone-400"
                    }`}
                    >
                      {CATEGORY_LABEL[cat] ?? cat}
                    </Button>
              ))}
            </div>
      </div>




  return <div></div>
};
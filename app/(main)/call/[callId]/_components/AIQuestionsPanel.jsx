"use client";

import { generateInterviewQuestions } from "@/actions/aiQuestions";
import { Button } from "@/components/ui/button";
import useFetch from "@/hooks/use-fetch";
import { CATEGORY_LABEL } from "@/lib/data";
import { Loader2, Sparkles } from "lucide-react";
import { useState } from "react";


export default function AIQuestionsPanel({ categories }){

    const [selectedCategory, setSelectedCategory] = useState(
      categories?.[0] ?? null
    );

      const { data, loading, error, fn:generateFn } = useFetch(generateInterviewQuestions);
      const questions = data?.questions ?? [];

      return <div className="flex flex-col gap-4 h-full overflow-hidden p-3">
            <div className="flex flex-wrap gap-1.5">
              {categories?.map((cat) =>(
                <button
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
                    </button>
              ))}
            </div>

            <Button
              variant="gold"
              size = "sm"
              disabled = {loading || !selectedCategory}
              onClick= {() => generateFn({ category: selectedCategory })}
              className="self-start gap-2"
            >
              {loading ? (
                <>
                <Loader2 size={13} className="animate-spin" />
                Generating…
                </>
              ) : (
                <>
                <Sparkles size={13} />
                Generate Questions
                </>
              )}
            </Button>
      </div>




  return <div></div>
};
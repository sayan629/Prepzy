"use client";
import { CircleCheck, TrendingUp, Wallet } from "lucide-react";
import { useState } from "react";

export default function EarningsSection( { stats, history }){
    const [open, setOpen] = useState(false); //for requsting payment
    const balance = (stats?.creditBalance ?? 0)*5;
    const totalEarnedDollars = (stats?.totalEarned ?? 0) * 5;


    return <section className="flex flex-col gap-6">
      <div className="grid grid-cols-3 gap-4">
        {[
          {
            label: "Credit Balance",
            value: stats?.creditBalance ?? 0,
            unit: "credits",
            gold: true,
            icon: <Wallet size={16} className="text-amber-400"/>,
            dollarValue: balance,
          },
          {
            label: "Total earned",
            value: stats?.totalEarned ?? 0,
            unit: "credits",
            gold: false,
            icon: <TrendingUp size={16} className="text-stone-400"/>,
            dollarValue: totalEarnedDollars,
          },
          {
            label: "Sessions done",
            value: stats?.completedSessions ?? 0,
            unit: "completed",
            gold: false,
            icon: <CircleCheck size={16} className="text-stone-400"/>
          },
        ].map((stat) => (
          <div 
            key = {stat.label} className="bg-[#0f0f11] border border-white/10 rounded-2xl p-6 flex flex-col gap-2">
              <span className="text-lg">{stat.icon}</span>
              <p className={`font-serif text-4xl leading-none tracking-tight &{
                stat.gold
                  ? "bg-linear-to-br from-amber-300 to-amber-500 bg-clip-text text-transparent"
                  : "bg-linear-to-br from-stone-100 to-stone-400 bg-clip-text text-transparent"
              }`}
              >
                {stat.value}
              </p>
                <p className="text-xs text-stone-600">{stat.unit}</p>
                <p className="text-xs text-stone-500">
                  {stat.label}{" "}
                  {stat.dollarValue !== undefined
                    ? `($${stat?.dollarValue?.toFixed(2)})`
                    : ""}
                </p>
            </div>
        ))}
      </div>
    </section>
}
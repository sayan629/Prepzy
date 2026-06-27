"use client";
import { Wallet } from "lucide-react";
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
        ]}
      </div>
    </section>
}
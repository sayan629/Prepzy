"use client";
import { useState } from "react";

export default function EarningsSection( { stats, history }){
    const [open, setOpen] = useState(false); //for requsting payment
    const balance = (stats?.creditBalance ?? 0)*5;

    return <div>EarningsSection</div>
}
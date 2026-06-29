import { approvePayout } from "@/actions/payout";
import useFetch from "@/hooks/use-fetch";
import { useEffect, useState } from "react";

export default function PayoutReviewClient({ payout }){
    const [password, setPassword ] = useState("");
    const [done, setDone] = useState(payout.status === "PROCESSED");

    const { data, loading, error, fn: approveFn } = useFetch(approvePayout);

    useEffect
}
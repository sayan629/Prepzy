"use client";

import { setAvailability } from "@/actions/dashboard";
import useFetch from "@/hooks/use-fetch";
import { useState } from "react";


export default function AvailabilitySection( { initial }){

    const [startTime, setStartTime ] = useState(
        initial?.startTime
            ? new Date(initial.startTime).toTimeString().slice(0,5)
            : "",
    );

    const [endTime, setEndTime] = useState(
        initial?.endTime
            ? new Date(initial.endTime).toTimeString().slice(0, 5)
            : "", 
    );

    const [saved, setSaved ] = useState(false);
    const { data, loading, error, fn:saveFn } = useFetch(setAvailability);

    return <div>AvailabilitySection</div>;
};


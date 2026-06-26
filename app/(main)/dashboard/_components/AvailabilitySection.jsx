
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
    
    return <div>AvailabilitySection</div>;
};


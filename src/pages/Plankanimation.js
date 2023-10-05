import React, {useState, useEffect, useRef} from 'react';
import {useTimer} from 'react-timer-hook';
import {Button} from "@material-ui/core";

function MyTimer({expiryTimestamp}) {

    const {
        totalSeconds,
        seconds,
        minutes,
        isRunning,
        start,
        pause,
        resume,
        restart,
    } = useTimer({expiryTimestamp, onExpire: () => console.warn('onExpire called')});
    //console.log(totalSeconds);

    const latestTotalSecondsRef = useRef(totalSeconds);

    useEffect(()=>{
        if (latestTotalSecondsRef.current - totalSeconds >= 30) {
            latestTotalSecondsRef.current = totalSeconds;
            pause();
            setTimeout(() => resume(), 10000);
        }
    }, [pause, resume, totalSeconds]);

    /*useEffect(() => {
        const interval = setInterval(() => {
            // Hier wird die Pause-Funktion für 10 Sekunden aufgerufen
            pause();
            setTimeout(() => {
                resume();
            }, 10000);
        }, 30000);

        return () => clearInterval(interval);
    }, [pause, resume]);*/

    return (
        <div style={{textAlign: 'center', color: "black"}}>
            <div style={{fontSize: '100px'}}>
                <span>{minutes}</span>:<span>{seconds}</span>
            </div>
            <p>{isRunning ? 'Running' : 'Not running'}</p>
            <Button variant="contained" onClick={start}>Start</Button>
            <Button variant="contained" onClick={pause}>Pause</Button>
            <Button variant="contained" onClick={() => {
                // Restarts to 10 minutes timer
                const time = new Date();
                time.setSeconds(time.getSeconds() + 600);
                restart(time);
            }}>Restart</Button>
        </div>
    );
}

export default function App() {
    const time = new Date();
    time.setSeconds(time.getSeconds() + 600); // 10 minutes timer

    return (
        <div>
            <MyTimer expiryTimestamp={time}/>
        </div>
    );
}
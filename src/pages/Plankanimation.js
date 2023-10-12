import React, {useState, useEffect, useRef} from 'react';
import {useTimer} from 'react-timer-hook';
import {Button} from "@material-ui/core";
import {Link} from "react-router-dom";

function MyTimer({expiryTimestamp, setIsTimer2Running}) {

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

    const latestTotalSecondsRef = useRef(totalSeconds);

    useEffect(() => {
        if (latestTotalSecondsRef.current - totalSeconds >= 30) {
            latestTotalSecondsRef.current = totalSeconds;
            pause();
            setIsTimer2Running(true);
            setTimeout(() => {
                resume();
                setIsTimer2Running(false);
            }, 10000);

        }
    }, [pause, resume, totalSeconds, setIsTimer2Running]);


    return (
        <div style={{textAlign: 'center', color: "black"}}>
            <div style={{fontSize: '50px'}}>
                <span>{minutes.toString().padStart(2, "0")}</span>:<span>{seconds.toString().padStart(2, "0")}</span>
            </div>
            <p>{isRunning ? 'Running' : 'Not running'}</p>
            <Button variant="contained" onClick={start}>Start</Button>
            <Button variant="contained" onClick={pause}>Pause</Button>
            <Button variant="contained" onClick={() => {
                // Restarts to 10 minutes timer
                const time = new Date();
                time.setSeconds(time.getSeconds() + 120);
                restart(time);
            }}>Restart</Button>
        </div>
    );
}

function MyTimer2({expiryTimestamp, isRunning}) {
    const {
        totalSeconds,
        seconds,
        minutes,
        pause,
        resume,
        restart,
        isRunning: isRunning2
    } = useTimer({expiryTimestamp, onExpire: () => console.warn('onExpire called')});

    useEffect(() => {


        if (!isRunning) {
            console.log("Running")
            pause();

        } else {
            console.log("Notrunning")
            resume()
        }
        if (seconds === 0 && !isRunning) {
            // Der Timer ist abgelaufen und läuft, also setzen wir ihn auf 10 Sekunden zurück
            expiryTimestamp = new Date();
            expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + 10);
            restart(expiryTimestamp)
        }
    }, [isRunning, pause, resume, totalSeconds, restart]);
    return (
        <div style={{textAlign: 'center', color: "black"}}>
            <div style={{fontSize: '50px'}}>
                <span>{minutes.toString().padStart(2, "0")}</span>:<span>{seconds.toString().padStart(2, "0")}</span>
            </div>
            <p>{isRunning2 ? 'Running' : 'Not running'}</p>
        </div>
    );
}

export default function App() {
    const time = new Date();
    const timer = new Date();
    time.setSeconds(time.getSeconds() + 120); // 2 minutes timer

    timer.setSeconds(timer.getSeconds() + 10); // 10 Sekunden pause

    const [isTimer2Running, setIsTimer2Running] = useState(false);

    return (
        <div>
            <Button id="plankstarthome" variant="outlined">
                <Link to="/">Home</Link>
            </Button>
            <MyTimer expiryTimestamp={time} setIsTimer2Running={setIsTimer2Running}/>
            <MyTimer2 expiryTimestamp={timer} isRunning={isTimer2Running}/>

        </div>
    );
}
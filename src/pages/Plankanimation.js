import React, {useState, useEffect, useRef} from 'react';
import {useTimer} from 'react-timer-hook';
import {Button} from "@material-ui/core";
import {Link, useParams} from "react-router-dom";
import Beinheben from '../animations/BeinhebenAnimation.gif';
import Spideranimation from '../animations/SpiderAnimation.gif'
import Plank from '../animations/Plank.gif'
import PlankHaende from '../animations/HaendeAnimation.gif'
import HaendeBeinheben from '../animations/HaendeBeinheben.gif'

function MyTimer({expiryTimestamp, setIsTimer2Running}) {

    const {
        totalSeconds,
        seconds,
        minutes,
        isRunning,
        pause,
        resume,
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
            }, 10200);

        }
    }, [pause, resume, totalSeconds, setIsTimer2Running,]);


    return (
        <div style={{textAlign: 'center', color: "black"}}>
            <div style={{fontSize: '50px'}}>
                <span>{minutes.toString().padStart(2, "0")}</span>:<span>{seconds.toString().padStart(2, "0")}</span>
            </div>
            <p>{isRunning ? 'Timer läuft' : 'Timer läuft nicht'}</p>
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
            <p>{isRunning2 ? 'Pause' : 'Keine Pause'}</p>
        </div>
    );
}

export default function App() {
    const {time} = useParams()
    const [timer1] = useState(() => {
        const initialTimer1 = new Date();
        initialTimer1.setSeconds(initialTimer1.getSeconds() + parseInt(time));
        return initialTimer1;
    });
    const timer2 = new Date();
    timer2.setSeconds(timer2.getSeconds() + 10);

    const [isTimer2Running, setIsTimer2Running] = useState(false);

    const [gifsList] = useState([Beinheben, Spideranimation, Plank, PlankHaende, HaendeBeinheben]);
    const [currentGifIndex, setCurrentGifIndex] = useState(0);

    useEffect(() => {
        let gifInterval;

        if (!isTimer2Running) {
            gifInterval = setInterval(() => {
                setCurrentGifIndex(prevIndex => {
                    let newIndex;
                    do {
                        newIndex = Math.floor(Math.random() * gifsList.length);
                    } while (newIndex === prevIndex);
                    return newIndex;
                });
            }, 30000);
        }

        return () => clearInterval(gifInterval);
    }, [isTimer2Running,gifsList]);

    const isTimer1Expired = new Date() >= timer1;
    return (
        <div>
            <Button id="plankstarthome" variant="outlined">
                <Link to="/">Home</Link>
            </Button>

            <MyTimer expiryTimestamp={timer1} setIsTimer2Running={setIsTimer2Running}/>
            {isTimer2Running && <MyTimer2 expiryTimestamp={timer2} isRunning={isTimer2Running}/>}
            <div className="container">
                {!isTimer2Running && !isTimer1Expired && (
                    <img src={gifsList[currentGifIndex]} alt="Mein GIF" className="gif"/>
                )}
            </div>

        </div>
    );
}
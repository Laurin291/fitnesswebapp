import React, {useState, useEffect, useRef} from 'react';
import {useTimer} from 'react-timer-hook';
import {Link, useParams} from "react-router-dom";
import Beinheben from '../animations/BeinhebenAnimation.gif';
import Spideranimation from '../animations/SpiderAnimation.gif'
import Plank from '../animations/Plank.gif'
import PlankHaende from '../animations/HaendeAnimation.gif'
import HaendeBeinheben from '../animations/HaendeBeinheben.gif'
import ToggleButton from "@mui/material/ToggleButton";

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
            }, 10000);

        }
    }, [pause, resume, totalSeconds, setIsTimer2Running,]);


    return (
        <div style={{textAlign: 'center', color: "black"}}>
            <div style={{fontSize: '100px'}}>
                <span>{minutes.toString().padStart(2, "0")}</span>:<span>{seconds.toString().padStart(2, "0")}</span>
            </div>
            {/*
            <p className="word">{isRunning ? 'Planken' : 'Nicht Planken'}</p>
            */}
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
        if (seconds === 0 && !isRunning) {
            // Der Timer ist abgelaufen und läuft, also setzen wir ihn auf 10 Sekunden zurück
            expiryTimestamp = new Date();
            expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + 10);
            restart(expiryTimestamp)
        }
    }, [isRunning, pause, resume, totalSeconds, restart]);
    return (
        <div style={{textAlign: 'center', color: "black",marginTop:'50'}}>
            <div style={{fontSize: '200px'}}>
                <span>{minutes.toString().padStart(2, "0")}</span>:<span>{seconds.toString().padStart(2, "0")}</span>
            </div>
            <div className="timer"><p>{isRunning2 ? 'Pause' : 'Keine Pause'}</p></div>
        </div>
    );
}

export default function App() {
    const {time} = useParams()
    const [pause,setpause] = useState(0)
    const [minutes,setminutes] = useState(0)
    let [isTimer1Expired,setisTimer1Expired] = useState(false)

    const [timer1] = useState(() => {
        const initialTimer1 = new Date();
        initialTimer1.setSeconds(initialTimer1.getSeconds() + parseInt(time));
        return initialTimer1;
    });
    const timer2 = new Date();
    timer2.setSeconds(timer2.getSeconds() + 10);

    const [isTimer2Running, setIsTimer2Running] = useState(false);

    const [gifsList] = useState([Plank, Spideranimation, Beinheben, PlankHaende, HaendeBeinheben]);
    const [currentGifIndex, setCurrentGifIndex] = useState(()=>{
        return Math.floor(Math.random() * 4)
    });
    const getRandomIndex = (currentIndex, maxIndex) => {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * maxIndex);
        } while (newIndex === currentIndex);
        return newIndex;
    };


    let timer1sec = new Date();
    timer1sec.setSeconds(0)
    timer1sec.setMinutes(0)
    timer1sec.setHours(0)
    useEffect(() => {
        if (parseInt(time) === 60) {
            setpause(20);
        }else if (parseInt(time)=== 90){
            setpause(30)
        }else if (parseInt(time)=== 120){
            setpause(40)
        }else if (parseInt(time) === 150){
            setpause(50)
        }else if (parseInt(time) === 180){
            setpause(60)
        }
    }, [time,pause]);



    let minute = timer1.getMinutes()
    let otto = timer1.getSeconds() + pause
    let hour = timer1.getHours()
    timer1sec.setHours(hour)
    timer1sec.setMinutes(minute)
    timer1sec.setSeconds(otto);
    timer1sec.setMilliseconds(0)


    console.log(new Date())
    console.log(timer1sec)
    console.log(isTimer1Expired)

    useEffect(() => {
        let date = new Date()
        let gifInterval;
        if (date.getMinutes() === timer1sec.getMinutes() && date.getSeconds() === timer1sec.getSeconds()) {
            setisTimer1Expired(true)
        }else if (date.getMinutes() > timer1sec.getMinutes() && date.getSeconds() > timer1sec.getSeconds()){
            setisTimer1Expired(true)
        }
        if (!isTimer2Running) {
            gifInterval = setInterval(() => {
                setCurrentGifIndex(prevIndex => getRandomIndex(prevIndex, gifsList.length));
            }, 30000);
        }

        return () => clearInterval(gifInterval);
    }, [isTimer2Running, gifsList,isTimer1Expired,timer1sec]);

    return (
        <div id="content">
            <div className="timer">
                <MyTimer expiryTimestamp={timer1} setIsTimer2Running={setIsTimer2Running} />
            </div>
            {isTimer2Running && <MyTimer2 expiryTimestamp={timer2} isRunning={isTimer2Running} />}
            <div className="container">
                {!isTimer2Running && !isTimer1Expired && (
                    <img src={gifsList[currentGifIndex]} className="gif" alt="Gif" />
                )}
                {isTimer1Expired === true && !isTimer2Running && (
                    <div className="centerdiv">
                        <p className="textend">Dein Training ist zu Ende</p>
                        <Link to={'/Plank'}>
                            <ToggleButton className="buttonend" style={{ color: "black" }}>Nochmal Planken</ToggleButton>
                        </Link>
                        <Link to={'/Home'}>
                            <ToggleButton className="buttonend" style={{ color: "black" }}>Zur Startseite</ToggleButton>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
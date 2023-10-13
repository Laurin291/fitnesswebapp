import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useTimer} from "react-timer-hook";
import {Button} from "@material-ui/core";
import {useParams} from "react-router-dom";
import logo from '../pictures/bike.png'; // Tell webpack this JS file uses this image



function CyclingAreaPage ({expiryTimestamp}) {
    const {difficulty} = useParams()
    const {
        totalSeconds,
        seconds,
        minutes,
        isRunning,
        start,
        pause,
        //resume,
        restart,
    } = useTimer({expiryTimestamp, onExpire: () => console.warn('onExpire called')});

    const didSetStartIntervalStyle = useRef(false);
    const latestTotalSecondsRef = useRef(totalSeconds);
    const intervalCounter = useRef(10);

    const intervalDurations = {"Leicht": 1, "Mittel": 2, "Schwer": 3, "Alternative+":4};
    const soonIntervalDurations = {"Leicht": 2, "Mittel": 4, "Schwer": 6, "Alternative+":8};
    const cooldownDurations = {"Leicht": 4, "Mittel": 8, "Schwer": 10, "Alternative+":20};

    const intervalDuration = intervalDurations[difficulty];
    const soonIntervalDuration = soonIntervalDurations[difficulty];
    const cooldownDuration = cooldownDurations[difficulty];

    const currentIntervalDuration = useRef(intervalDuration)

    const setCooldownStyle = useCallback(() => {
        const box1c = document.querySelector("#effortbox1")
        const box2c = document.querySelector("#effortbox2")
        const box3c = document.querySelector("#effortbox3")

        box1c.setAttribute('style', 'background-color: green');
        box2c.setAttribute('style', 'background-color: green');
        box3c.setAttribute('style', 'background-color: green');
    }, []);


    const setSoonIntervalStyle = useCallback(() => {
        const box4c = document.querySelector("#effortbox4");
        const box5c = document.querySelector("#effortbox5");
        const box6c = document.querySelector("#effortbox6");

        box4c.setAttribute('style', 'background-color: #F3B607');
        box5c.setAttribute('style', 'background-color: orange');
        box6c.setAttribute('style', 'background-color: #F35D07');

        document.querySelector("#effort").textContent = "Soon Intervall"


    }, []);

    const resetSoonIntervalStyle = useCallback(() => {
        const box4c = document.querySelector("#effortbox4");
        const box5c = document.querySelector("#effortbox5");
        const box6c = document.querySelector("#effortbox6");

        box4c.setAttribute('style', 'background-color: white');
        box5c.setAttribute('style', 'background-color: white');
        box6c.setAttribute('style', 'background-color: white')
        document.querySelector("#effort").textContent = "Cool Down"

    }, []);

    const setIntervalStyle = useCallback(() => {
        const box7c = document.querySelector("#effortbox7");
        const box8c = document.querySelector("#effortbox8");
        const box9c = document.querySelector("#effortbox9");
        const box10c = document.querySelector("#effortbox10");

        box7c.setAttribute('style', 'background-color: #F34407');
        box8c.setAttribute('style', 'background-color: red');
        box9c.setAttribute('style', 'background-color: red');
        box10c.setAttribute('style', 'background-color: #E62B03');

        document.querySelector("#effort").textContent = "Intervall Phase"
    }, []);

    const resetIntervalStyle = useCallback(() => {
        const box7c = document.querySelector("#effortbox7");
        const box8c = document.querySelector("#effortbox8");
        const box9c = document.querySelector("#effortbox9");
        const box10c = document.querySelector("#effortbox10");

        box7c.setAttribute('style', 'background-color: white');
        box8c.setAttribute('style', 'background-color: white');
        box9c.setAttribute('style', 'background-color: white');
        box10c.setAttribute('style', 'background-color: white');

        document.querySelector("#effort").textContent = "Cooldown Phase"
    }, []);

    console.log(currentIntervalDuration.current)
    const intervalSetAndReset = useCallback(() => {
        setSoonIntervalStyle();
        setIntervalStyle();
        currentIntervalDuration.current = intervalDuration;
        setTimeout(() => {
            resetSoonIntervalStyle();
            resetIntervalStyle();
            currentIntervalDuration.current = cooldownDuration;
        }, intervalDuration * 1000);
        setTimeout(() => {
            setSoonIntervalStyle();
            currentIntervalDuration.current = soonIntervalDuration;
        }, (intervalDuration + cooldownDuration) * 1000);
        intervalCounter.current--;
    }, [cooldownDuration, intervalDuration, resetIntervalStyle, resetSoonIntervalStyle, setIntervalStyle, setSoonIntervalStyle, soonIntervalDuration]);

    const intervalPhases = useCallback(() => {
        if (intervalCounter.current > 0) {
            if (!didSetStartIntervalStyle.current) {
                intervalSetAndReset();
                didSetStartIntervalStyle.current = true;
            }
            if (latestTotalSecondsRef.current - totalSeconds >= soonIntervalDuration + cooldownDuration + intervalDuration) {
                latestTotalSecondsRef.current = totalSeconds;
                intervalSetAndReset();
            }
        }
    }, [soonIntervalDuration, intervalDuration, intervalSetAndReset, cooldownDuration, totalSeconds]);


    useEffect(() => {
        setCooldownStyle();
        if(latestTotalSecondsRef.current - totalSeconds > 10) {
            intervalPhases();
        }
    }, [intervalPhases, setCooldownStyle, totalSeconds]);


    return (
        <div style={{textAlign: 'center', color: "black"}}>
            <div style={{fontSize: '50px'}}>
                <span>{minutes.toString().padStart(2, "0")}</span>:<span>{seconds.toString().padStart(2, "0")}</span>
            </div>
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
    time.setSeconds(time.getSeconds() + 1800); // 30 minutes timer
    return (
        <div>
        <div className="App" style={{textAlign: 'center'}}>
            <CyclingAreaPage expiryTimestamp={time}/>
            
        </div>
            <div className="Bikerow">
                <div>
                    <img src={logo} alt="Logo" className="Bike"/>
                </div>
                <div className="Effortboxes">
                    <div id="effort" className="effort">Phasen</div>
                    <div id="effortbox10" className="effortbox"></div>
                    <div id="effortbox9" className="effortbox"></div>
                    <div id="effortbox8" className="effortbox"></div>
                    <div id="effortbox7" className="effortbox"></div>
                    <div id="effortbox6" className="effortbox"></div>
                    <div id="effortbox5" className="effortbox"></div>
                    <div id="effortbox4" className="effortbox"></div>
                    <div id="effortbox3" className="effortbox"></div>
                    <div id="effortbox2" className="effortbox"></div>
                    <div id="effortbox1" className="effortbox"></div>
                </div>
            </div>
        </div>
    );
}

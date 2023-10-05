import React, {useEffect, useRef, useState} from 'react';
import {CountdownCircleTimer} from 'react-countdown-circle-timer'

const PomView = () => {
    const [timer, setTimer] = useState(1800); // 30 minutes
    const [start, setStart] = useState(false);
    const firstStart = useRef(true);
    const tick = useRef();
    const isBackgroundRed = true;

    useEffect(() => {
        if (firstStart.current) {
            console.log("first render, don't run useEffect for timer");
            firstStart.current = !firstStart.current;
            return;
        }

        console.log("subsequent renders");
        console.log(start);
        if (start) {
            tick.current = setInterval(() => {
                setTimer((timer) => timer - 1);
            }, 1000);
        } else {
            console.log("clear interval");
            clearInterval(tick.current);
        }

        return () => clearInterval(tick.current);
    }, [start]);

    const toggleStart = () => {
        setStart(!start);
    };


    const dispSecondsAsMins = (seconds) => {
        // 25:00
        console.log("seconds " + seconds);
        const mins = Math.floor(seconds / 60);
        const seconds_ = seconds % 60;
        if (seconds <= 1795 && seconds >= 1790) {
            document.querySelector("#effortbox10").setAttribute("style", `  background-color: green`);
            document.querySelector("#effortbox9").setAttribute("style", `  background-color: green`);
            document.querySelector("#effortbox8").setAttribute("style", `  background-color: green`);
            document.querySelector("#effortbox7").setAttribute("style", `  background-color: #F3B607`);
            document.querySelector("#effortbox6").setAttribute("style", `  background-color: orange`);
            document.querySelector("#effortbox5").setAttribute("style", `  background-color: #F35D07`);
            document.querySelector("#effortbox4").setAttribute("style", `  background-color: #F34407`);
            document.querySelector("#effortbox3").setAttribute("style", `  background-color: red`);
            document.querySelector("#effortbox2").setAttribute("style", `  background-color: red`);
            document.querySelector("#effortbox1").setAttribute("style", `  background-color: #E62B03`);

            document.querySelector("#effort").textContent = "Max effort"

        }
        if (seconds <= 1792 && seconds >= 1789) {
            document.querySelector("#effortbox3").setAttribute("style", `  background-color: white`);
            document.querySelector("#effortbox2").setAttribute("style", `  background-color: white`);
            document.querySelector("#effortbox1").setAttribute("style", `  background-color: white`);
            document.querySelector("#effort").textContent = "Bald bissl chilliger"
        }
        if (seconds <= 1789 && seconds >= 1786) {
            document.querySelector("#effortbox5").setAttribute("style", `  background-color: white`);
            document.querySelector("#effortbox4").setAttribute("style", `  background-color: white`);
            document.querySelector("#effort").textContent = "Bissl chilliger"

        }
        if (seconds <= 1786 && seconds >= 1783) {
            document.querySelector("#effortbox7").setAttribute("style", `  background-color: white`);
            document.querySelector("#effortbox6").setAttribute("style", `  background-color: white`);
            document.querySelector("#effort").textContent = "Bald voll am chillen"

        }

        if (seconds <= 1783 && seconds >= 1780) {
            document.querySelector("#effortbox10").setAttribute("style", `  background-color: white`);
            document.querySelector("#effortbox9").setAttribute("style", `  background-color: white`);
            document.querySelector("#effortbox8").setAttribute("style", `  background-color: white`);
            document.querySelector("#effort").textContent = "Voll am chillen"
        }






        return mins.toString() + ":" + (seconds_ == 0 ? "00" : seconds_.toString());


    };


    return (
        <div className="pomView">
                <h1>{dispSecondsAsMins(timer)}</h1>
            <div className="startDiv">
                {/* event handler onClick is function not function call */}
                <button className="startBut" onClick={toggleStart}>
                    {!start ? "START" : "STOP"}
                </button>
                {/* {start && <AiFillFastForward className="ff" onClick="" />} */}
            </div>


        </div>
    );
};

export default function App() {
    return (
        <div className="App" style={{textAlign: 'center'}}>
            <PomView />
            <div id="effort" class="effort"></div>
            <div id="effortbox1" class="effortbox"></div>
            <div id="effortbox2" class="effortbox"></div>
            <div id="effortbox3"  class="effortbox"></div>
            <div id="effortbox4" class="effortbox"></div>
            <div id="effortbox5" class="effortbox"></div>
            <div id="effortbox6" class="effortbox"></div>
            <div id="effortbox7" class="effortbox"></div>
            <div id="effortbox8" class="effortbox"></div>
            <div id="effortbox9" class="effortbox"></div>
            <div id="effortbox10" class="effortbox"></div>


        </div>

    );
}

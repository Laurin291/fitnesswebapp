import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useTimer} from 'react-timer-hook';
import Intensity from './Intensity';
import Durations from './Durations';
import PauseCircleOutlineOutlinedIcon from "@mui/icons-material/PauseCircleOutlineOutlined";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import {Link, useParams} from "react-router-dom";
import {Button} from "@material-ui/core";
import ToggleButton from "@mui/material/ToggleButton";

const CyclingArea = ({duration, runs}) => {
    const {difficulty} = useParams()


    const rotation = useRef(0);
    const increase = useRef(0);
    const [countdown, setCountdown] = useState(runs)

    const setWarmUpIntensityStyle = () => {
        increase.current = 0.5
        const kurbelPath = document.getElementById("kurbel-path");
        const box1c = document.querySelector("#effortbox1")
        const box2c = document.querySelector("#effortbox2")
        const box3c = document.querySelector("#effortbox3")

        kurbelPath.setAttribute("fill", "green");
        box1c.setAttribute('style', 'background-color: green');
        box2c.setAttribute('style', 'background-color: green');
        box3c.setAttribute('style', 'background-color: green');

        document.querySelector("#effortlevel").textContent = "70RPM"
        document.querySelector("#effort").textContent = "Warm up"

        const box4c = document.querySelector("#effortbox4");
        const box5c = document.querySelector("#effortbox5");
        const box6c = document.querySelector("#effortbox6");
        const box7c = document.querySelector("#effortbox7");
        const box8c = document.querySelector("#effortbox8");
        const box9c = document.querySelector("#effortbox9");
        const box10c = document.querySelector("#effortbox10");

        box4c.setAttribute('style', 'background-color: white');
        box5c.setAttribute('style', 'background-color: white');
        box6c.setAttribute('style', 'background-color: white')
        box7c.setAttribute('style', 'background-color: white');
        box8c.setAttribute('style', 'background-color: white');
        box9c.setAttribute('style', 'background-color: white');
        box10c.setAttribute('style', 'background-color: white');
    };

    const setLowIntensityStyle = () => {
        increase.current = 0.5
        const kurbelPath = document.getElementById("kurbel-path");
        const box4c = document.querySelector("#effortbox4");
        const box5c = document.querySelector("#effortbox5");
        const box6c = document.querySelector("#effortbox6");
        const box7c = document.querySelector("#effortbox7");
        const box8c = document.querySelector("#effortbox8");
        const box9c = document.querySelector("#effortbox9");
        const box10c = document.querySelector("#effortbox10");

        kurbelPath.setAttribute("fill", "green");
        box4c.setAttribute('style', 'background-color: white');
        box5c.setAttribute('style', 'background-color: white');
        box6c.setAttribute('style', 'background-color: white')
        box7c.setAttribute('style', 'background-color: white');
        box8c.setAttribute('style', 'background-color: white');
        box9c.setAttribute('style', 'background-color: white');
        box10c.setAttribute('style', 'background-color: white');

        document.querySelector("#effortlevel").textContent = "70RPM"
        document.querySelector("#effort").textContent = "Low"
    };

    const setMediumIntensityStyle = () => {
        increase.current = 0.8
        const kurbelPath = document.getElementById("kurbel-path");
        const box4c = document.querySelector("#effortbox4");
        const box5c = document.querySelector("#effortbox5");
        const box6c = document.querySelector("#effortbox6");

        kurbelPath.setAttribute("fill", "#F35D07");
        box4c.setAttribute('style', 'background-color: #F3B607');
        box5c.setAttribute('style', 'background-color: orange');
        box6c.setAttribute('style', 'background-color: #F35D07');

        document.querySelector("#effort").textContent = "Medium"
        document.querySelector("#effortlevel").textContent = "80RPM"
    };

    const setHighIntensityStyle = () => {
        increase.current = 1
        const kurbelPath = document.getElementById("kurbel-path");
        const box4c = document.querySelector("#effortbox4");
        const box5c = document.querySelector("#effortbox5");
        const box6c = document.querySelector("#effortbox6");
        const box7c = document.querySelector("#effortbox7");
        const box8c = document.querySelector("#effortbox8");
        const box9c = document.querySelector("#effortbox9");
        const box10c = document.querySelector("#effortbox10");

        kurbelPath.setAttribute("fill", "red");
        box4c.setAttribute('style', 'background-color: #F3B607');
        box5c.setAttribute('style', 'background-color: orange');
        box6c.setAttribute('style', 'background-color: #F35D07');
        box7c.setAttribute('style', 'background-color: #F34407');
        box8c.setAttribute('style', 'background-color: red');
        box9c.setAttribute('style', 'background-color: red');
        box10c.setAttribute('style', 'background-color: #E62B03');

        document.querySelector("#effort").textContent = "High"
        document.querySelector("#effortlevel").textContent = "100RPM"
    };

    const expiryTimestamp = new Date();
    expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + duration);

    const {
        totalSeconds,
        seconds,
        minutes,
        isRunning,
        pause,
        resume
    } = useTimer({expiryTimestamp});

    const timeoutRef = useRef(null);
    const intensityRef = useRef(Intensity.WARM_UP);
    const startTimeRef = useRef(Date.now());
    const pauseStartTimeRef = useRef(null);
    const pauseEndTimeRef = useRef(null);
    const [isPaused, setIsPaused] = useState(false);

    const changeIntensity = useCallback(currentIntensity => {
        switch (currentIntensity) {
            case Intensity.WARM_UP:
                setMediumIntensityStyle()
                return Intensity.MEDIUM;
            case Intensity.LOW:
                setMediumIntensityStyle()
                return Intensity.MEDIUM;
            case Intensity.MEDIUM:
                setHighIntensityStyle()
                return Intensity.HIGH;
            case Intensity.HIGH:
                setCountdown(countdown-1)
                setLowIntensityStyle()
                return Intensity.LOW;
            default:
                return currentIntensity;
        }
    }, [countdown]);

    const setNewTimeout = useCallback((duration = Durations[difficulty][intensityRef.current]) => {
        if (!isRunning || countdown === 0) {
            return
        }
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            intensityRef.current = changeIntensity(intensityRef.current);
            startTimeRef.current = Date.now();
            pauseStartTimeRef.current = null;
            pauseEndTimeRef.current = null;
            setNewTimeout();
        }, duration * 1000);
    }, [changeIntensity, countdown, difficulty, isRunning]);


    const remaining = useRef(null)

    useEffect(() => {
        if (intensityRef.current === Intensity.WARM_UP || countdown === 0) {
            setWarmUpIntensityStyle()

        }

        remaining.current === null ? setNewTimeout() : setNewTimeout(remaining.current);
        remaining.current = null

        const kurbelRotation = setInterval(() => {
            const kurbel = document.getElementById("kurbel");
            rotation.current += isRunning ? increase.current : 0
            if (kurbel !== null) {
                kurbel.style.transform = `rotate(${rotation.current}deg)`;
            }
        });

        return () => {
            clearInterval(kurbelRotation)
            clearTimeout(timeoutRef.current)
        };
    }, [countdown, isRunning, setNewTimeout]);

    const pauseStartTime = pauseStartTimeRef.current ?? Date.now();
    const pauseEndTime = pauseEndTimeRef.current ?? Date.now();
    const passedTime = Math.floor(((Date.now() - startTimeRef.current) - (pauseEndTime - pauseStartTime)) / 1000);
    const remainingTime = Durations[difficulty][intensityRef.current] - passedTime;
    const remainingMinutes = Math.floor(remainingTime / 60);
    const remainingSeconds = remainingTime % 60;


    const formatDigit = digit => digit < 10 ? `0${digit}` : digit;

    const pauseTimer = () => {
        setIsPaused(true)
        pause();
        clearTimeout(timeoutRef.current);
        pauseStartTimeRef.current = Date.now();
    };

    const resumeTimer = () => {
        setIsPaused(false)
        resume();
        const passedTime = Math.floor((pauseStartTimeRef.current - startTimeRef.current) / 1000);
        const remainingTime = Durations[difficulty][intensityRef.current] - passedTime;
        remaining.current = remainingTime

        setNewTimeout(remainingTime);
        pauseEndTimeRef.current = Date.now();
    };

    return (
        <div id='content'>
            <div style={{textAlign: 'center', color: "black"}}>
                {
                    totalSeconds !== 0 && (
                        <div>
                            <div style={{fontSize: '70px'}}>
                                <span>{formatDigit(minutes)}</span>:<span>{formatDigit(seconds)}</span>
                            </div>
                            <PauseCircleOutlineOutlinedIcon id="pauseicon" onClick={pauseTimer}/>
                            <Dialog
                                open={isPaused}
                                onClose={resumeTimer}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">
                                    {"  Du hast dein Training pausiert."}
                                </DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        Möchtest du es Abbrechen oder Fortsetzen?
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Link to="/Fahrrad"><Button>Abbrechen</Button></Link>
                                    <Button onClick={resumeTimer}>
                                        Fortsetzen
                                    </Button>
                                </DialogActions>
                            </Dialog>
                            {
                                countdown > 0 && totalSeconds > Math.max(remainingTime, 0) && (
                                    <div id="setcountdown">
                                        <span>{"Nächste Phase in: "+formatDigit(remainingMinutes)}</span>:<span>{formatDigit(remainingSeconds-1)}</span>
                                    </div>
                                )
                            }
                            <div className="bikerow">
                                <div className="Effortboxes">
                                    <div id="effort" className="effort">Phasen</div>
                                    <div id="effortlevel" className="effortlevel">Phasen</div>
                                    <hr id="efforthr"/>
                                    Effort Level
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
                                <div className="kurbel-container">
                                    <svg viewBox="0 0 204.54829 204.7681" version="1.1" xmlns="http://www.w3.org/2000/svg"
                                         id="kurbel">
                                        <g id="kurbel-layer" transform="translate(-63.67838,-48.549366)">
                                            <path
                                                d="m 250.23076,252.28247 c -2.29274,-0.99724 -5.61606,-3.96362 -24.65675,-22.00847 -8.90117,-8.43563 -49.38552,-46.62321 -61.44128,-57.95558 -6.04587,-5.68308 -11.6889,-11.4597 -12.54007,-12.83693 -5.60572,-9.07024 -0.19808,-21.89222 10.29461,-24.40937 9.53833,-2.28822 10.80193,-1.35616 39.40992,29.06981 13.70898,14.58015 28.04091,29.74937 31.84873,33.70937 22.89749,23.81261 33.52936,35.67681 34.43782,38.4295 3.41425,10.34528 -7.40986,20.3265 -17.35298,16.00167 z m 9.94441,-5.85543 c 3.59939,-2.32067 3.66927,-9.45324 0.12124,-12.37574 -1.03534,-0.8528 -3.0443,-1.4 -5.13991,-1.4 -2.85947,0 -3.78991,0.41554 -5.51138,2.46138 -2.88629,3.43017 -2.83368,7.72112 0.12889,10.51116 3.29079,3.09915 6.46047,3.34392 10.40116,0.8032 z m -86.90705,-88.08161 c 2.77675,-2.77675 3.10588,-3.52831 3.10588,-7.09212 0,-8.72029 -8.98069,-13.48852 -16.18482,-8.59319 -8.50274,5.77777 -4.07247,18.79119 6.39725,18.79119 3.08705,0 4.00034,-0.42453 6.68169,-3.10588 z M 159.271,227.4156 c -0.27335,-0.71234 -0.49834,-2.07571 -0.49999,-3.02973 -0.008,-4.87163 -6.10009,-10.12654 -11.74493,-10.13158 -4.58401,-0.004 -7.06171,1.08187 -10.14351,4.44583 l -2.62193,2.86199 -3.14332,-1.45541 c -1.72882,-0.80047 -3.32332,-1.6354 -3.54332,-1.8554 -0.22,-0.22 -1.09594,-0.78406 -1.94653,-1.25346 -2.67571,-1.47661 -3.29908,-3.20309 -2.227,-6.16787 1.37698,-3.80797 1.21274,-6.57353 -0.6016,-10.12992 -2.33388,-4.57479 -6.23472,-6.69043 -11.43787,-6.20342 -2.30285,0.21555 -5.09522,0.63487 -6.20527,0.93181 -1.82311,0.4877 -2.30661,0.0525 -5,-4.50041 -1.639949,-2.77218 -2.981729,-5.63616 -2.981729,-6.36441 0,-0.72825 1.41014,-2.73422 3.133649,-4.45773 3.64803,-3.64804 4.74284,-7.64199 3.35998,-12.25756 -1.21438,-4.05323 -5.453899,-7.68233 -9.828929,-8.41374 -1.90558,-0.31858 -3.72919,-0.98514 -4.05245,-1.48125 -0.9814,-1.50617 -0.70126,-12.09302 0.34775,-13.14203 0.528,-0.528 1.82899,-0.96 2.89108,-0.96 3.0896,0 7.818529,-3.13637 9.654609,-6.40323 2.96445,-5.27452 1.67012,-11.79236 -3.032139,-15.26889 -1.36045,-1.00583 -2.47355,-2.46179 -2.47355,-3.23547 0,-1.41947 5.089499,-10.68248 6.270439,-11.41234 0.35037,-0.21654 2.20793,0.14751 4.12791,0.80899 4.95959,1.70872 8.98349,0.83489 12.77816,-2.77489 3.90538,-3.7151 4.83325,-7.741771 2.97383,-12.905441 -1.55367,-4.31458 -1.24191,-4.75997 6.09329,-8.70506 l 4.64363,-2.49747 2.55637,2.76681 c 3.40314,3.68329 7.8603,5.48522 11.88568,4.80514 5.17472,-0.87426 10.27069,-6.32139 10.27069,-10.97843 0,-1.03385 0.432,-2.31172 0.96,-2.83972 1.04879,-1.04879 11.64687,-1.3296 13.12461,-0.34775 0.48653,0.32326 1.11758,1.84775 1.40233,3.38775 0.84683,4.57992 3.41613,7.95862 7.38819,9.71565 5.10501,2.25819 9.11333,1.46536 13.62724,-2.69542 3.97129,-3.66061 4.67006,-3.64644 11.37893,0.23074 3.90107,2.25451 4.23176,2.66407 3.72359,4.61164 -1.39603,5.35023 -1.38025,10.087371 0.0424,12.729091 2.77893,5.16017 10.62183,7.95815 15.3923,5.49125 1.36452,-0.70563 2.7982,-1.28295 3.18595,-1.28295 0.78248,0 5.0456,6.32102 6.67157,9.89209 0.97591,2.14337 0.88608,2.43287 -1.38439,4.46154 -4.0051,3.57855 -5.11272,5.71552 -5.11272,9.8641 0,6.80199 3.8129,11.28748 10.57643,12.4421 l 3.42357,0.58445 v 7.12558 7.12559 l -3.60456,0.91953 c -5.09016,1.29851 -6.81427,2.37941 -8.72394,5.46933 -1.84787,2.98991 -2.25456,9.04698 -0.80358,11.96827 0.47735,0.96108 2.17938,2.89623 3.78228,4.30034 l 2.91436,2.55293 -1.8616,3.83174 -1.86161,3.83174 -2.45616,-2.78467 c -1.35089,-1.53157 -6.02243,-6.53108 -10.3812,-11.11003 -6.32464,-6.64412 -7.82564,-8.66354 -7.43281,-10 3.24117,-11.02697 3.40702,-20.70391 0.51412,-29.9988 -4.9987,-16.06085 -18.7582,-29.19483 -34.85338,-33.26892 -6.20431,-1.57046 -17.70598,-1.54101 -23.91645,0.0612 -12.68477,3.27256 -25.61549,13.69686 -31.17456,25.13186 -3.86253,7.94523 -5.34092,14.10484 -5.34092,22.2526 0,29.91794 27.5534,53.28764 56.4,47.83623 3.52,-0.6652 7.13739,-1.43032 8.03864,-1.70026 1.30281,-0.39021 3.7621,1.50803 12,9.26238 5.69875,5.36424 10.46378,10.17464 10.58896,10.68978 0.29395,1.20973 -5.24201,3.86575 -6.48254,3.11015 -0.51978,-0.3166 -1.60684,-1.40975 -2.41569,-2.42924 -4.77376,-6.01692 -15.72729,-5.49713 -19.70254,0.93496 -0.87912,1.42244 -1.89003,3.99411 -2.24645,5.71483 l -0.64805,3.12856 -6.86916,0.22973 c -5.73084,0.19167 -6.95153,0.0151 -7.36617,-1.06543 z M 95.039871,100.35011 c -1.61561,-1.814341 -8.54636,-9.166071 -15.40167,-16.337171 -6.85531,-7.1711 -13.30275,-14.5511 -14.32765,-16.4 -5.81504,-10.490208 4.91916,-22.474726 16.26601,-18.160664 1.15869,0.440533 8.61457,7.010534 16.56862,14.600004 7.954059,7.58946 15.738589,14.90981 17.298969,16.26743 l 2.83705,2.4684 -1.46579,3.08893 c -1.40667,2.96434 -1.40915,3.25554 -0.0615,7.22019 1.21603,3.5775 1.26314,4.5215 0.35148,7.042671 -0.95704,2.64664 -1.32671,2.91141 -4.06493,2.91141 -1.65668,0 -4.25445,-0.59242 -5.77283,-1.31648 -2.61762,-1.24826 -2.92989,-1.23277 -6.02548,0.2988 l -3.264779,1.61529 z M 80.390021,68.243029 c 6.04005,-3.12344 5.18182,-11.559272 -1.43182,-14.073772 -4.94298,-1.87932 -10.14783,1.92078 -10.14783,7.409012 0,2.64045 0.47798,3.66385 2.59444,5.5549 2.89445,2.5862 5.50639,2.90882 8.98521,1.10986 z"
                                                id="kurbel-path"
                                            />
                                        </g>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    )}
                <div>
                    {
                        totalSeconds === 0 && (
                            <div className="centerdiv">
                                <p className="textend">Dein Training ist zu Ende</p>
                                <Link to={'/fahrrad'}>
                                    <ToggleButton className="buttonend" style={{color: "black"}}>Nochmal
                                        Fahrradfahren</ToggleButton>
                                </Link>
                                <Link to={'/Home'}>
                                    <ToggleButton className="buttonend" style={{color: "black"}}>Zur
                                        Startseite</ToggleButton>
                                </Link>
                            </div>
                        )}
                </div>
            </div>


        </div>
    );
};

export default CyclingArea;
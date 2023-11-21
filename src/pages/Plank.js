import React, { useState } from 'react';
import { Link } from "react-router-dom";
import {Stack, Tooltip, Zoom} from "@mui/material";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import Beinheben from '../animations/BeinhebenAnimation.gif';
import Spideranimation from '../animations/SpiderAnimation.gif'
import Plank from '../animations/Plank.gif'
import PlankHaende from '../animations/HaendeAnimation.gif'
import HaendeBeinheben from '../animations/HaendeBeinheben.gif'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import InfoTwoToneIcon from "@mui/icons-material/InfoTwoTone";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);


const images = [
    {
        label: 'Plank',
        imgPath: Plank
    },
    {
        label: 'Plank mit Hände ausgestreckt',
        imgPath: PlankHaende,
    },
    {
        label: 'Plank mit Hände ausgestreckt und Bein heben',
        imgPath: HaendeBeinheben,
    },
    {
        label: 'Plank mit Bein heben',
        imgPath:Beinheben,
    },
    {
        label: 'Plank mit Spider',
        imgPath:Spideranimation,
    },
];

function SwipeableTextMobileStepper() {
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = images.length;
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const handleStepChange = (step) => {
        setActiveStep(step);
    };

    return (
        <Box sx={{ flexGrow: 1 , maxWidth: 750,}}>
            <AutoPlaySwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={activeStep}
                onChangeIndex={handleStepChange}
                interval={5000}
                sx={{ display: 'flex', justifyContent: 'center' }}
            >
                {images.map((step, index) => (
                    <div key={step.label}>
                        {Math.abs(activeStep - index) <= 2 ? (
                            <Box
                                component="img"
                                sx={{

                                    display: 'block',
                                    maxWidth: 1000,
                                    overflow: 'hidden',
                                    width: '100%',
                                    margin: '0 auto',
                                }}
                                src={step.imgPath}
                                alt={step.label}
                            />
                        ) : null}
                    </div>
                ))}
            </AutoPlaySwipeableViews>
            <Paper
                square
                elevation={0}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    height: 50,
                    pl: 2,
                    justifyContent:'center',
                    backgroundColor: 'rgba(52, 52, 52, 0.0)'
                }}
            >
                <Typography sx={{ fontSize: '20px', fontFamily: 'Arial, sans-serif' }}>{images[activeStep].label}</Typography>
            </Paper>
            <MobileStepper
                steps={maxSteps}
                position="static"
                activeStep={activeStep}
                nextButton={
                    <ToggleButton
                        size="small"
                        onClick={handleNext}
                        disabled={activeStep === maxSteps - 1}
                    >
                        Nächstes Bild
                        {theme.direction === 'rtl' ? (
                            <KeyboardArrowLeft />
                        ) : (
                            <KeyboardArrowRight />
                        )}
                    </ToggleButton>
                }
                backButton={
                    <ToggleButton size="small" onClick={handleBack} disabled={activeStep === 0}>
                        {theme.direction === 'rtl' ? (
                            <KeyboardArrowRight />
                        ) : (
                            <KeyboardArrowLeft />
                        )}
                        Vorheriges Bild
                    </ToggleButton>
                }
            />
        </Box>
    );
}

export default function App() {
    const [alignment, setAlignment] = useState('60');
    const handleAlignment = (event, newAlignment) => {
        if (newAlignment !== null) {
            setAlignment(newAlignment);
        }
    };

    const children = [
        <div className="timebuttons">
            <Link to={'/Plankanimation/60'}>
                <ToggleButton value="60" key="60" className="timebutton" style={{color:"black"}}>60</ToggleButton>
            </Link>
            <Link to={'/Plankanimation/90'}>
                <ToggleButton value="90" key="90" className="timebutton" style={{color:"black"}}>90</ToggleButton>
            </Link>
            <Link to={'/Plankanimation/120'}>
                <ToggleButton value="120" key="120" className="timebutton" style={{color:"black"}}>120</ToggleButton>
            </Link>
            <Link to={'/Plankanimation/150'}>
                <ToggleButton value="150" key="150" className="timebutton" style={{color:"black"}}>150</ToggleButton>
            </Link>
            <Link to={'/Plankanimation/180'}>
                <ToggleButton value="180" key="180" className="timebutton" style={{color:"black"}}>180</ToggleButton>
            </Link>
        </div>
    ];

    const control = {
        value: alignment,
        onChange: handleAlignment,
        exclusive: true,
    };

    return (
        <Zoom in={true}>
            <div id="content">
                <div id="ueberschriftplank">Starte dein Plank-Training</div>
                <div id="contentplank">
                    Wähle eine Zeit und das Training startet
                </div>
                <div>
                    <Stack spacing={3} alignItems="center">
                        <ToggleButtonGroup {...control} aria-label="Medium sizes" >
                            {children}
                        </ToggleButtonGroup>
                    </Stack>
                    <div className={"makeCenter"}>
                    <SwipeableTextMobileStepper />
                    </div>
                </div>
            </div>
        </Zoom>
    );
}
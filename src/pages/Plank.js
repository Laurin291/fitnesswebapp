import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Stack } from "@mui/material";
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

    const handleStepChange = (step) => {
        setActiveStep(step);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Paper
                square
                elevation={0}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    height: 50,
                    pl: 2,
                    bgcolor: 'background.default',
                    justifyContent:'center',
                }}
            >
                <Typography>{images[activeStep].label}</Typography>
            </Paper>
            <AutoPlaySwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={activeStep}
                onChangeIndex={handleStepChange}
                interval={5000}
            >
                {images.map((step, index) => (
                    <div key={step.label}>
                        {Math.abs(activeStep - index) <= 2 ? (
                            <Box
                                component="img"
                                sx={{
                                    height: 450,
                                    display: 'block',
                                    maxWidth: 1000,
                                    overflow: 'hidden',
                                    width: '100%',
                                }}
                                src={step.imgPath}
                                alt={step.label}
                            />
                        ) : null}
                    </div>
                ))}
            </AutoPlaySwipeableViews>
            <MobileStepper
                steps={maxSteps}
                position="static"
                activeStep={activeStep}
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
        <Link to={'/Plankanimation/60'}><ToggleButton value="60" key="60">60</ToggleButton></Link>,
        <Link to={'/Plankanimation/90'}><ToggleButton value="90" key="90">90</ToggleButton></Link>,
        <Link to={'/Plankanimation/120'}><ToggleButton value="120" key="120">120</ToggleButton></Link>,
        <Link to={'/Plankanimation/150'}><ToggleButton value="150" key="150">150</ToggleButton></Link>,
        <Link to={'/Plankanimation/180'}><ToggleButton value="180" key="180">180</ToggleButton></Link>,
    ];

    const control = {
        value: alignment,
        onChange: handleAlignment,
        exclusive: true,
    };

    return (
        <div id="content">
            <div>
                <SwipeableTextMobileStepper />
                <Stack spacing={3} alignItems="center">
                    <ToggleButtonGroup {...control} aria-label="Medium sizes">
                        {children}
                    </ToggleButtonGroup>
                </Stack>
            </div>
        </div>
    );
}
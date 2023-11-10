import React, {useState} from 'react'
import {Link} from "react-router-dom";
import {Stack} from "@mui/material";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';


export default function Plank() {
    const [alignment, setAlignment] = useState('60');
    const handleAlignment = (event, newAlignment) => {
        if (newAlignment !== null) {
            setAlignment(newAlignment);
        }
    };

    const children = [
        <Link to={'/Plankanimation/60'}>
            <ToggleButton value="60" key="60">60</ToggleButton></Link>,
        <Link to={'/Plankanimation/90'}>
            <ToggleButton value="90" key="90">90</ToggleButton></Link>,
        <Link to={'/Plankanimation/120'}>
            <ToggleButton value="120" key="120">120</ToggleButton></Link>,
        <Link to={'/Plankanimation/150'}>
            <ToggleButton value="150" key="150">150</ToggleButton></Link>,
        <Link to={'/Plankanimation/180'}>
            <ToggleButton value="180" key="180">180</ToggleButton></Link>,
    ];

    const control = {
        value: alignment,
        onChange: handleAlignment,
        exclusive: true,
    };

    return (
        <>
            <div id='content'>
                <div>
                    <Stack spacing={3} alignItems="center">
                        <ToggleButtonGroup {...control} aria-label="Medium sizes">
                            {children}
                        </ToggleButtonGroup>
                    </Stack>
                </div>
            </div>
        </>
    )
}
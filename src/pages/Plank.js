import React, {useState} from 'react'
import {Link} from "react-router-dom";
import {Button} from "@material-ui/core";
import {Stack} from "@mui/material";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';


export default function Plank() {
    const [time, setTime] = useState(60);
    const ToggleButtonSizes = () => {

        const [alignment, setAlignment] = React.useState('left');
        const handleAlignment = (event, newAlignment) => {
            if (newAlignment !== null) {
                setAlignment(newAlignment);
                setTime(event.target.value)
            }
        };


        const children = [
            <ToggleButton value="60" key="60">60
            </ToggleButton>,
            <ToggleButton value="90" key="90">90
            </ToggleButton>,
            <ToggleButton value="120" key="120">120
            </ToggleButton>,
            <ToggleButton value="150" key="150">150
            </ToggleButton>,
            <ToggleButton value="180" key="180">180
            </ToggleButton>,
        ];

        const control = {
            value: alignment,
            onChange: handleAlignment,
            exclusive: true,
        };

        return (
            <Stack spacing={3} alignItems="center">
                <ToggleButtonGroup {...control} aria-label="Medium sizes">
                    {children}
                </ToggleButtonGroup>
            </Stack>
        );
    }
    return (
        <>
            <div>
                <div>

                    <ToggleButtonSizes></ToggleButtonSizes>
                </div>
                <Link to={'/Plankanimation/' + time}> <Button id="fr2"
                                                              aria-label="outlined primary button">Start</Button></Link>
            </div>
            <>

            </>
        </>

    )
}
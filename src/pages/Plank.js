import React, {useRef, useState} from 'react'
import {Link} from "react-router-dom";
import {Button} from "@material-ui/core";
import {ButtonGroup} from "@mui/material";

export default function Plank() {
    const [selectedButton, setSelectedButton] = useState(null);
//    const [selectedTime] = useState(null);
    const handleButtonClick = (buttonId,e) => {

        console.log(buttonId)
        //selectedTime(e.target.value)
        setSelectedButton(buttonId);
    }

    return (
        <>
            <div>
                <div>
                    <Button id="plankstarthome" variant="outlined">
                        <Link to="/">Home</Link>
                    </Button>
                    <div>
                        <ButtonGroup id="plankstartbuttongroup" variant="contained"
                                     aria-label="outlined primary button group">
                            <Button onClick={() => handleButtonClick(1)}
                                    style={{backgroundColor: selectedButton === 1 ? '#ccc' : 'inherit'}}>60
                            </Button>
                            <Button onClick={() => handleButtonClick(2)}
                                    style={{backgroundColor: selectedButton === 2 ? '#ccc' : 'inherit'}}>90
                            </Button>
                            <Button onClick={() => handleButtonClick(3)}
                                    style={{backgroundColor: selectedButton === 3 ? '#ccc' : 'inherit'}}>120
                            </Button>
                            <Button onClick={() => handleButtonClick(4)}
                                    style={{backgroundColor: selectedButton === 4 ? '#ccc' : 'inherit'}}>150
                            </Button>
                            <Button onClick={() => handleButtonClick(5)}
                                    style={{backgroundColor: selectedButton === 5 ? '#ccc' : 'inherit'}}>180
                            </Button>
                        </ButtonGroup>

                    </div>
                    <Button id="plankstart" variant="outlined">
                        <Link to="/Plankanimation">Start</Link>
                    </Button>
                </div>
            </div>
            <>

            </>
        </>

    )
}
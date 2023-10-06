import React, {useState} from 'react'
import {Link} from "react-router-dom";
import {Button} from "@material-ui/core";
import {ButtonGroup} from "@mui/material";

export default function Plank() {

    return (
        <>
            <div>
                <div>
                    <Button id="navac" variant="outlined">
                        <Link to="/">Home</Link>
                    </Button>
                    <div>
                        <ButtonGroup id="navac" variant="contained" aria-label="outlined primary button group">
                            <Button>60</Button>
                            <Button>90</Button>
                            <Button>120</Button>
                            <Button>150</Button>
                            <Button>180</Button>
                        </ButtonGroup>

                    </div>
                    <Button id="navac" variant="outlined">
                        <Link to="/Plankanimation">Start</Link>
                    </Button>
                </div>
            </div>
            <>

            </>
        </>

    )
}
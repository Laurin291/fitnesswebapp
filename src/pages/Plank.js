import React, {useState} from 'react'
import data from "../data.js";
import {Link} from "react-router-dom";
import {Button} from "@material-ui/core";
import {ButtonGroup} from "@mui/material";

export default function Plank() {
    const [setValue] = useState();
    const [setNumChildren] = useState(0)
    const data2 = data.get('uebungen')
    const addComponent = () => {
        setNumChildren(data2.length)
    }

    function handleChange(e) {
        addComponent()
        setValue(e.target.value);
    }

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
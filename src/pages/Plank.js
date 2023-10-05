import React, {useState} from 'react'
import data from "../data.js";
import {Select} from "@supabase/ui";
import {Link} from "react-router-dom";
import Plankanimation from "./Plankanimation.js";
import {Button} from "@material-ui/core";
import {ButtonGroup} from "@mui/material";

export default function Plank() {
    const [value, setValue] = useState();
    const [numChildren, setNumChildren] = useState(0)
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
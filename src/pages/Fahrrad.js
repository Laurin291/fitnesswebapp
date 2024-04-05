import React, {useState} from 'react'
import {Link} from "react-router-dom";
import ToggleButton from "@mui/material/ToggleButton";
import {Popper, Stack, Tooltip} from "@mui/material";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import {Zoom} from "@mui/material";
import {Button} from "@material-ui/core";


export default function Fahrradseite() {
    const [difficulty, setDifficulty] = useState("Leicht");

    const ToggleButtonSizes = () => {

        const handleAlignment = (event, newDifficulty) => {
            if (newDifficulty !== null) {
                setDifficulty(newDifficulty);
                setDifficulty(event.target.value)
            }
        };


        const children = [
            <div className="diffibuttons">
                <Link to={'/CyclingArea/easy'}> <ToggleButton value="Leicht" key="Leicht" className="diffibutton">
                    <div>
                        <Tooltip TransitionComponent={Zoom}
                                 title={
                                     <>
                                         <Typography color="inherit">Leicht:</Typography>
                                         <Typography color="inherit">-Anfang: 10 Minuten Aufwärmen</Typography>
                                         <Typography color="inherit">-Mitte: 10 Minuten abwechselnd</Typography>
                                         <Typography color="inherit">45 Sekunden Cooldown</Typography>
                                         <Typography color="inherit">15 Sekunden Intervall</Typography>
                                         <Typography color="inherit">-Schluss: 10 Minuten Ausfahren</Typography>
                                     </>
                                 }
                        >
                        <InfoTwoToneIcon id="fahrradinfoicon">
                        </InfoTwoToneIcon>
                        </Tooltip>
                        <div className="diffibar">
                            <div className="square square-green square-rounded-left"/>
                            <div className="square"/>
                            <div className="square"/>
                            <div className="square square-rounded-right"/>
                        </div>
                    </div>
                    <span style={{color:"black"}}>Leicht</span>
                </ToggleButton> </Link>

                <Link to={'/CyclingArea/medium'}>  <ToggleButton value="Mittel" key="Mittel" className="diffibutton">
                    <div>
                        <Tooltip TransitionComponent={Zoom}
                                 title={
                                     <>
                                         <Typography color="inherit">Mittel:</Typography>
                                         <Typography color="inherit">-Anfang: 10 Minuten Aufwärmen</Typography>
                                         <Typography color="inherit">-Mitte: 10 Minuten abwechselnd</Typography>
                                         <Typography color="inherit">35 Sekunden Cooldown</Typography>
                                         <Typography color="inherit">25 Sekunden Intervall</Typography>
                                         <Typography color="inherit">-Schluss: 10 Minuten Ausfahren</Typography>
                                     </>
                                 }
                        >
                            <InfoTwoToneIcon id="fahrradinfoicon">
                            </InfoTwoToneIcon>
                        </Tooltip>
                        <div className="diffibar">
                            <div className="square square-green square-rounded-left ">
                            </div>
                            <div className="square square-yellow">
                            </div>
                            <div className="square">
                            </div>
                            <div className="square square-rounded-right">
                            </div>
                        </div>
                    </div>
                    <span style={{color:"black"}}>Mittel</span>
                </ToggleButton> </Link>

                <Link to={'/CyclingArea/hard'}> <ToggleButton value="Schwer" key="Schwer" className="diffibutton">
                    <div>
                        <Tooltip TransitionComponent={Zoom}
                                 title={
                                     <>
                                         <Typography color="inherit">Schwer:</Typography>
                                         <Typography color="inherit">-Anfang: 10 Minuten Aufwärmen</Typography>
                                         <Typography color="inherit">-Mitte: 10 Minuten abwechselnd</Typography>
                                         <Typography color="inherit">30 Sekunden Cooldown</Typography>
                                         <Typography color="inherit">30 Sekunden Intervall</Typography>
                                         <Typography color="inherit">-Schluss: 10 Minuten Ausfahren</Typography>
                                     </>
                                 }
                        >
                            <InfoTwoToneIcon id="fahrradinfoicon">
                            </InfoTwoToneIcon>
                        </Tooltip>
                        <div className="diffibar">
                            <div className="square square-green square-rounded-left ">
                            </div>
                            <div className="square square-yellow">
                            </div>
                            <div className="square square-orange">
                            </div>
                            <div className="square square-rounded-right">
                            </div>
                        </div>
                    </div>
                    <span style={{color:"black"}}>Schwer</span>
                </ToggleButton></Link>

                <Link to={'/CyclingArea/alternative'}><ToggleButton value="Alternative" key="Alternative" className="diffibutton">
                    <div>
                        <Tooltip TransitionComponent={Zoom}
                                 title={
                                     <>
                                         <Typography color="inherit">Alternative:</Typography>
                                         <Typography color="inherit">-Anfang: 10 Minuten Aufwärmen</Typography>
                                         <Typography color="inherit">-Mitte: 10 Minuten abwechselnd</Typography>
                                         <Typography color="inherit">20 Sekunden Cooldown</Typography>
                                         <Typography color="inherit">40 Sekunden Intervall</Typography>
                                         <Typography color="inherit">-Schluss: 10 Minuten Ausfahren</Typography>
                                     </>
                                 }
                        >
                            <InfoTwoToneIcon id="fahrradinfoicon">
                            </InfoTwoToneIcon>
                        </Tooltip>
                        <div className="diffibar">
                            <div className="square square-green square-rounded-left ">
                            </div>
                            <div className="square square-yellow">
                            </div>
                            <div className="square square-orange">
                            </div>
                            <div className="square square-red square-rounded-right">
                            </div>
                        </div>
                    </div>
                    <span style={{color:"black"}}>Alternative</span>
                </ToggleButton></Link>
            </div>
        ];

        const control = {
            value: difficulty,
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
            <Zoom in={true}>
            <div id='content'>
                <div id="fahrradcontent">
                    <div id="ueberschriftfahrrad">Starte dein HIIT-Cycling Training</div>
                    <br/>
                    <div id="contentfarrad">
                        Wähle eine Schwierigskeisstufe:<br/>
                    </div>
                </div>
                <div>
                    <ToggleButtonSizes></ToggleButtonSizes>
                </div>
            </div>
            </Zoom>
            </>
    )
}
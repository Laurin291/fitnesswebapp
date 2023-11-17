import React, {useState} from 'react'
import {Link} from "react-router-dom";
import ToggleButton from "@mui/material/ToggleButton";
import {Popper, Stack} from "@mui/material";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import {Zoom} from "@mui/material";


export default function Fahrradseite() {
    const [difficulty, setDifficulty] = useState("Leicht");

    const ToggleButtonSizes = () => {

        const handleAlignment = (event, newDifficulty) => {
            if (newDifficulty !== null) {
                setDifficulty(newDifficulty);
                setDifficulty(event.target.value)
            }
        };
        const [anchorEl, setAnchorEl] = React.useState(null);
        const [open, setOpen] = React.useState(false);
        const [placement, setPlacement] = React.useState();

        const handleClick = (newPlacement) => (event) => {
            setAnchorEl(event.currentTarget);
            setOpen((prev) => placement !== newPlacement || !prev);
            setPlacement(newPlacement);
        };

        const children = [
            <div className="diffibuttons">
                <ToggleButton value="Leicht" key="Leicht" className="diffibutton">
                    <div>
                        <InfoTwoToneIcon id="fahrradinfoicon" onClick={handleClick('right')}></InfoTwoToneIcon>
                        <div className="diffibar">
                            <div className="square square-green square-rounded-left"/>
                            <div className="square"/>
                            <div className="square"/>
                            <div className="square square-rounded-right"/>
                        </div>
                        <Link to={'/CyclingArea/Leicht'}> Leicht </Link>
                    </div>
                    <Box sx={{width: 500}}>
                        <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
                            {({TransitionProps}) => (
                                <Fade {...TransitionProps} timeout={350}>
                                    <Paper>
                                        <Typography sx={{p: 2}}>Leicht:<br/>
                                            -Anfang: 10 Minuten Aufwärmen<br/>
                                            -Mitte: 10 Minuten abwechselnd <br/>
                                            -45 Sekunden Cooldown <br/>
                                            -15 Sekunden Intervall<br/>
                                            -Schluss: 10 Minuten Ausfahren<br/></Typography>
                                    </Paper>
                                </Fade>
                            )}
                        </Popper>
                    </Box>
                </ToggleButton>,

                <ToggleButton value="Mittel" key="Mittel" className="diffibutton">
                    <div>
                        <InfoTwoToneIcon id="fahrradinfoicon" onClick={handleClick('right')}></InfoTwoToneIcon>
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
                        <Link to={'/CyclingArea/Mittel'}> Mittel </Link>
                    </div>
                    <Box sx={{width: 500}}>
                        <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
                            {({TransitionProps}) => (
                                <Fade {...TransitionProps} timeout={350}>
                                    <Paper>
                                        <Typography sx={{p: 2}}>Schwer:<br/>
                                            -Anfang: 10 Minuten Aufwärmen<br/>
                                            -Mitte: 10 Minuten abwechselnd <br/>
                                            -30 Sekunden Cooldown <br/>
                                            -30 Sekunden Intervall<br/>
                                            -Schluss: 10 Minuten Ausfahren<br/>
                                        </Typography>
                                    </Paper>
                                </Fade>
                            )}
                        </Popper>
                    </Box>
                </ToggleButton>,
                <ToggleButton value="Schwer" key="Schwer" className="diffibutton">
                    <div>
                        <InfoTwoToneIcon id="fahrradinfoicon" onClick={handleClick('right')}></InfoTwoToneIcon>
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
                        <Link to={'/CyclingArea/Schwer'}> Schwer </Link>
                    </div>
                    <Box sx={{width: 500}}>
                        <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
                            {({TransitionProps}) => (
                                <Fade {...TransitionProps} timeout={350}>
                                    <Paper>
                                        <Typography sx={{p: 2}}>Alternative:<br/>
                                            -Anfang: 10 Minuten Aufwärmen<br/>
                                            -Mitte: 10 Minuten abwechselnd <br/>
                                            -20 Sekunden Cooldown <br/>
                                            -40 Sekunden Intervall<br/>
                                            -Schluss: 10 Minuten Ausfahren<br/></Typography>
                                    </Paper>
                                </Fade>
                            )}
                        </Popper>
                    </Box>
                </ToggleButton>,
                <ToggleButton value="Alternative" key="Alternative" className="diffibutton">
                    <div>
                        <InfoTwoToneIcon id="fahrradinfoicon" onClick={handleClick('right')}></InfoTwoToneIcon>
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
                        <Link to={'/CyclingArea/Alternative'}> Alternative</Link>
                    </div>
                    <Box sx={{width: 500}}>
                        <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
                            {({TransitionProps}) => (
                                <Fade {...TransitionProps} timeout={350}>
                                    <Paper>
                                        <Typography sx={{p: 2}}>Leicht:<br/>
                                            -Anfang: 10 Minuten Aufwärmen<br/>
                                            -Mitte: 10 Minuten abwechselnd <br/>
                                            -45 Sekunden Cooldown <br/>
                                            -15 Sekunden Intervall<br/>
                                            -Schluss: 10 Minuten Ausfahren<br/></Typography>
                                    </Paper>
                                </Fade>
                            )}
                        </Popper>
                    </Box>
                </ToggleButton>
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
                    <div id="ueberschriftfahrrad">Willkommen zurück</div>
                    <br/>
                    <div id="contentfarrad">
                        Starten Sie ihr Indoor HIIT Cycling Training.<br/>
                        Wählen Sie eine Schwierigskeisstufe und beginnen Sie.<br/>
                        Viel spass und gutes Gelingen!
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
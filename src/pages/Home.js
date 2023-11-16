
import React from 'react';
import '../index.css'
import ToggleButton from "@mui/material/ToggleButton";
import {Link} from "react-router-dom";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import BarChartIcon from '@mui/icons-material/BarChart';

export default function Home() {




    return (
        <>
            <div id="Homeanzeige">
                <h1 className="ueberschrifthome">Willkommen Zurück, Patrik Hackl</h1>
                <div id="Homedivs">
                    <Link to="/create"><ToggleButton id="HomeBoxes" style={{backgroundColor: 'green'}}>
                        <AddCircleOutlineIcon id="icon"></AddCircleOutlineIcon>
                        Neunen Trainingsplan erstellen
                    </ToggleButton></Link>

                    <Link to="/Fahrrad"><ToggleButton id="HomeBoxes" style={{backgroundColor: 'blue'}}>
                        <DirectionsBikeIcon id="icon"></DirectionsBikeIcon>
                        Fahrradfahren
                    </ToggleButton></Link>

                    <Link to="/Plank"><ToggleButton id="HomeBoxes" style={{backgroundColor: 'black'}}>
                        <PlayArrowIcon id="icon"></PlayArrowIcon>
                        Planken
                    </ToggleButton></Link>

                </div>

                <Link to="/gewichtsverlauf"><ToggleButton id="gewichthome" style={{backgroundColor: 'orange'}}>
                    <BarChartIcon id="icon"></BarChartIcon>
                    Gewichtsverlauf
                </ToggleButton></Link>

            </div>
        </>

    )
}

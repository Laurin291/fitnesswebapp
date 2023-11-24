
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
                    <Link to="/create"><ToggleButton id="HomeBoxes" style={{backgroundColor: '#006eb0'}}>
                        <AddCircleOutlineIcon id="icon2"> </AddCircleOutlineIcon>
                        Trainingsplan
                    </ToggleButton></Link>

                    <Link to="/Fahrrad"><ToggleButton id="HomeBoxes" style={{backgroundColor: '#004d7b'}}>
                        <DirectionsBikeIcon id="icon2"></DirectionsBikeIcon>
                        HIIT Training
                    </ToggleButton></Link>
                </div>
                <div id="Homedivs2">
                <Link to="/Plank"><ToggleButton id="HomeBoxes" style={{backgroundColor: '#609bbf'}}>
                    <PlayArrowIcon id="icon2"></PlayArrowIcon>
                    Planken
                </ToggleButton></Link>

                <Link to="/gewichtsverlauf"><ToggleButton id="HomeBoxes" style={{backgroundColor: '#80cfff'}}>
                    <BarChartIcon id="icon2"></BarChartIcon>
                    Gewichtsverlauf
                </ToggleButton></Link>
                </div>

            </div>
        </>

    )
}

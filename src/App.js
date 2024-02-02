import {BrowserRouter, Link, Route, Routes} from "react-router-dom"

// pages
import Home from "./pages/Home.js"
import Create from "./pages/Create.js"
import Update from "./pages/Update.js"
import Uebungselect from "./pages/Uebungselect.js"
import Fahrrad from "./pages/Fahrrad.js"
import CyclingArea from "./pages/CyclingArea.js"
import React, {useEffect, useState} from "react";
import Plank from "./pages/Plank";
import Plankanimation from "./pages/Plankanimation";
import Trainingsplanverwaltung from "./pages/Trainingsplanverwaltung";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Gewichtsverlauf from "./pages/Gewichtsverlauf";
import Einstellungen from "./pages/Einstellungen"
import ResetPassword from "./pages/ResetPassword"
import Verifyemail from "./pages/Verifyemail"
import HomeIcon from '@mui/icons-material/Home';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import BarChartIcon from '@mui/icons-material/BarChart';
import avatar from './pictures/avatar.png';
import Switch from "@mui/material/Switch";
import EditTrainingstag from "./pages/EditTrainingstag";
import Chart from "./pages/Gewichtsverlauf";
import Chartgoogle from "./pages/Gewichtsverlauf";


function App() {

    const handleClick = (event) => {
        const listItems = document.querySelectorAll(".text")
        listItems.forEach(listItem => {
            if (event.target===listItem) {
                listItem.classList.add("underline-class")
            } else {
                listItem.classList.remove("underline-class")
            }
        })
    };

    const sidebar =() =>{
        return(
            <nav className="sidenavbar">
                <div className="avatar">
                    <img src={avatar} className="avatar__image"/>
                </div>

                <div className="wrapper" onClick={e => handleClick(e)}>
                    <HomeIcon id="icon"></HomeIcon>
                    <Link to="/fitnesswebapp/Home" className="text" >Home</Link>
                </div>
                <div className="wrapper " onClick={e => handleClick(e)}>
                    <AddCircleOutlineIcon id="icon"></AddCircleOutlineIcon>
                    <Link to="/fitnesswebapp/create" className="text ">Trainingsplan</Link>
                </div>

                <div className="wrapper " onClick={e => handleClick(e)}>
                    <DirectionsBikeIcon id="icon"></DirectionsBikeIcon>
                    <Link to="/fitnesswebapp/Fahrrad" className="text ">HIIT Training</Link>
                </div>

                <div className="wrapper "  onClick={e => handleClick(e)}>
                    <PlayArrowIcon id="icon"></PlayArrowIcon>
                    <Link to="/fitnesswebapp/Plank" className="text ">Planken</Link>
                </div>
                <div className="wrapper"  onClick={e => handleClick(e)}>
                    <BarChartIcon id="icon"></BarChartIcon>
                    <Link to="/fitnesswebapp/Gewichtsverlauf" className="text ">Gewicht</Link>
                </div>

                <div className="wrapper" id="textdown" onClick={e => handleClick(e)}>
                    <SettingsIcon id="icon"></SettingsIcon>
                    <Link to="/fitnesswebapp/Einstellungen" className="text ">Einstellungen</Link>
                </div>
                <div className="wrapper" onClick={e => handleClick(e)}>
                    <LogoutIcon id="icon"></LogoutIcon>
                    <Link to="/fitnesswebapp/" className="text">Ausloggen</Link>
                </div>
            </nav>
        )
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/fitnesswebapp/" element={<Login/>}/>
                <Route path="/fitnesswebapp/Registration" element={<Registration/>}/>
                <Route path="/fitnesswebapp/ResetPassword/:email" element={<ResetPassword/>}/>
                <Route path="/fitnesswebapp/Verifyemail/:email" element={<Verifyemail/>}/>
                <Route path="/fitnesswebapp/Home" element={[sidebar(), <Home/>]}></Route>
                <Route path="/fitnesswebapp/create" element={[sidebar(), <Create/>]}/>
                <Route path="/fitnesswebapp/:id" element={[sidebar(), <Update/>]}/>
                <Route path="/fitnesswebapp/uebungselect/:number" element={[sidebar(), <Uebungselect/>]}/>
                <Route path="/fitnesswebapp/Fahrrad" element={[sidebar(), <Fahrrad/>]}/>
                <Route path="/fitnesswebapp/CyclingArea/:difficulty" element={[sidebar(), <CyclingArea/>]}/>
                <Route path="/fitnesswebapp/Plank" element={[sidebar(), <Plank/>]}/>
                <Route path="/fitnesswebapp/Plankanimation/:time" element={[sidebar(), <Plankanimation/>]}/>
                <Route path="/fitnesswebapp/Trainingsplanverwaltung" element={[sidebar(), <Trainingsplanverwaltung/>]}/>
                <Route path="/fitnesswebapp/Gewichtsverlauf" element={[sidebar(), <Gewichtsverlauf/>]}/>
                <Route path="/fitnesswebapp/Einstellungen" element={[sidebar(), <Einstellungen/>]}/>
                <Route path="/fitnesswebapp/Chart" element={[sidebar(), <Chartgoogle/>]}/>
                <Route path="/fitnesswebapp/EditTrainingstag/:uebungArray/:trainingstagID/:tagesbezeichnung" element={[sidebar(), <EditTrainingstag/>]}/>
            </Routes>
        </BrowserRouter>
    )

}

export default App;
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"

// pages
import Home from "./pages/Home.js"
import Create from "./pages/Create.js"
import Update from "./pages/Update.js"
import Uebungselect from "./pages/Uebungselect.js"
import Fahrrad from "./pages/Fahrrad.js"
import CyclingArea from "./pages/CyclingArea.js"
import React from "react";
import Plank from "./pages/Plank";
import Plankanimation from "./pages/Plankanimation";
import Trainingsplanverwaltung from "./pages/Trainingsplanverwaltung";
import Login from "./pages/Login";
import Registration from "./pages/Registration";

import HomeIcon from '@mui/icons-material/Home';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import  avatar from './pictures/avatar.png';



function App() {
    return (
        <BrowserRouter>
            <nav className="sidenavbar">
                <div className="avatar">
                    <img src={avatar} className="avatar__image"/>
                </div>

                <div class="wrapper">
                    <HomeIcon id="icon"></HomeIcon>
                    <Link to="/Home" className="text">Home</Link>
                </div>
                <div className="wrapper">
                    <AddCircleOutlineIcon id="icon"></AddCircleOutlineIcon>
                    <Link to="/create" className="text">Trainingsplan</Link>
                </div>
                <div className="wrapper">
                    <DirectionsBikeIcon id="icon"></DirectionsBikeIcon>
                    <Link to="/Fahrrad" className="text">HIIT-Training</Link>
                </div>
                <div className="wrapper">
                    <PlayArrowIcon id="icon"></PlayArrowIcon>
                    <Link to="/Plank" className="text">Plank starten</Link>
                </div>
                <div className="wrapper" id="textdown">
                    <SettingsIcon id="icon"></SettingsIcon>
                    <Link to="/Einstellungen" className="text">Einstellungen</Link>
                </div>
                <div className="wrapper">
                    <LogoutIcon id="icon"></LogoutIcon>
                    <Link to="/Ausloggen" className="text">Ausloggen</Link>
                </div>


            </nav>

            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/Registration" element={<Registration/>} />
                <Route path="/Home" element={<Home />} />
                <Route path="/create" element={<Create />} />
                <Route path="/:id" element={<Update />} />
                <Route path="/uebungselect/:number" element={<Uebungselect/>} />
                <Route path="/Fahrrad" element={<Fahrrad/>} />
                <Route path="/CyclingArea/:difficulty" element={<CyclingArea/>} />
                <Route path="/Plank" element={<Plank/>} />
                <Route path="/Plankanimation/:time" element={<Plankanimation/>} />
                <Route path="/Trainingsplanverwaltung" element={<Trainingsplanverwaltung/>} />
            </Routes>

        </BrowserRouter>
    );
}

export default App;
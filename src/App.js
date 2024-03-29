import {BrowserRouter, Link, Route, Routes} from "react-router-dom"

// pages
import Home from "./pages/Home.js"
import Create from "./pages/Create.js"
import Update from "./pages/Update.js"
import Uebungselect from "./pages/Uebungselect.js"
import Fahrrad from "./pages/Fahrrad.js"
import CyclingArea from "./pages/Cycling/CyclingArea"
import React from "react";
import Plank from "./pages/Plank";
import Plankanimation from "./pages/Plankanimation";
import Trainingsplanverwaltung from "./pages/Trainingsplanverwaltung";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Gewichtsverlauf from "./pages/Gewichtsverlauf";
import Chartgoogle from "./pages/Gewichtsverlauf";
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
import EditTrainingstag from "./pages/EditTrainingstag";
import Difficulty from "./pages/Cycling/Difficulty";


function App() {

    const WildcardPath = () => {
        return (
            <div>
                wildcard
            </div>
        );
    }

    const handleClick = (event) => {
        const listItems = document.querySelectorAll(".text")
        listItems.forEach(listItem => {
            if (event.target === listItem) {
                listItem.classList.add("underline-class")
            } else {
                listItem.classList.remove("underline-class")
            }
        })
    };
    const handleonClick = () => {
        localStorage.clear()
    }

    const sidebar = () => {
        return (
            <nav className="sidenavbar">
                <div className="avatar">
                    <img src={avatar} className="avatar__image"/>
                </div>

                <div className="wrapper" onClick={e => handleClick(e)}>
                    <HomeIcon id="icon"></HomeIcon>
                    <Link to="/Home" className="text">Home</Link>
                </div>
                <div className="wrapper " onClick={e => handleClick(e)}>
                    <AddCircleOutlineIcon id="icon"></AddCircleOutlineIcon>
                    <Link to="/create" className="text ">Trainingsplan</Link>
                </div>

                <div className="wrapper " onClick={e => handleClick(e)}>
                    <DirectionsBikeIcon id="icon"></DirectionsBikeIcon>
                    <Link to="/Fahrrad" className="text ">HIIT Training</Link>
                </div>

                <div className="wrapper " onClick={e => handleClick(e)}>
                    <PlayArrowIcon id="icon"></PlayArrowIcon>
                    <Link to="/Plank" className="text ">Planken</Link>
                </div>
                <div className="wrapper" onClick={e => handleClick(e)}>
                    <BarChartIcon id="icon"></BarChartIcon>
                    <Link to="/Gewichtsverlauf" className="text ">Gewicht</Link>
                </div>

                <div className="wrapper" id="textdown" onClick={e => handleClick(e)}>
                    <SettingsIcon id="icon"></SettingsIcon>
                    <Link to="/Einstellungen" className="text ">Einstellungen</Link>
                </div>
                <div className="wrapper" onClick={e => handleonClick(e)}>
                    <LogoutIcon id="icon"></LogoutIcon>
                    <Link to="/" className="text">Ausloggen</Link>
                </div>
            </nav>
        )
    }

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/Registration" element={<Registration/>}/>
                    <Route path="/ResetPassword/:email" element={<ResetPassword/>}/>
                    <Route path="/Verifyemail/:email" element={<Verifyemail/>}/>
                    <Route path="/Home" element={[sidebar(), <Home/>]}></Route>
                    <Route path="/create" element={[sidebar(), <Create/>]}/>
                    <Route path="/:id" element={[sidebar(), <Update/>]}/>
                    <Route path="/uebungselect/:number" element={[sidebar(), <Uebungselect/>]}/>
                    <Route path="/Fahrrad" element={[sidebar(), <Fahrrad/>]}/>
                    <Route path="/CyclingArea/:difficulty"
                           element={[sidebar(), <CyclingArea duration={1800} runs={10}/>]}/>
                    <Route path="/Plank" element={[sidebar(), <Plank/>]}/>
                    <Route path="/Plankanimation/:time" element={[sidebar(), <Plankanimation/>]}/>
                    <Route path="/Trainingsplanverwaltung" element={[sidebar(), <Trainingsplanverwaltung/>]}/>
                    <Route path="/Gewichtsverlauf" element={[sidebar(), <Gewichtsverlauf/>]}/>
                    <Route path="/Einstellungen" element={[sidebar(), <Einstellungen/>]}/>
                    <Route path="/Chart" element={[sidebar(), <Chartgoogle/>]}/>
                    <Route path="/EditTrainingstag/:uebungArray/:trainingstagID/:tagesbezeichnung"
                           element={[sidebar(), <EditTrainingstag/>]}/>
                    <Route path="*" element={<WildcardPath/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    )

}

export default App;
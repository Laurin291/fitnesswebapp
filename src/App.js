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

function App() {
    return (
        <BrowserRouter>
            <nav id="uppernavbar">
                <h1 id="headline">FitnessApp</h1>
            </nav>

            <nav id="sidenavbar">
                <Link to="/">Home</Link>
                <Link to="/create">Neuen Trainingsplan erstellen</Link>
                <Link to="/Fahrrad">Fahrradtraining starten</Link>
                <Link to="/Plank">Plank starten</Link>
                <a id="info">Info</a>
                <a>Ausloggen</a>
            </nav>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/create" element={<Create />} />
                <Route path="/:id" element={<Update />} />
                <Route path="/uebungselect/:number" element={<Uebungselect/>} />
                <Route path="/Fahrrad" element={<Fahrrad/>} />
                <Route path="/CyclingArea" element={<CyclingArea/>} />
                <Route path="/Plank" element={<Plank/>} />
                <Route path="Plankanimation" element={<Plankanimation/>} />
            </Routes>

        </BrowserRouter>
    );
}

export default App;
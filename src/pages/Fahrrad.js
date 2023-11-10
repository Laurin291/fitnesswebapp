import React, {useState} from 'react'
import {Button} from '@supabase/ui'
import {Link} from "react-router-dom";
import ToggleButton from "@mui/material/ToggleButton";
import {Stack} from "@mui/material";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

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
            <Link to={'/CyclingArea/Leicht'}><ToggleButton value="Leicht" key="Leicht">
                Leicht:<br/>
                -Anfang: 10 Minuten Aufwärmen<br/>
                -Mitte: 10 Minuten abwechselnd <br/>
                -45 Sekunden Cooldown <br/>
                -15 Sekunden Intervall<br/>
                -Schluss: 10 Minuten Ausfahren<br/>
            </ToggleButton></Link>,
            <Link to={'/CyclingArea/Mittel' }> <ToggleButton value="Mittel" key="Mittel">
                Mittel:<br/>
                -Anfang: 10 Minuten Aufwärmen<br/>
                -Mitte: 10 Minuten abwechselnd <br/>
                -35 Sekunden Cooldown <br/>
                -25 Sekunden Intervall<br/>
                -Schluss: 10 Minuten Ausfahren<br/>
            </ToggleButton></Link>,
            <Link to={'/CyclingArea/Schwer'}><ToggleButton value="Schwer" key="Schwer">
                Schwer:<br/>
                -Anfang: 10 Minuten Aufwärmen<br/>
                -Mitte: 10 Minuten abwechselnd <br/>
                -30 Sekunden Cooldown <br/>
                -30 Sekunden Intervall<br/>
                -Schluss: 10 Minuten Ausfahren<br/>
            </ToggleButton></Link>,
            <Link to={'/CyclingArea/Alternative'}><ToggleButton value="Alternative" key="Alternative">
                Alternative:<br/>
                -Anfang: 10 Minuten Aufwärmen<br/>
                -Mitte: 10 Minuten abwechselnd <br/>
                -20 Sekunden Cooldown <br/>
                -40 Sekunden Intervall<br/>
                -Schluss: 10 Minuten Ausfahren<br/>
            </ToggleButton></Link>,

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
            <div id='content'>
                <div>
                    Willkommen zurück, Rainer Zufall! <br/>
                    Starten Sie ihr Indoor HIIT Cycling Training.<br/>
                    Wählen Sie eine Schwierigskeisstufe und beginnen Sie.<br/>
                    Viel spass und gutes Gelingen!
                </div>
                <div>
                    <ToggleButtonSizes></ToggleButtonSizes>
                </div>
            </div>
            <>

            </>
        </>

    )
}



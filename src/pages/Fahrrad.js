import React, {useState} from 'react'
import {Button, Select} from '@supabase/ui'
import {Link} from "react-router-dom";

export default function Fahrradseite() {
    const [difficulty, setDifficulty] = useState("Leicht");

    function handleChange(e) {
        setDifficulty(e.target.value)
    }

    return (

        <div>
            <div>
                Willkommen zurück, Rainer Zufall! <br/>
                Starten Sie ihr Indoor HIIT Cycling Training.<br/>
                Wählen Sie eine Schwierigskeisstufe und beginnen Sie.<br/>
                Viel spass und gutes Gelingen!
            </div>
            <div id="divs">
                <div className="ShowDiffi">
                    Leicht:<br/>
                    -Anfang: 10 Minuten Aufwärmen<br/>
                    -10 Minuten IntervallPhase: <br/>
                        -45 Sekunden Cooldown<br/>
                        -15 Sekunden Intervall<br/>
                    -Schluss: 10 Minuten Ausfahren<br/>
                </div>
                <div className="ShowDiffi">
                    Mittel:<br/>
                    -Anfang: 10 Minuten Aufwärmen<br/>
                    -10 Minuten IntervallPhase: <br/>
                         -35 Sekunden Cooldown <br/>
                         -25 Sekunden Intervall<br/>
                    -Schluss: 10 Minuten Ausfahren<br/>
                </div>
                <div className="ShowDiffi">
                    Schwer:<br/>
                    -Anfang: 10 Minuten Aufwärmen<br/>
                    -10 Minuten IntervallPhase: <br/>
                    -30 Sekunden Cooldown<br/>
                    -30 Sekunden Intervall<br/>
                    -Schluss: 10 Minuten Ausfahren<br/>
                </div>
                <div className="ShowDiffi">
                    Alternative:<br/>
                    -Anfang: 10 Minuten Aufwärmen<br/>
                    -10 Minuten IntervallPhase: <br/>
                    -20 Sekunden Cooldown<br/>
                    -40 Sekunden Intervall<br/>
                    -Schluss: 10 Minuten Ausfahren<br/>
                </div>

            </div>
            <div>
                <h2 id="fr">Schwierigkeitsstufe wählen <Select id="options" onChange={handleChange}>
                    <Select.Option>Leicht</Select.Option>
                    <Select.Option>Mittel</Select.Option>
                    <Select.Option>Schwer</Select.Option>
                    <Select.Option>Alternative</Select.Option>
                </Select>
                </h2>
            </div>
            <Link to={'/CyclingArea/' + difficulty}> <Button id="fr2">Start</Button></Link>
        </div>


    )
}
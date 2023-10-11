import {useState} from 'react'
import {
    Button,
    Divider,
    Dropdown,
    IconClipboard,
    IconCopy,
    IconTrash,
    Select,
    SidePanel,
    Typography
} from '@supabase/ui'
import {Link} from "react-router-dom";
import React, { Component } from "react";

export default function Fahrradseite(){
    const [difficulty, setDifficulty] = useState("Leicht");

    function handleChange(e){
        setDifficulty(e.target.value)
    }


    return (
            <div>
                <div>
                    <div >
                        <h2 id="fr">Schwierigkeitsstufe wählen <Select  id="options" onChange={handleChange}>
                            <Select.Option>Leicht</Select.Option>
                            <Select.Option>Mittel</Select.Option>
                            <Select.Option>Schwer</Select.Option>
                            <Select.Option>Alternative</Select.Option>
                    </Select>
                        </h2>
                    </div>
                    <Link to={'/CyclingArea/' + difficulty}> <Button id="fr2">Start</Button></Link>

                </div>

            </div>

    )
}
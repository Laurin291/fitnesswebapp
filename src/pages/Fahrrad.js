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
import data from "../data.js";
import {ReactComponent as PlusIcon} from '../icons/plus-circle-fill.svg';
import {Link} from "react-router-dom";
import supabase from "../config/supabaseClient.js";
import React, { Component } from "react";
import CyclingArea from ".//CyclingArea.js"

export default function Fahrradseite(){
    const data2 = data.get('uebungen')
    const [numChildren, setNumChildren] = useState(0)
    const [value, setValue] = useState();

    function handleChange(e){
        addComponent()
        setValue(e.target.value);
    }

    const addComponent = () => {
        setNumChildren(data2.length)
    }

    return (
        <>
            <div>
                <div>
                    <h2 id="ch">
                        Nasenbären erreichen Kopf-Rumpf-Längen von 43 bis 70 cm. Der abwechselnd gelb und braun gebänderte Schwanz ist mit 42 bis 68 cm etwa ebenso lang.[2] Ihre Schulterhöhe wird mit bis zu 30,5 cm, ihr Gewicht mit 3,5 bis 6 kg angegeben. Die Vorderbeine sind kurz, die Hinterbeine lang. Gewöhnlich sind die Männchen größer als die Weibchen. Der Nelson-Nasenbär ist relativ klein, seine Größe überlappt sich aber mit der der Festlandpopulationen.[3]

                        Die Behaarung des Nelson-Nasenbärs ist kurz, recht weich und seidig. Bei anderen Populationen beider Arten ist das Haar länger und etwas rau.[3] Die dorsale Fellfarbe ist variabel von einem hellen braun bis zu rötlich[2] und schwarz[3]. Unterseits reicht die Fellfarbe von gelblich bis dunkelbraun. Schnauze, Kinn und Kehle sind gewöhnlich weiß, die Füße schwarz.[3] Die Schulterregion adulter Männchen kann gelbe oder weiße Haare zeigen. Die Augen sind von einer rötlichen bis braunen Maske umgeben[2], das Gesicht schwarz und weiß gefleckt[3]. Die Schnauze des Südamerikanischen Nasenbären variiert von grau bis braun, ist jedoch nie wie beim Weißrüssel-Nasenbären und dem Nelson-Nasenbären weiß.[4]

                        Die Ohren sind kurz, die lange Schnauze an der Spitze sehr beweglich.[2] Die Arten unterscheiden sich durch eine Reihe von Schädelmerkmalen. Die einfachste Unterscheidung kann am Gaumen erfolgen: Bei Nasua nasua ist er flach, bei Nasua narica entlang der Mittellinie niedergedrückt.[3]
                    </h2>
                    <div >
                        <h2 id="fr">Bitte wählen Sie die gewünschte Zeit aus <Select  id="options" onChange={handleChange} >
                            <Select.Option>30 Minuten</Select.Option>
                            <Select.Option>40 Minuten</Select.Option>
                        </Select>
                        </h2>
                    </div>
                </div>
                <Link to="/CyclingArea">Home <Button id="fr2">Start</Button></Link>

            </div>
            <>

            </>

        </>




    )
}
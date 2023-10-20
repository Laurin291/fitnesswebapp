import {useEffect, useState} from 'react'
import data from "../data.js";
import {ReactComponent as PlusIcon} from '../icons/plus-circle-fill.svg';
import {Link} from "react-router-dom";
import Button from '@mui/material/Button';
import supabase from "../config/supabaseClient";
import * as React from 'react';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Backdrop from '@mui/material/Backdrop';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import {useNavigate} from "react-router-dom";
import { validTrainingsplanname, validTagesbezeichnung } from '../Regex.js';
import Checkbox from "@mui/material/Checkbox";
import LabelOutlinedIcon from '@mui/icons-material/LabelOutlined';
import LabelIcon from '@mui/icons-material/Label';


export default function Create() {
    const [numChildren, setNumChildren] = useState(0)
    const [value, setValue] = useState("Beine");
    const [Trainingsplanname, setTrainingsplanname] = useState('')

    const [formError, setFormError] = useState(null)
    const [loading, setLoading] = React.useState(false);
    const [query, setQuery] = React.useState('idle');
    const timerRef = React.useRef();
    const navigate = useNavigate();
    const [error, setError] = useState(true)
    const [alertinhalt, setAlertInhalt] = useState("")
    const [checked, setChecked] = React.useState(true);


    window.onbeforeunload = function () {
        window.localStorage.clear()
        return 'Are you sure you want to leave?';
    };

    // Funktion um die ausgewaehlten Uebungen von Uebungselect.js in ihre Kurzform umzuwandeln und anzuzeigen
    function getUebungText(nummer) {
        let text = null
        text = window.localStorage.getItem(nummer)


        if (text != null && text.length > 2) {
            console.log("************** " + text.length)
            let text1 = text.split(",")
            let hilfe = []
            for (let i = 0; i < text1.length; i++) {
                let text2 = text1[i].replace('"', "")
                hilfe.push(text2)
            }
            let kurzNamenobjectarray = []
            let kurzNameString = []

            for (let i = 0; i < hilfe.length; i++) {
                kurzNamenobjectarray.push(data.getbyUbung("uebungen", hilfe[i]))
            }


            if (kurzNamenobjectarray.every(element => element !== null)) {
                for (let i = 0; i < kurzNamenobjectarray.length; i++) {
                    let kurzname = kurzNamenobjectarray[i][0].Kurzname

                    kurzNameString.push(kurzname)
                }

            }
            let ausgabeVor = '';
            for (let i = 0; i < kurzNameString.length; i++) {
                ausgabeVor = ausgabeVor + kurzNameString[i].replace("[", "").replace("]", "").replace('"', '').replace(' ', '') + ", "
            }

            return ausgabeVor

        } else {
            return ""
        }

    }

    function getNameText(nummer) {
        return window.localStorage.getItem("Name" + nummer.number)
    }

    function getTrainingsplanNameText() {
        return window.localStorage.getItem("TrainingsplanName")
    }

    function saveName(name, nummer) {

        if (!validTagesbezeichnung.test(name)) {
            document.getElementById(nummer.number).style.backgroundColor = 'lightsalmon'

        }else {
            document.getElementById(nummer.number).style.backgroundColor = "lightgreen";
            window.localStorage.setItem("Name" + nummer.number, name)

        }
    }

    function saveTrainingsplanName(name) {
        if (!validTrainingsplanname.test(name)) {
            document.getElementById("trainingsplanname").style.backgroundColor = 'lightsalmon'

        }else {
            document.getElementById("trainingsplanname").style.backgroundColor = "lightgreen";
            window.localStorage.setItem("TrainingsplanName", name)

        }


    }

    //Funktion um den LocalStorage zu löschen *********************************
    function clearLocalStorage() {
        window.localStorage.clear()
    }

    //Component der Trainingsplanerstellung um öfter das gleiche Object am Bildschirm anzuzeigen
    const DayCreateComponent = (number) => {



        const handleChange = (event) => {
            if (document.getElementById(number.number).disabled === false){
                document.getElementById(number.number).disabled = true
                document.getElementById(number.number).value = "REST"
                window.localStorage.setItem("Name"+number.number, "REST")
            }else{
                document.getElementById(number.number).disabled = false
                document.getElementById(number.number).value = ""
                window.localStorage.setItem("Name"+number.number, "")
            }


        };


        return (
            <li>
                <Checkbox icon={<LabelOutlinedIcon/>} checkedIcon={<LabelIcon />} onChange={handleChange}/>
                <input type="text" id={number.number} className="tagesbezeichnung" defaultValue={getNameText(number)}
                       onChange={(e) => saveName(e.target.value, number)}></input>

                <input type="text" className="uebungauswählen" disabled value={getUebungText(number.number)}></input>
                <Link to={'/uebungselect/' + number.number}><PlusIcon class="plusicon"></PlusIcon> </Link>
            </li>
        )
    }

    //Component der Trainingsplananzeige um öfter das gleiche Object am Bildschirm anzuzeigen
    const DayShowComponent = ({tag}) => {
        return (
            <div className="trtagdivs">
                <p className="trtagcontent">Tag{tag.tagesnummer}</p>
                <p className="trtagcontent">{tag.wochentag}</p>
                <p className="trtagcontent">{tag.tagesbezeichnung}</p>
            </div>
        )
    }


    // Funktion um den ganzen Trainingsplan zu speichern **********************
    async function submitAction() {
        setOpen(false)
        setError(false)

        let tagesbezeichnungUebungen = []
        let uebungen = []

        try {


            for (let i = 1; i <= 7; i++) {

                uebungen.push(window.localStorage.getItem(i).split(','))
            }


            for (let i = 0; i < uebungen.length; i++) {
                for (let j = 0; j < uebungen[i].length; j++) {


                    const {data, error} = await supabase
                        .from("uebungen")
                        .select("uebungID")
                        .match({Name: uebungen[i][j]})


                    uebungen[i][j] = data[0].uebungID


                }

                let a = i + 1
                let b = "Name" + a
                let newItems = [window.localStorage.getItem(b), uebungen[i]];
                tagesbezeichnungUebungen.push(newItems);

            }


            uebungen = data.postTrainingsplan(tagesbezeichnungUebungen, window.localStorage.getItem("TrainingsplanName"))

            uebungen.then(value => {
                setError(value)


                if (!value) {
                    navigate("/Trainingsplanverwaltung/true")
                    clearLocalStorage()

                } else {
                    handleClick("Trainingsplanname bereits vorhanden")
                }
            })




        } catch (e) {
            setError(true)
            console.log(e.message)
            handleClick('Bitte alles ausfüllen')
        }


    }


    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const [open, setOpen] = React.useState(false);

    const handleClick = (nachricht) => {
        setOpen(true);
        setAlertInhalt(nachricht)
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };


    return (
        <>
            <div id="content">
                {/* Anzeige der oberen Hälfte des Bildschirms */}
                <div id="trainingsplananzeige">
                    <h1 className="ueberschrift">Mein derzeitiger Trainingsplan</h1>
                    <div id="divs">
                        <DayShowComponent tag={{
                            tagesnummer: 1,
                            wochentag: 'Montag',
                            tagesbezeichnung: 'Push'
                        }}/>
                        <DayShowComponent tag={{
                            tagesnummer: 2,
                            wochentag: 'Dienstag',
                            tagesbezeichnung: 'Pull'
                        }}/>
                        <DayShowComponent tag={{
                            tagesnummer: 3,
                            wochentag: 'Mittwoch',
                            tagesbezeichnung: 'Arms'
                        }}/>
                        <DayShowComponent tag={{
                            tagesnummer: 4,
                            wochentag: 'Donnerstag',
                            tagesbezeichnung: 'Legs'
                        }}/>
                        <DayShowComponent tag={{
                            tagesnummer: 5,
                            wochentag: 'Freitag',
                            tagesbezeichnung: 'Rest'
                        }}/>
                        <DayShowComponent tag={{
                            tagesnummer: 6,
                            wochentag: 'Samstag',
                            tagesbezeichnung: 'Push'
                        }}/>
                        <DayShowComponent tag={{
                            tagesnummer: 7,
                            wochentag: 'Sonntag',
                            tagesbezeichnung: 'Pull'
                        }}/>


                    </div>
                </div>
                {/* Anzeige der unteren Hälfte des Bildschirms */}
                <form id="trainingsplanform">
                    <div>
                        <div>
                            <h1 className="ueberschrift">Neue Trainingsplan erstellen</h1>

                        </div>
                        <div className="trainingsplanname">
                            <label htmlFor="trainingsplanname">Trainingsplan Name:</label>
                            <input id="trainingsplanname" type="text" defaultValue={getTrainingsplanNameText()}
                                   onInput={(e) => saveTrainingsplanName(e.target.value)} required></input>
                        </div>
                        <ul id="createList">
                            <label htmlFor="Tagesbezeichnung" className="tagesbezeichnung">Tagesbezeichnung</label>
                            {/* day1 *********************************************** */}
                            <DayCreateComponent number={1} id='1'/>
                            {/* day2 *********************************************** */}
                            <DayCreateComponent number={2} id='2'/>
                            {/* day3 *********************************************** */}
                            <DayCreateComponent number={3} id='3'/>
                            { /* day4 *********************************************** */}
                            <DayCreateComponent number={4} id='4'/>
                            {/* day5 *********************************************** */}
                            <label htmlFor="Exercise" id="Exercise">Choose your Exercises</label>
                            <DayCreateComponent number={5} id='5'/>
                            {/* day6 *********************************************** */}
                            <DayCreateComponent number={6} id='6'/>
                            {/* day7 *********************************************** */}
                            <DayCreateComponent number={7} id='7'/>
                            <li>
                                <Button variant="contained" color="success" id="submitButton"
                                        onClick={submitAction}>
                                    Submit
                                </Button>
                            </li>
                        </ul>


                        <div>

                            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>

                                <Alert severity="error" onClose={handleClose} sx={{width: '100%'}}>
                                    {alertinhalt}
                                </Alert>


                            </Snackbar>

                        </div>


                    </div>
                </form>

            </div>

        </>

    )
}


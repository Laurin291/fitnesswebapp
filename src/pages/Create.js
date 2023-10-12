import {useState} from 'react'
import data from "../data.js";
import {ReactComponent as PlusIcon} from '../icons/plus-circle-fill.svg';
import {Link} from "react-router-dom";
import supabase from "../config/supabaseClient.js";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';


export default function Create() {
    const [numChildren, setNumChildren] = useState(0)
    const [value, setValue] = useState("Beine");
    const [Trainingsplanname, setTrainingsplanname] = useState('')
    const [Tgsbz1, setTgsbz1] = useState('')
    const [Tgsbz2, setTgsbz2] = useState('')
    const [Tgsbz3, setTgsbz3] = useState('')
    const [Tgsbz4, setTgsbz4] = useState('')
    const [Tgsbz5, setTgsbz5] = useState('')
    const [Tgsbz6, setTgsbz6] = useState('')
    const [Tgsbz7, setTgsbz7] = useState('')
    const [formError, setFormError] = useState(null)


    let items = []


    // Funktion um die ausgewaehlten Uebungen von Uebungselect.js in ihre Kurzform umzuwandeln und anzuzeigen
    function getText(nummer) {
        let text = null
        text = window.localStorage.getItem(nummer)
        console.log(text)

        if (text != null && text.length > 2) {
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
                    let otto = kurzNamenobjectarray[i][0].Kurzname

                    kurzNameString.push(otto)
                }

            }
            let ausgabeVor = JSON.stringify(kurzNameString).replace("[", "").replace("]", "").replace('"', '')
            let ausgabe = ausgabeVor.replace('"', '')
            return ausgabe

        } else {
            return ""
        }

    }

    //Funktion um den LocalStorage zu löschen *********************************
    function clearLocalStorage() {
        window.localStorage.clear()
    }

    //Component der Trainingsplanerstellung um öfter das gleiche Object am Bildschirm anzuzeigen
    const DayCreateComponent = (number) => {
        return (
            <li>
                <input type="text" className="tagesbezeichnung" value={Tgsbz1}
                       onChange={(e) => setTgsbz1(e.target.value)}></input>
                <input type="text" className="uebungauswählen" disabled value={getText(number.number)}></input>
                <Link to={'/uebungselect/' + number.number}><PlusIcon class="plusicon"/></Link>
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
                            <h1 className="ueberschrift">Create new Trainingsplan</h1>

                        </div>
                        <div className="trainingsplanname">
                            <label htmlFor="trainingsplanname">Traingsplan Name:</label>
                            <input type="text" value={Trainingsplanname}
                                   onChange={(e) => setTrainingsplanname(e.target.value)}></input>
                        </div>
                        <ul id="createList">
                            <label htmlFor="Tagesbezeichnung" className="tagesbezeichnung">Tagbezeichnung</label>
                            {/* day1 *********************************************** */}
                            <DayCreateComponent number={1}/>
                            {/* day2 *********************************************** */}
                            <DayCreateComponent number={2}/>
                            {/* day3 *********************************************** */}
                            <DayCreateComponent number={3}/>
                            { /* day4 *********************************************** */}
                            <DayCreateComponent number={4}/>
                            {/* day5 *********************************************** */}
                            <label htmlFor="Exercise" id="Exercise">Choose your Exercises</label>
                            <DayCreateComponent number={5}/>
                            {/* day6 *********************************************** */}
                            <DayCreateComponent number={6}/>
                            {/* day7 *********************************************** */}
                            <DayCreateComponent number={7}/>
                        </ul>
                        <Button variant="contained" color="success" id="submitButton">
                            Submit
                        </Button>

                        {formError && <p className="error">{formError}</p>}
                    </div>
                </form>

            </div>

        </>

    )
}


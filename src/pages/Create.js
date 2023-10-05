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

// eslint-disable-next-line react-hooks/rules-of-hooks

export default function DropdownCheckbox() {
    const data2 = data.get('uebungen')
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

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!Tgsbz1 || !Tgsbz2 || !Tgsbz3 || !Tgsbz4 || !Tgsbz5 || !Tgsbz6 || !Tgsbz7 || !Trainingsplanname) {
            setFormError('Bitte alles Einfüllem')
            return
        }
        const {data, error} = await supabase
            .from('trainingstag')
            .upsert([{Tagesbezeichung: Tgsbz1}])
            .select()

        if (error) {
            console.log(error)
            setFormError('Bitte alles Einfüllem')
        }
        if (data) {
            console.log(data)
            setFormError(null)
        }
    }


    const ChildComponent = (otto) => {
        const data3 = data.getbyID(otto.number, value)
        return (<div> {data3 && data3.length > 0 && data3.map((userObj, index) => (
            <p>{userObj.Name}</p>
        ))}
        </div>)
    }

    for (let i = 0; i <= numChildren; i++) {
        items.push(<ChildComponent key={i} number={i}/>)
    }


    function getText(nummer) {
        let text = null
        text = window.localStorage.getItem(nummer)
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

    function clearLocalStorage() {
        window.localStorage.clear()
    }

    const [checked, setChecked] = useState(false)


    return (
        <>
            <div id="content">
                <div id="trainingsplananzeige">
                    <div className="trtagdivs">
                        <p className="trtagcontent">Tag1</p>
                        <p className="trtagcontent">Montag</p>
                        <p className="trtagcontent">Push</p>
                    </div>
                    <div className="trtagdivs">
                        <p className="trtagcontent">Tag1</p>
                        <p className="trtagcontent">Montag</p>
                        <p className="trtagcontent">Push</p>
                    </div>
                    <div className="trtagdivs">
                        <p className="trtagcontent">Tag1</p>
                        <p className="trtagcontent">Montag</p>
                        <p className="trtagcontent">Push</p>
                    </div>
                    <div className="trtagdivs">
                        <p className="trtagcontent">Tag1</p>
                        <p className="trtagcontent">Montag</p>
                        <p className="trtagcontent">Push</p>
                    </div>
                    <div className="trtagdivs">
                        <p className="trtagcontent">Tag1</p>
                        <p className="trtagcontent">Montag</p>
                        <p className="trtagcontent">Push</p>
                    </div>
                    <div className="trtagdivs">
                        <p className="trtagcontent">Tag1</p>
                        <p className="trtagcontent">Montag</p>
                        <p className="trtagcontent">Push</p>
                    </div>
                    <div className="trtagdivs">
                        <p className="trtagcontent">Tag1</p>
                        <p className="trtagcontent">Montag</p>
                        <p className="trtagcontent">Push</p>
                    </div>


                </div>
                <form onSubmit={handleSubmit} id="trainingsplanform">
                    <div>
                        <div>
                            <h1>Create new Trainingsplan</h1>
                            <label htmlFor="Trainingsplanname">Traingsplan Name:</label>
                            <input type="text" id="Trainingsplanname" value={Trainingsplanname}
                                   onChange={(e) => setTrainingsplanname(e.target.value)}></input>
                        </div>
                        <label htmlFor="Tagesbezeichnung" id="Tagesbezeichnung">Tagbezeichnung</label>
                        <label htmlFor="Exercise" id="Exercise">Choose your Exercises</label>
                        <li><input type="text" id="Tagesbezeichnung" value={Tgsbz1}
                                   onChange={(e) => setTgsbz1(e.target.value)}>
                        </input><input type="text" id="otto" disabled value={getText("1")}></input><Link
                            to={'/uebungselect/' + "1"}><PlusIcon onClick={clearLocalStorage}/></Link>
                        </li>

                        <li><input type="text" id="Tagesbezeichnung" value={Tgsbz2}
                                   onChange={(e) => setTgsbz2(e.target.value)}>
                        </input><input type="text" disabled value={getText("2")}></input><Link
                            to={'/uebungselect/' + "2"}><PlusIcon/></Link>
                        </li>

                        <li><input type="text" id="Tagesbezeichnung" value={Tgsbz3}
                                   onChange={(e) => setTgsbz3(e.target.value)}>
                        </input><input type="text" disabled value={getText("3")}></input><Link
                            to={'/uebungselect/' + "3"}><PlusIcon/></Link>
                        </li>

                        <li><input type="text" id="Tagesbezeichnung" value={Tgsbz4}
                                   onChange={(e) => setTgsbz4(e.target.value)}>
                        </input><input type="text" disabled value={getText("4")}></input><Link
                            to={'/uebungselect/' + "4"}><PlusIcon/></Link>
                        </li>

                        <li><input type="text" id="Tagesbezeichnung" value={Tgsbz5}
                                   onChange={(e) => setTgsbz5(e.target.value)}>
                        </input><input type="text" disabled value={getText("5")}></input><Link
                            to={'/uebungselect/' + "5"}><PlusIcon/></Link>
                        </li>

                        <li><input type="text" id="Tagesbezeichnung" value={Tgsbz6}
                                   onChange={(e) => setTgsbz6(e.target.value)}>
                        </input><input type="text" disabled value={getText("6")}></input><Link
                            to={'/uebungselect/' + "6"}><PlusIcon/></Link>
                        </li>

                        <li><input type="text" id="Tagesbezeichnung" value={Tgsbz7}
                                   onChange={(e) => setTgsbz7(e.target.value)}>
                        </input><input type="text" disabled value={getText("7")}></input><Link
                            to={'/uebungselect/' + "7"}><PlusIcon/></Link>
                        </li>

                        <button>Submit</button>

                        {formError && <p className="error">{formError}</p>}
                    </div>
                </form>

            </div>

        </>

    )
}


//for (let i = 0; i < data2.length; i++) {
//     item.push(<Typography.Text  children={}/>)
// }

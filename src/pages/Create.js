import data from "../data.js";
import {Link, useParams} from "react-router-dom";
import Button from '@mui/material/Button';
import supabase from "../config/supabaseClient";
import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import {useNavigate} from "react-router-dom";
import {validTrainingsplanname, validTagesbezeichnung} from '../Regex.js';
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import {
    AppBar,
    Dialog,
    List,
    ListItem,
    ListItemText,
    Slide,
    tableCellClasses,
    Toolbar, Tooltip,
    useMediaQuery,
    Zoom
} from "@mui/material";
import ChairIcon from '@mui/icons-material/Chair';
import ChairOutlinedIcon from '@mui/icons-material/ChairOutlined';
import {useState} from "react";
import Typography from "@mui/material/Typography";
import {Divider} from "@supabase/ui";
import CloseIcon from '@mui/icons-material/Close';
import {styled, useTheme} from "@mui/material/styles";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import InfoTwoToneIcon from "@mui/icons-material/InfoTwoTone";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


export default function Create() {
    const navigate = useNavigate();
    const [alertinhalt, setAlertInhalt] = useState("")
    const [error, setError] = useState(true)
    const [tagesbezeichnung1, setTagesbezeichnung1] = useState("--")
    const [tagesbezeichnung2, setTagesbezeichnung2] = useState("--")
    const [tagesbezeichnung3, setTagesbezeichnung3] = useState("--")
    const [tagesbezeichnung4, setTagesbezeichnung4] = useState("--")
    const [tagesbezeichnung5, setTagesbezeichnung5] = useState("--")
    const [tagesbezeichnung6, setTagesbezeichnung6] = useState("--")
    const [tagesbezeichnung7, setTagesbezeichnung7] = useState("--")
    const [selectedTrainingstag, setSelectedTrainingstag] = useState('')
    const [selectedTrainingsplan, setSelectedTrainingsplan] = useState('Kein Trainingsplan')


    window.onbeforeunload = function () {
        clearLocalStorage()

        return 'Are you sure you want to leave?';
    };

    const StyledTableRow = styled(TableRow)(({theme}) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    const StyledTableCell = styled(TableCell)(({theme}) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: '#06367A',
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    let user=JSON.parse(localStorage.getItem("user"))

    // Funktion um die ausgewaehlten Uebungen von Uebungselect.js in ihre Kurzform umzuwandeln und anzuzeigen
    function getUebungText(nummer) {
        let text = null
        text = window.localStorage.getItem(nummer)


        if (text != null && text.length > 2 && text !== "REST") {
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

        } else if (text === "REST") {
            return "REST"
        } else {
            return ''
        }

    }

    // Funktion um zu checken ob der jeweilige Tag ein REST-DAY ist ***********
    function checkRESTDAY(nummer) {
        let text = window.localStorage.getItem(nummer)

        if (text === 'REST') {
            return true
        } else {
            return false
        }

    }


    // Funktion um den bereits eingegeben Namen der Trainingstage aus dem Localstorage zu bekommen
    function getNameText(nummer) {
        return window.localStorage.getItem("Name" + nummer.number)

    }

    // Funktion um den bereits eingegeben Namen des Trainingsplans aus dem Localstorage zu bekommen ********************
    function getTrainingsplanNameText() {
        return window.localStorage.getItem("TrainingsplanName")
    }

    //Funktion um die Eingabe des Users (Trainingstagsbezeichnung) zu speichern
    function saveName(name, nummer) {
        if (!validTagesbezeichnung.test(name)) {
            document.getElementById(nummer.number).style.backgroundColor = 'lightsalmon'

        } else {
            document.getElementById(nummer.number).style.backgroundColor = "lightgreen";
            window.localStorage.setItem("Name" + nummer.number, name)
        }
    }
    //Funktion um die Eingabe des Users (Trainingsplan) zu speichern ***************************************************
    function saveTrainingsplanName(name) {
        if (!validTrainingsplanname.test(name)) {
            document.getElementById("trainingsplanname").style.backgroundColor = 'lightsalmon'

        } else {
            document.getElementById("trainingsplanname").style.backgroundColor = "lightgreen";
            window.localStorage.setItem("TrainingsplanName", name)
        }
    }

    //Funktion um den LocalStorage zu löschen **************************************************************************
    function clearLocalStorage() {
        window.localStorage.removeItem("Name1")
        window.localStorage.removeItem("Name2")
        window.localStorage.removeItem("Name3")
        window.localStorage.removeItem("Name4")
        window.localStorage.removeItem("Name5")
        window.localStorage.removeItem("Name6")
        window.localStorage.removeItem("Name7")
        window.localStorage.removeItem("1")
        window.localStorage.removeItem("2")
        window.localStorage.removeItem("3")
        window.localStorage.removeItem("4")
        window.localStorage.removeItem("5")
        window.localStorage.removeItem("6")
        window.localStorage.removeItem("7")
        window.localStorage.removeItem("TrainingsplanName")
    }

    //Component der Trainingsplanerstellung um öfter das gleiche Object am Bildschirm anzuzeigen
    const DayCreateComponent = (number) => {

        const woche = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag']

        const handleChange = (event) => {
            if (document.getElementById(number.number).disabled === false) {
                document.getElementById(number.number).disabled = true
                document.getElementById(number.number).value = "REST"
                document.getElementById(number.number).style.backgroundColor = 'white'
                window.localStorage.setItem("Name" + number.number, "REST")
                window.localStorage.setItem(number.number, "REST")
                document.getElementById('uebungauswählen' + number.number).value = "REST"
                document.getElementById('uebungauswählen' + number.number).disabled = true
                document.getElementById('restIcon' + number.number).checked = true
            } else {
                document.getElementById(number.number).disabled = false
                document.getElementById(number.number).value = ""
                window.localStorage.setItem("Name" + number.number, "")
                window.localStorage.setItem(number.number, "")
                document.getElementById('uebungauswählen' + number.number).value = ""
                document.getElementById('uebungauswählen' + number.number).disabled = false
                document.getElementById('restIcon' + number.number).checked = false
            }


        };

        return (
            <li>
                <Tooltip TransitionComponent={Zoom} disableInteractive arrow placement="top"
                         title={
                             <>
                                 <Typography color="inherit">Erlaubte Zeichen:</Typography>
                                 <Typography color="inherit">*A-Z und a-z</Typography>
                                 <Typography color="inherit">*Zahlen</Typography>
                                 <Typography color="inherit">*Umlaute</Typography>
                                 <Typography color="inherit">*Sonderzeichen: /, _</Typography>
                             </>
                         }
                >
                    <input type="text" id={number.number} className="tagesbezeichnung" defaultValue={getNameText(number)}
                           placeholder={woche[number.number - 1]}
                           onChange={(e) => saveName(e.target.value, number)}
                           disabled={checkRESTDAY(number.number)}></input>
                </Tooltip>



                <Link to={'/uebungselect/' + number.number}>
                    <input type="text" className="uebungauswählen" id={'uebungauswählen' + number.number} readOnly
                           value={getUebungText(number.number)} disabled={checkRESTDAY(number.number)}></input>
                </Link>
                <Tooltip TransitionComponent={Zoom} disableInteractive arrow placement="top"
                         title={
                             <>
                                 <Typography color="inherit">Tag als "REST" Tag kennzeichnen</Typography>
                             </>
                         }
                >
                <Checkbox id={'restIcon' + number.number} icon={<ChairOutlinedIcon/>} checkedIcon={<ChairIcon/>}
                          onChange={handleChange} defaultChecked={checkRESTDAY(number.number)}/>
                </Tooltip>
            </li>
        )
    }

    //Component der Trainingsplananzeige um öfter das gleiche Object am Bildschirm anzuzeigen
    const DayShowComponent = ({tag}) => {
        const trainingspläne = data.get("trainingsplan")
        const trainingstagtabelle = data.getTrainingstageSorted("trainingstag")
        let trainingstage = []
        if (trainingspläne != null && trainingstagtabelle != null) {
            const selected = trainingspläne.filter((trainingsplan) => trainingsplan.selected == true)
            if (selected.length > 0) {
                trainingstage = trainingstagtabelle.filter(tag => tag.trainingsplanID == selected[0].trainingsplanID)
                setSelectedTrainingsplan(selected[0].name)
                setTagesbezeichnung1(trainingstage[0].Tagesbezeichung)
                setTagesbezeichnung2(trainingstage[1].Tagesbezeichung)
                setTagesbezeichnung3(trainingstage[2].Tagesbezeichung)
                setTagesbezeichnung4(trainingstage[3].Tagesbezeichung)
                setTagesbezeichnung5(trainingstage[4].Tagesbezeichung)
                setTagesbezeichnung6(trainingstage[5].Tagesbezeichung)
                setTagesbezeichnung7(trainingstage[6].Tagesbezeichung)
            }
        }
        let trainingstag = ''
        if (trainingstage.length > 0) {
            trainingstag = trainingstage[tag.tagesnummer - 1]
        }
        let fontsize = 20;
        if (tag.tagesbezeichnung.length > 10){
            fontsize = 17
        }else if (tag.tagesbezeichnung.length > 12){
            fontsize = 14
        }
        return (
            <div className="trtagdivs" onClick={() => handleClickOpenDialog(trainingstag)}>
                <p className="trtagcontent" id='wochentagAnzeige'>{tag.wochentag}</p>
                <p className="trtagcontent" id='tagesbezeichnungAnzeige' style={{ fontSize: fontsize }} >{tag.tagesbezeichnung}</p>
            </div>
        )
    }


    // Funktion um den ganzen Trainingsplan zu speichern **********************
    async function submitAction() {
        setOpenAlert(false)
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

                    if (data[0] == undefined) {
                        uebungen[i][j] = 0
                    } else {
                        uebungen[i][j] = data[0].uebungID
                    }


                }

                let a = i + 1
                let b = "Name" + a
                let newItems = [window.localStorage.getItem(b), uebungen[i]];
                tagesbezeichnungUebungen.push(newItems);

            }


            uebungen = data.postTrainingsplan(tagesbezeichnungUebungen, window.localStorage.getItem("TrainingsplanName"), user.id)

            uebungen.then(value => {
                setError(value)


                if (!value) {
                    navigate("/Trainingsplanverwaltung/")
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

    const [openAlert, setOpenAlert] = React.useState(false);
    const [openDialog, setOpenDialog] = React.useState(false);


    const handleClick = (nachricht) => {
        setOpenAlert(true);
        setAlertInhalt(nachricht)
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenAlert(false);
    };


    const handleClickOpenDialog = (trainingstag) => {
        if (trainingstag !== '') {
            setOpenDialog(true);
            setSelectedTrainingstag(trainingstag)
        }


    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    function createData(name) {
        return {name};
    }

    function rows() {
        const zeile = []
        zeile.push(createData(selectedTrainingstag))

        return zeile
    }


    function Row(props) {
        const {number} = useParams()
        const {row} = props;
        const [open, setOpen] = React.useState(false);
        const labelId = `enhanced-table-checkbox-1`;
        const uebungen = []


        for (let i = 0; i < selectedTrainingstag.uebungIDs.length; i++) {
            uebungen.push(data.getUebungen(selectedTrainingstag.uebungIDs[i]))
        }


        if (uebungen[0] != null) {
            uebungen.map(uebung => console.log(uebung));
        }


        return (
            <React.Fragment>
                {uebungen.map((uebung) => (
                    <>
                        <TableRow>


                            {uebung != null &&
                                <>
                                    {uebung.length > 0 &&
                                        <>
                                            <TableCell></TableCell>
                                            <TableCell>{uebung[0].Name}</TableCell>
                                            <TableCell>{uebung[0].Kategorie}</TableCell>
                                            <TableCell>{uebung[0].Beschreibung}</TableCell>
                                            <TableCell></TableCell>

                                        </>
                                    }
                                    {uebung.length == 0 &&
                                        <>
                                            <TableCell></TableCell>
                                            <TableCell>REST</TableCell>
                                            <TableCell>REST</TableCell>
                                            <TableCell>REST</TableCell>
                                            <TableCell>REST</TableCell>

                                        </>
                                    }
                                </>
                            }


                        </TableRow>
                    </>
                ))}
            </React.Fragment>
        )
    }


    return (
        <>
            <Zoom in={true}>
                <div id="content">
                    {/* Anzeige der oberen Hälfte des Bildschirms */}
                    <div id="trainingsplananzeige">
                        <div id="ueberschriftverwaltungsdiv">
                            <h1 className="ueberschrift">{selectedTrainingsplan} ausgewählt</h1>

                            <Link to={"/trainingsplanverwaltung"} id="verwaltungsButton"><IconButton>
                                <EditNoteOutlinedIcon sx={{ height: '40px', width: '40px' }}></EditNoteOutlinedIcon>
                            </IconButton>
                            </Link>
                        </div>



                        <div id="divs">
                            <DayShowComponent tag={{
                                tagesnummer: 1,
                                wochentag: 'Montag',
                                tagesbezeichnung: tagesbezeichnung1
                            }}/>
                            <DayShowComponent tag={{
                                tagesnummer: 2,
                                wochentag: 'Dienstag',
                                tagesbezeichnung: tagesbezeichnung2
                            }}/>
                            <DayShowComponent tag={{
                                tagesnummer: 3,
                                wochentag: 'Mittwoch',
                                tagesbezeichnung: tagesbezeichnung3
                            }}/>
                            <DayShowComponent tag={{
                                tagesnummer: 4,
                                wochentag: 'Donnerstag',
                                tagesbezeichnung: tagesbezeichnung4
                            }}/>
                            <DayShowComponent tag={{
                                tagesnummer: 5,
                                wochentag: 'Freitag',
                                tagesbezeichnung: tagesbezeichnung5
                            }}/>
                            <DayShowComponent tag={{
                                tagesnummer: 6,
                                wochentag: 'Samstag',
                                tagesbezeichnung: tagesbezeichnung6
                            }}/>
                            <DayShowComponent tag={{
                                tagesnummer: 7,
                                wochentag: 'Sonntag',
                                tagesbezeichnung: tagesbezeichnung7
                            }}/>


                        </div>
                    </div>
                    {/* Anzeige der unteren Hälfte des Bildschirms */}
                    <form id="trainingsplanform">
                        <div>
                            <div>
                                <h1 className="ueberschrift">Neuen Trainingsplan erstellen</h1>
                            </div>

                            <div className="trainingsplanname">
                                <label htmlFor="trainingsplanname">Trainingsplan Name:</label>
                                <Tooltip TransitionComponent={Zoom} disableInteractive arrow placement="top"
                                         title={
                                             <>
                                                 <Typography color="inherit">Erlaubte Zeichen:</Typography>
                                                 <Typography color="inherit">*A-Z und a-z</Typography>
                                                 <Typography color="inherit">*Zahlen</Typography>
                                                 <Typography color="inherit">*Umlaute</Typography>
                                                 <Typography color="inherit">*Sonderzeichen: /, _</Typography>
                                             </>
                                         }
                                >
                                <input id="trainingsplanname" type="text" defaultValue={getTrainingsplanNameText()}
                                       onInput={(e) => saveTrainingsplanName(e.target.value)} required></input>
                                </Tooltip>
                            </div>

                            <ul id="createList">
                                <label htmlFor="Tagesbezeichnung" className="tagesbezeichnung">Tagesbezeichnung</label>
                                <label htmlFor="Exercise" id="Exercise">Übungen</label>
                                {/* day1 *********************************************** */}
                                <DayCreateComponent number={1} id='1'/>
                                {/* day2 *********************************************** */}
                                <DayCreateComponent number={2} id='2'/>
                                {/* day3 *********************************************** */}
                                <DayCreateComponent number={3} id='3'/>
                                { /* day4 *********************************************** */}
                                <DayCreateComponent number={4} id='4'/>
                                {/* day5 *********************************************** */}
                                <label htmlFor="Tagesbezeichnung" className="tagesbezeichnung">Tagesbezeichnung</label>
                                <label htmlFor="Exercise" id="Exercise">Übungen</label>
                                <DayCreateComponent number={5} id='5'/>
                                {/* day6 *********************************************** */}
                                <DayCreateComponent number={6} id='6'/>
                                {/* day7 *********************************************** */}
                                <DayCreateComponent number={7} id='7'/>



                            </ul>
                            <Button variant="contained" color="success" id="submitButton"
                                    onClick={submitAction}>
                                Speichern
                            </Button>


                            <div>

                                <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseSnackbar}>

                                    <Alert severity="error" onClose={handleCloseSnackbar} sx={{width: '100%'}}>
                                        {alertinhalt}
                                    </Alert>


                                </Snackbar>

                            </div>


                        </div>
                    </form>

                </div>
            </Zoom>

            <Dialog
                fullScreen
                open={openDialog}
                onClose={handleCloseDialog}
                TransitionComponent={Transition}
            >

                <AppBar sx={{position: 'relative', background: '#06367A'}} >
                    <Toolbar id={'toolbar'}>
                        <Typography sx={{ml: 2, flex: 1}} variant="h6" component="div">
                            {selectedTrainingstag.Tagesbezeichung}
                        </Typography>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleCloseDialog}
                            aria-label="close"
                        >
                            <CloseIcon/>
                        </IconButton>


                    </Toolbar>
                </AppBar>

                <TableContainer component={Paper} id="tableContaineruebungen">
                    <Table sx={{minWidth: 650}} aria-label="simple table" stickyHeader >
                        <TableHead>
                            <StyledTableRow>
                                <StyledTableCell></StyledTableCell>
                                <StyledTableCell>Name</StyledTableCell>
                                <StyledTableCell>Kategorie</StyledTableCell>
                                <StyledTableCell>Beschreibung</StyledTableCell>
                                <StyledTableCell>Bild</StyledTableCell>

                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            {rows().map((row) => (
                                <Row key={row.name} row={row}/>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            </Dialog>
        </>


    )
}


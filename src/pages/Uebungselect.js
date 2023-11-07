import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Checkbox from '@mui/material/Checkbox';
import data from "../data.js";
import {useParams} from "react-router-dom";
import {Link} from "react-router-dom";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from '@mui/material/Alert';
import {useState} from "react";


let selectedItems = []


// Funktion um einen Datensatz in der Tabelle zu erstellen
function createData(name, kategorie, beschreibung) {
    return {
        name,
        kategorie,
        erklaerung: [
            {
                beschreibung: beschreibung,
                bild: "../icons/Brustpresse.gif"
            }
        ],
    };
}

// Funktion mit der die Reihen der Tabelle mit Daten gefühlt und zusammengesetzt werden, um sie anschließend
function Row(props) {
    const {number} = useParams()
    const {row} = props;
    const [open, setOpen] = React.useState(false);
    const labelId = `enhanced-table-checkbox-1`;




    const [checked, setChecked] = React.useState(() => {

        let check = false
        if (window.localStorage.getItem(number) != null) {
            const text = window.localStorage.getItem(number).split(',')

            for (let i = 0; i < text.length; i++) {
                if (text[i] == row.name) {
                    check = true
                    break;
                } else {
                    check = false
                }
            }
            if (selectedItems.length < 1) {
                let itemsfromlocalstorage = window.localStorage.getItem(number).split(',')
                for (let i = 0; i < itemsfromlocalstorage.length; i++) {
                    selectedItems.push(itemsfromlocalstorage[i])
                }

            }

        }
        return check
    });


    // Funktion um zu erkennen welche Checkboxen ausgewählt sind und um die Uebungen von diesen zu speichern
    const selectCheckbox = (e) => {
        setChecked(e.target.checked)

        const parent = e.target.parentNode.parentNode.parentNode
        if (selectedItems[0] == ''){
            selectedItems = []
        }

        if (e.target.checked && !selectedItems.includes(e.currentTarget.id)) {
            selectedItems.push(e.currentTarget.id)
            parent.style.backgroundColor = 'rgba(20, 110, 255, .1)'
        } else if (selectedItems.includes(e.currentTarget.id)) {
            parent.style.backgroundColor = ''
            const newSelectedItems = selectedItems.filter(function (item) {
                return item !== e.currentTarget.id;
            });
            selectedItems = newSelectedItems
        }
    }


    return (
        <React.Fragment>
            <TableRow sx={{'& > *': {borderBottom: 'unset'}}}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    <Checkbox
                        id={row.name}
                        color="primary"
                        checked={checked}
                        onChange={selectCheckbox}
                        inputProps={{
                            'aria-labelledby': labelId,
                        }}
                    />
                    {row.name}
                </TableCell>
                <TableCell align="left">
                    {row.kategorie}
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{margin: 1}}>
                            <Typography variant="h6" gutterBottom component="div">
                                Beschreibung
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Beschreibung</TableCell>
                                        <TableCell align="right">Bild</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.erklaerung.map((erklaerungsrow) => (
                                        <TableRow key={erklaerungsrow.date}>
                                            <TableCell component="th" scope="row">
                                                {erklaerungsrow.beschreibung}
                                            </TableCell>
                                            <TableCell align="right">

                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>


    );
}

//Funktion um mit den Daten aus der Datenbank die Datensätze für die Tabelle zu erstellen
function rows() {
    const uebungen = data.get('uebungen')
    let numzeilen = 0;
    const zeile = []


    if (uebungen != null) {
        numzeilen = uebungen.length
        for (let i = 0; i < uebungen.length; i++) {
            zeile.push(createData(uebungen[i].Name, uebungen[i].Kategorie, uebungen[i].Beschreibung))
        }
    }
    return zeile
}


// Funktion in welcher die finale Tabelle zusammengesetzt wird
export default function Uebungstabelle() {
    const [open, setOpen] = React.useState(false);
    const [alertinhalt, setAlertInhalt] = useState("")
    const [severity, setSeverity] = useState("")
    const {number} = useParams()

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    //Funktion um zu erkennen, wann der SaveButton gedrückt wird und um die ausgewählten Uebungen im localStorage zu speichern
    function saveAction() {


        window.localStorage.removeItem(number)
        if (window.localStorage.getItem(number) == null) {
            window.localStorage.setItem(number, selectedItems)
        } else {
            window.localStorage.setItem(number, selectedItems + ',' + window.localStorage.getItem(number))
        }



       if (localStorage.getItem(number) === ''){
           handleClick("Bitte etwas auswählen")
           setSeverity('error')
       }else {
           handleClick("Saved successfully")
           setSeverity('success')
       }


    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
        const handleClick = (nachricht) => {
            setOpen(true);
            setAlertInhalt(nachricht)
        };

    //Funktion um den Zwischenspeicher zu leeren wenn man die Seite verlässt
    function submitAction() {
        selectedItems = []
    }

    return (
        <div id="content">
            <TableContainer component={Paper} id="tableContainer">
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell/>
                            <TableCell>Name</TableCell>
                            <TableCell>Kategorie</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows().map((row) => (
                            <Row key={row.name} row={row}/>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button variant="contained" color="success" id="saveButton" onClick={saveAction}>
                Save
            </Button>
            <Link to="/create"> <Button variant="contained" color="success" id="submitButton"
                                        onClick={submitAction}>
                Submit
            </Button></Link>


            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>

                <Alert severity={severity} onClose={handleClose} sx={{width: '100%'}}>
                    {alertinhalt}
                </Alert>


            </Snackbar>

        </div>
    );
}

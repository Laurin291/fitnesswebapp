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


// Funktion um einen Datensatz in der Tabelle zu erstellen
function createData(id, name, trainingstage, uebungname) {
    return {
        id,
        name,
        trainingstage,
        uebungname


    };
}

// Funktion mit der die Reihen der Tabelle mit Daten gefühlt und zusammengesetzt werden, um sie anschließend
function Row(props) {
    const {number} = useParams()
    const {row} = props;
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const labelId = `enhanced-table-checkbox-1`;


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
                    {row.id}
                </TableCell>
                <TableCell align="left">
                    {row.name}
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{margin: 1}}>
                            <Typography variant="h6" gutterBottom component="div">
                                Trainingstage
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableBody>

                                    {row.trainingstage.map((trainingstag) => (
                                        <>
                                        <TableRow sx={{'& > *': {borderBottom: 'unset'}}}>
                                            <TableCell component="th" scope="row">
                                                {trainingstag.Tagesbezeichung}
                                            </TableCell>
                                            <TableCell align={"right"}>
                                                <IconButton
                                                    aria-label="expand row"
                                                    size="small"
                                                    onClick={() => setOpen2(!open2)}
                                                >
                                                    {open2 ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                                                <Collapse in={open2} timeout="auto" unmountOnExit>
                                                    <Box sx={{margin: 1}}>
                                                        <Typography variant="h7" gutterBottom component="div">
                                                            Übungen
                                                        </Typography>
                                                        <Table size="small" aria-label="purchases">
                                                            <TableBody>

                                                                {row.uebungname.map((uebungen) => {
                                                                uebungen.map((uebung)=> uebung[0].Name)
                                                            })}
                                                            </TableBody>
                                                        </Table>
                                                    </Box>
                                                </Collapse>
                                            </TableCell>
                                        </TableRow>
                                        </>
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
    const trainingsplan = data.get('trainingsplan')
    const trainingstage = data.get('trainingstag')




    let numzeilen = 0;
    const zeile = []


    if (trainingsplan != null && trainingstage != null && uebungen != null) {

        for (let i = 0; i < trainingsplan.length; i++) {
            const trainingstagBezeichnung = trainingstage.filter((tag) => tag.trainingsplanID == trainingsplan[i].trainingsplanID)
            let uebungenname =[]

            for (let k = 0; k<7;k++){
                let hilfe =[]
                for (let j = 0; j < trainingstagBezeichnung[k].uebungIDs.length; j++){


                    hilfe.push(uebungen.filter((uebung)  => uebung.uebungID == trainingstagBezeichnung[k].uebungIDs[j] ))

                }
                uebungenname.push(hilfe)
            }






            zeile.push(createData(trainingsplan[i].trainingsplanID, trainingsplan[i].name, trainingstagBezeichnung, uebungenname))
        }

    }
    return zeile
}


// Funktion in welcher die finale Tabelle zusammengesetzt wird
export default function Trainingsplanverwaltung() {
    const [open, setOpen] = React.useState(false);
    const [alertinhalt, setAlertInhalt] = useState("")
    const [severity, setSeverity] = useState("")
    const {number} = useParams()


    return (
        <div id="content">
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell/>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows().map((row) => (
                            <Row key={row.name} row={row}/>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>


        </div>
    );
}

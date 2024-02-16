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
import {useNavigate, useParams} from "react-router-dom";
import {Link} from "react-router-dom";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from '@mui/material/Alert';
import {useState} from "react";
import {styled} from "@mui/material/styles";
import {Skeleton, tableCellClasses, Zoom} from "@mui/material";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

export default function Uebungstabelle() {
    let selectedItems = []
    const [open, setOpen] = React.useState(false);
    const [alertinhalt, setAlertInhalt] = useState("")
    const [severity, setSeverity] = useState("")
    const {number} = useParams()
    const [isloaded, setIsLoaded] = useState(false)
    const uebungen = data.getAllUebungenSorted('uebungen')
    const navigate = useNavigate();


    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    const StyledTableCell = styled(TableCell)(({theme}) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: '#06367A',
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({theme}) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));


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
            if (selectedItems[0] == '') {
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
                <StyledTableRow sx={{'& > *': {borderBottom: 'unset'}}}>
                    <StyledTableCell width={'20%'}>
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => setOpen(!open)}
                        >
                            {open ? <KeyboardArrowDownIcon/> : <KeyboardArrowRightIcon/>}
                        </IconButton>
                    </StyledTableCell>
                    <StyledTableCell width={'48%'}>
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
                    </StyledTableCell>
                    <StyledTableCell align="left">
                        {row.kategorie}
                    </StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                    <StyledTableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box sx={{margin: 1}}>
                                <Typography variant="h6" gutterBottom component="div">
                                    Beschreibung
                                </Typography>
                                <Table size="small" aria-label="purchases">
                                    <TableHead>
                                        <StyledTableRow>
                                            <StyledTableCell>Beschreibung</StyledTableCell>
                                            <StyledTableCell align="right">Bild</StyledTableCell>
                                        </StyledTableRow>
                                    </TableHead>
                                    <TableBody>
                                        {row.erklaerung.map((erklaerungsrow) => (
                                            <StyledTableRow key={erklaerungsrow.date}>
                                                <StyledTableCell component="th" scope="row">
                                                    {erklaerungsrow.beschreibung}
                                                </StyledTableCell>

                                            </StyledTableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Box>
                        </Collapse>
                    </StyledTableCell>
                </StyledTableRow>
            </React.Fragment>


        );
    }

//Funktion um mit den Daten aus der Datenbank die Datensätze für die Tabelle zu erstellen
    function rows() {

        const zeile = []


        if (uebungen != null) {

            for (let i = 0; i < uebungen.length; i++) {
                zeile.push(createData(uebungen[i].Name, uebungen[i].Kategorie, uebungen[i].Beschreibung))
            }
        }

        return zeile
    }


    //Funktion um zu erkennen, wann der SaveButton gedrückt wird und um die ausgewählten Uebungen im localStorage zu speichern
    function saveAction() {
        window.localStorage.removeItem(number)
        if (window.localStorage.getItem(number) == null) {
            window.localStorage.setItem(number, selectedItems)
        } else {
            window.localStorage.setItem(number, selectedItems + ',' + window.localStorage.getItem(number))
        }


        if (localStorage.getItem(number) === '') {
            handleClick("Bitte etwas auswählen")
            setSeverity('error')
        } else {
            handleClick("Saved successfully")
            setSeverity('success')
            selectedItems = []
            navigate('/create')

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




    return (
        <>
            <Zoom in={true}>
                <div id="content">
                    <div id={"headlineTr"}>
                        <IconButton
                            id={"backIcon"}
                            fontSize="large"
                            onClick={() => navigate("/create")}
                        >
                            <ArrowBackIosIcon></ArrowBackIosIcon>
                        </IconButton>
                        <Typography ml={3} mt={3} variant='h2'
                                    sx={{fontWeight: 'bold', fontFamily: 'Bahnschrift'}}>Übungen</Typography>
                    </div>

                    <TableContainer component={Paper} id="tableContainer2">
                        <Table stickyHeader size="small">
                            <TableHead>
                                <StyledTableRow>
                                    <StyledTableCell/>
                                    <StyledTableCell>Name</StyledTableCell>
                                    <StyledTableCell>Kategorie</StyledTableCell>

                                </StyledTableRow>
                            </TableHead>
                            <TableBody>
                                {uebungen != null &&
                                    rows().map((row) => (
                                        <Row key={row.name} row={row}/>
                                    ))
                                }
                                {uebungen == null &&
                                    <>
                                        <TableRow>
                                            <TableCell><Skeleton variant="circular" width={40} height={40}/></TableCell>
                                            <TableCell><Skeleton variant="text" sx={{ fontSize: '1.5rem' }} width={150} /></TableCell>
                                            <TableCell><Skeleton variant="text" sx={{ fontSize: '1.5rem' }} width={90} /></TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell><Skeleton variant="circular" width={40} height={40}/></TableCell>
                                            <TableCell><Skeleton variant="text" sx={{ fontSize: '1.5rem' }} width={150} /></TableCell>
                                            <TableCell><Skeleton variant="text" sx={{ fontSize: '1.5rem' }} width={90} /></TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell><Skeleton variant="circular" width={40} height={40}/></TableCell>
                                            <TableCell><Skeleton variant="text" sx={{ fontSize: '1.5rem' }} width={150} /></TableCell>
                                            <TableCell><Skeleton variant="text" sx={{ fontSize: '1.5rem' }} width={90} /></TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell><Skeleton variant="circular" width={40} height={40}/></TableCell>
                                            <TableCell><Skeleton variant="text" sx={{ fontSize: '1.5rem' }} width={150} /></TableCell>
                                            <TableCell><Skeleton variant="text" sx={{ fontSize: '1.5rem' }} width={90} /></TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell><Skeleton variant="circular" width={40} height={40}/></TableCell>
                                            <TableCell><Skeleton variant="text" sx={{ fontSize: '1.5rem' }} width={150} /></TableCell>
                                            <TableCell><Skeleton variant="text" sx={{ fontSize: '1.5rem' }} width={90} /></TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell><Skeleton variant="circular" width={40} height={40}/></TableCell>
                                            <TableCell><Skeleton variant="text" sx={{ fontSize: '1.5rem' }} width={150} /></TableCell>
                                            <TableCell><Skeleton variant="text" sx={{ fontSize: '1.5rem' }} width={90} /></TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell><Skeleton variant="circular" width={40} height={40}/></TableCell>
                                            <TableCell><Skeleton variant="text" sx={{ fontSize: '1.5rem' }} width={150} /></TableCell>
                                            <TableCell><Skeleton variant="text" sx={{ fontSize: '1.5rem' }} width={90} /></TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell><Skeleton variant="circular" width={40} height={40}/></TableCell>
                                            <TableCell><Skeleton variant="text" sx={{ fontSize: '1.5rem' }} width={150} /></TableCell>
                                            <TableCell><Skeleton variant="text" sx={{ fontSize: '1.5rem' }} width={90} /></TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell><Skeleton variant="circular" width={40} height={40}/></TableCell>
                                            <TableCell><Skeleton variant="text" sx={{ fontSize: '1.5rem' }} width={150} /></TableCell>
                                            <TableCell><Skeleton variant="text" sx={{ fontSize: '1.5rem' }} width={90} /></TableCell>
                                        </TableRow>
                                    </>
                                }




                            </TableBody>
                        </Table>
                    </TableContainer>
                    <div>
                        <Button variant="contained" color="success" id="saveButton" onClick={saveAction}>
                            Speichern
                        </Button>
                    </div>





                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>

                        <Alert severity={severity} onClose={handleClose} sx={{width: '100%'}}>
                            {alertinhalt}
                        </Alert>


                    </Snackbar>

                </div>
            </Zoom>
        </>
    );
}

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
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import KeyboardDoubleArrowRightTwoToneIcon from '@mui/icons-material/KeyboardDoubleArrowRightTwoTone';
import {
    Dialog, DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grow,
    Skeleton,
    Slide,
    tableCellClasses,
    Zoom
} from "@mui/material";
import {styled} from '@mui/material/styles';
import {TransitionGroup} from "react-transition-group";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import {wait} from "@testing-library/user-event/dist/utils";
import {logDOM} from "@testing-library/react";
import ClearIcon from '@mui/icons-material/Clear';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Trainingsplanverwaltung() {

    let user=JSON.parse(localStorage.getItem("user"))
    console.log(user.id)

    const uebungen = data.get('uebungen')
    const trainingsplan = data.getTrainingsplan(user.id)
    console.log(trainingsplan)
    const trainingstage = data.getTrainingstageSorted('trainingstag')

// Funktion um einen Datensatz in der Tabelle zu erstellen
    function createData(id, name, trainingstage, selected) {
        return {
            id,
            name,
            trainingstage,
            selected


        };
    }



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
    const [selectedrow, setSelectedRow] = React.useState("")

// Funktion mit der die Reihen der Tabelle mit Daten gefühlt und zusammengesetzt werden, um sie anschließend
    function Row(props) {
        const {number} = useParams()
        const {row} = props;
        const [open, setOpen] = React.useState(false);
        const labelId = `enhanced-table-checkbox-1`;
        const [checked, setChecked] = React.useState(false)
        const navigate = useNavigate();
        const [refresh, setRefresh] = React.useState(0)




        const selectTrainingsplan = (e) => {


                data.update(row.name, 'TRUE')
                navigate('/create')


        }

        const deleteTrainingsplan = () =>{
            setOpenDialog(false);
            data.deleteTrainingsplan(row.id).then(navigate('/create'))



            //document.getElementById('table').deleteRow(selectedrow.rowIndex)


        }





        return (
            <React.Fragment>
                <StyledTableRow sx={{'& > *': {borderBottom: 'unset'}}}>
                    <TableCell width={"15%"}>
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => setOpen(!open)}
                        >
                            {open ? <KeyboardArrowDownIcon/> : <KeyboardArrowRightIcon/>}
                        </IconButton>
                    </TableCell>
                    <StyledTableCell width={"40%"} id={"checkboxcontainer"}>
                        <div id='namediv'>
                        {row.name}
                        </div>



                            <IconButton className={row.name} onClick={selectTrainingsplan}>
                                {row.selected ? <CheckBoxIcon id={'trvcheckbox'}> </CheckBoxIcon> : <CheckBoxOutlineBlankIcon id={'trvcheckbox'}></CheckBoxOutlineBlankIcon>}

                            </IconButton>
                        <IconButton className={row.name} onClick={handleClickOpen} >
                            {row.selected ? <ClearIcon > </ClearIcon> : <ClearIcon ></ClearIcon>}

                        </IconButton>



                    </StyledTableCell>

                </StyledTableRow>
                <StyledTableRow>
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
                                                <StyledTableRow sx={{'& > *': {borderBottom: 'unset'}}} >
                                                    <TableCell component="th" scope="row">
                                                        {trainingstag.Tagesbezeichung}
                                                    </TableCell>
                                                    <StyledTableCell align={"right"}>
                                                        <IconButton
                                                            size="small"
                                                            onClick={ async () => {

                                                                const uebungen = await data.getUebungenfromTrainingstag(await data.getUebungsIDsfromTrainingstag(trainingstag.trainingstagID))
                                                                console.log(uebungen)
                                                                const jsonString = JSON.stringify(uebungen)
                                                                const encodedParam = encodeURIComponent(jsonString);
                                                                navigate("/EditTrainingstag/" + encodedParam + "/" + trainingstag.trainingstagID)
                                                            }}

                                                        >
                                                            <EditTwoToneIcon></EditTwoToneIcon>
                                                        </IconButton>
                                                    </StyledTableCell>
                                                </StyledTableRow>
                                            </>
                                        ))}

                                    </TableBody>
                                </Table>
                            </Box>
                        </Collapse>
                    </TableCell>
                </StyledTableRow>

                <Dialog
                    open={openDialog}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle>{"Wollen Sie diesen Trainingsplan wirklich löschen?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            Wenn Sie diesen Trainingsplan löschen gehen alle Daten von diesem verloren.
                            Sie können diese Action nicht rückgängig machen.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Abbrechen</Button>
                        <Button onClick={deleteTrainingsplan}>Löschen</Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>


        );
    }

//Funktion um mit den Daten aus der Datenbank die Datensätze für die Tabelle zu erstellen
    const test = [{}];
    const [rows2, setRows] = React.useState(test)
    function rows() {


        const zeile = []


        if (trainingsplan != null && trainingstage != null && uebungen != null) {

            for (let i = 0; i < trainingsplan.length; i++) {
                const trainingstagBezeichnung = trainingstage.filter((tag) => tag.trainingsplanID == trainingsplan[i].trainingsplanID)


                zeile.push(createData(trainingsplan[i].trainingsplanID, trainingsplan[i].name, trainingstagBezeichnung, trainingsplan[i].selected))
            }

        }


        return zeile
    }


// Funktion in welcher die finale Tabelle zusammengesetzt wird

    const [open, setOpen] = React.useState(false);
    const [alertinhalt, setAlertInhalt] = useState("")
    const [severity, setSeverity] = useState("")
    const {number} = useParams()
    const navigate = useNavigate();



    const [openDialog, setOpenDialog] = React.useState(false);

    const handleClickOpen = (e) => {
        setSelectedRow(e.target.rowIndex)

        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
    };




    return (
        <div id="content">

            <Zoom in={true}>
                <div id={"headlineTr"}>
                    <IconButton
                        id={"backIcon"}
                        fontSize="large"
                        onClick={() => navigate("/create")}
                    >
                        <ArrowBackIosIcon></ArrowBackIosIcon>
                    </IconButton>
                    <Typography m={3} variant='h2' sx={{fontWeight: 'bold', fontFamily: 'Bahnschrift'}}>Deine Trainingspläne</Typography>
                </div>

            </Zoom>
            <Zoom in={true}><TableContainer component={Paper} id="tableContainer">
                <Table stickyHeader size="small" id={"table"}>
                    <TableHead>
                        <StyledTableRow>
                            <StyledTableCell/>
                            <StyledTableCell>Name</StyledTableCell>


                        </StyledTableRow>
                    </TableHead>

                    <TableBody>
                        {trainingstage != null &&
                            rows().map((row, rowIndex) => (
                            <Row key={row.name} row={row}/>
                        ))}

                        {trainingstage == null &&
                            <>
                                <StyledTableRow sx={{'& > *': {borderBottom: 'unset'}}}>
                                    <TableCell><Skeleton variant="circular" width={40} height={40}/></TableCell>
                                    <TableCell id={'checkboxcontainer'}><Skeleton variant="text" sx={{ fontSize: '1.5rem' }} width={180} />
                                        <Skeleton variant="circular" width={40} height={40}/>
                                    </TableCell>
                                </StyledTableRow>
                                <StyledTableRow sx={{'& > *': {borderBottom: 'unset'}}}>
                                    <TableCell><Skeleton variant="circular" width={40} height={40}/></TableCell>
                                    <TableCell id={'checkboxcontainer'}><Skeleton variant="text" sx={{ fontSize: '1.5rem' }} width={180} />
                                        <Skeleton variant="circular" width={40} height={40}/>
                                    </TableCell>
                                </StyledTableRow>
                                <StyledTableRow sx={{'& > *': {borderBottom: 'unset'}}}>
                                    <TableCell><Skeleton variant="circular" width={40} height={40}/></TableCell>
                                    <TableCell id={'checkboxcontainer'}><Skeleton variant="text" sx={{ fontSize: '1.5rem' }} width={180} />
                                        <Skeleton variant="circular" width={40} height={40}/>
                                    </TableCell>
                                </StyledTableRow>
                                <StyledTableRow sx={{'& > *': {borderBottom: 'unset'}}}>
                                    <TableCell><Skeleton variant="circular" width={40} height={40}/></TableCell>
                                    <TableCell id={'checkboxcontainer'}><Skeleton variant="text" sx={{ fontSize: '1.5rem' }} width={180} />
                                        <Skeleton variant="circular" width={40} height={40}/>
                                    </TableCell>
                                </StyledTableRow>
                                <StyledTableRow sx={{'& > *': {borderBottom: 'unset'}}}>
                                    <TableCell><Skeleton variant="circular" width={40} height={40}/></TableCell>
                                    <TableCell id={'checkboxcontainer'}><Skeleton variant="text" sx={{ fontSize: '1.5rem' }} width={180} />
                                        <Skeleton variant="circular" width={40} height={40}/>
                                    </TableCell>
                                </StyledTableRow>
                                <StyledTableRow sx={{'& > *': {borderBottom: 'unset'}}}>
                                    <TableCell><Skeleton variant="circular" width={40} height={40}/></TableCell>
                                    <TableCell id={'checkboxcontainer'}><Skeleton variant="text" sx={{ fontSize: '1.5rem' }} width={180} />
                                        <Skeleton variant="circular" width={40} height={40}/>
                                    </TableCell>

                                </StyledTableRow>
                                <StyledTableRow sx={{'& > *': {borderBottom: 'unset'}}}>
                                    <TableCell><Skeleton variant="circular" width={40} height={40}/></TableCell>
                                    <TableCell id={'checkboxcontainer'}><Skeleton variant="text" sx={{ fontSize: '1.5rem' }} width={180} />
                                        <Skeleton variant="circular" width={40} height={40}/>
                                    </TableCell>

                                </StyledTableRow>
                                <StyledTableRow sx={{'& > *': {borderBottom: 'unset'}}}>
                                    <TableCell><Skeleton variant="circular" width={40} height={40}/></TableCell>
                                    <TableCell id={'checkboxcontainer'}><Skeleton variant="text" sx={{ fontSize: '1.5rem' }} width={180} />
                                        <Skeleton variant="circular" width={40} height={40}/>
                                    </TableCell>

                                </StyledTableRow>
                                <StyledTableRow sx={{'& > *': {borderBottom: 'unset'}}}>
                                    <TableCell><Skeleton variant="circular" width={40} height={40}/></TableCell>
                                    <TableCell id={'checkboxcontainer'}><Skeleton variant="text" sx={{ fontSize: '1.5rem' }} width={180} />
                                        <Skeleton variant="circular" width={40} height={40}/>
                                    </TableCell>

                                </StyledTableRow>
                                <StyledTableRow sx={{'& > *': {borderBottom: 'unset'}}}>
                                    <TableCell><Skeleton variant="circular" width={40} height={40}/></TableCell>
                                    <TableCell id={'checkboxcontainer'}><Skeleton variant="text" sx={{ fontSize: '1.5rem' }} width={180} />
                                        <Skeleton variant="circular" width={40} height={40}/>
                                    </TableCell>

                                </StyledTableRow>
                            </>
                        }
                    </TableBody>

                </Table>
            </TableContainer>
            </Zoom>



        </div>
    );
}

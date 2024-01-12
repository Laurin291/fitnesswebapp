import * as React from 'react';
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
import {styled} from "@mui/material/styles";
import {tableCellClasses, Zoom} from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import Button from "@mui/material/Button";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import {CheckBox} from "@mui/icons-material";


function createData(name,inhalthistory,text) {
    return {
        name,
        text,
        history: [
            {
                inhalt:inhalthistory
            },
            {
                date: '2020-01-02',
                customerId: 'Anonymous',
                amount: 1,
            },
        ],
    };
}




function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const [checkedOne, setCheckedOne] = React.useState(false);

    const handleChangeOne = () => {
        setCheckedOne(!checkedOne);
    };

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                    {row.name}
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{margin: 1}}>
                            <Typography variant="h6" gutterBottom component="div">
                                {row.text}
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableBody>
                                    {row.history.map((trainingstag) => (
                                        <>
                                        {trainingstag.inhalt !== undefined &&
                                            <>
                                            <StyledTableRow sx={{'& > *': {borderBottom: 'unset'}}}>
                                                <TableCell component="th" scope="row">
                                                    {trainingstag.inhalt[0]}
                                                </TableCell>
                                                <StyledTableCell align={"right"}>
                                                    <Button
                                                        size="small"
                                                    >
                                                        <Checkbox  />
                                                    </Button>
                                                </StyledTableCell>
                                            </StyledTableRow>
                                                <StyledTableRow sx={{'& > *': {borderBottom: 'unset'}}}>
                                                        <TableCell component="th" scope="row">
                                                            {trainingstag.inhalt[1]}
                                                        </TableCell>
                                                        <StyledTableCell align={"right"}>
                                                            <Button
                                                                size="small"
                                                            >
                                                                <Checkbox  />
                                                            </Button>
                                                        </StyledTableCell>
                                                </StyledTableRow>
                                                <StyledTableRow sx={{'& > *': {borderBottom: 'unset'}}}>
                                                    <TableCell component="th" scope="row">
                                                        {trainingstag.inhalt[2]}
                                                    </TableCell>
                                                    <StyledTableCell align={"right"}>
                                                        <Button
                                                            size="small"
                                                        >
                                                            <Checkbox/>
                                                        </Button>
                                                    </StyledTableCell>
                                                </StyledTableRow>
                                                <StyledTableRow sx={{'& > *': {borderBottom: 'unset'}}}>
                                                    <TableCell component="th" scope="row">
                                                        {trainingstag.inhalt[3]}
                                                    </TableCell>
                                                    <StyledTableCell align={"right"}>
                                                        <Button
                                                            size="small"
                                                        >
                                                            <Checkbox  />
                                                        </Button>
                                                    </StyledTableCell>
                                                </StyledTableRow>
                                                <StyledTableRow sx={{'& > *': {borderBottom: 'unset'}}}>
                                                    <TableCell component="th" scope="row">
                                                        {trainingstag.inhalt[4]}
                                                    </TableCell>
                                                    <StyledTableCell align={"right"}>
                                                        <Button
                                                            size="small"
                                                        >
                                                            <Checkbox  />
                                                        </Button>
                                                    </StyledTableCell>
                                                </StyledTableRow>
                                            </>

                                        }
                                        </>
                                    ))}
                                    <Button variant="contained" color="success" id="saveButton">
                                        Save
                                    </Button>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>

    );
}
const array = ["Home","Trainingsplan","HIIT Training","Planken","Gewichtsverlauf"];

const rows = [
    createData('Priorisierte Startseite',array,"Wähle deine Priorisierte Startseite aus"),
    createData('Mein Konto', ),

];


const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#06367A',
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        fontfamily: "Bahnschrift"
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

export default function CollapsibleTable() {
    return (
        <div id="content">
            <Zoom in={true}><Typography m={3} variant='h2'
                                        sx={{fontWeight: 'bold', fontFamily: 'Bahnschrift'}}>Einstellungen</Typography></Zoom>
            <Zoom in={true}><TableContainer component={Paper} id="tableContainer">
            <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                        <StyledTableRow>
                            <StyledTableCell>Was willst du ändern</StyledTableCell>
                        </StyledTableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <Row key={row.name} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
            </TableContainer>
            </Zoom>
        </div>
    );
}
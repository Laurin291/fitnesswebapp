import * as React from 'react';
import {LineChart} from '@mui/x-charts';



import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slider} from "@mui/material";
import Box from "@mui/material/Box";
import * as PropTypes from "prop-types";
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import Button from "@mui/material/Button";
import supabase from "../config/supabaseClient";
import {validgewicht, validTagesbezeichnung} from "../Regex";
import {useEffect, useState} from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { Chart } from "react-google-charts";

import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup, {
    toggleButtonGroupClasses,
} from '@mui/material/ToggleButtonGroup';

import {
    ResponsiveContainer,
    AreaChart,
    XAxis,
    YAxis,
    Area,
    Tooltip,
    CartesianGrid,
} from "recharts";

import { format, parseISO, subDays } from "date-fns";
import TextField from "@mui/material/TextField";
import {styled} from "@mui/material/styles";




const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    [`& .${toggleButtonGroupClasses.grouped}`]: {
        margin: theme.spacing(0.5),
        border: 0,
        borderRadius: theme.shape.borderRadius,
        [`&.${toggleButtonGroupClasses.disabled}`]: {
            border: 0,
        },
    },
    [`& .${toggleButtonGroupClasses.middleButton},& .${toggleButtonGroupClasses.lastButton}`]:
        {
            marginLeft: -1,
            borderLeft: '1px solid transparent',
        },
}));

async function generatedatesandvalues() {
    let user=JSON.parse(localStorage.getItem("user"))

    let {data, error2} = await supabase
        .from("gewicht")
        .select("date,gewicht")
        .match({userID: user.id })
        .order("date")

    return data
}

export default function Gewichtsverlauf() {
    const [dataArray, setDataArray] = React.useState()
    const [isloaded, setIsLoaded] = React.useState(false)

    useEffect(() => {
        async function fetchData() {

            let data2 = await generatedatesandvalues()
            console.log(data2)
            if(data2 !== null){
                setIsLoaded(true)
                setDataArray(data2)
            }

        }
        fetchData();
    }, []);

    const [timerange, setTimerange] = React.useState('1M');

    const CustomToggleButton = () =>{



        const handleTimeRange = (event, newTimeRange) => {
            setTimerange(newTimeRange);
        };
        return (
            <div id={"customToggleButton"}>
                <Paper
                    elevation={0}
                    sx={{
                        display: 'flex',
                        border: (theme) => `1px solid ${theme.palette.divider}`,
                        flexWrap: 'wrap',
                    }}
                >
                    <StyledToggleButtonGroup
                        size="small"
                        value={timerange}
                        exclusive
                        onChange={handleTimeRange}
                        aria-label="text alignment"
                    >
                        <ToggleButton value="1M" aria-label="left aligned">
                            1M
                        </ToggleButton>
                        <ToggleButton value="3M" aria-label="centered">
                            3M
                        </ToggleButton>
                        <ToggleButton value="1J" aria-label="right aligned">
                            1J
                        </ToggleButton>
                        <ToggleButton value="AT" aria-label="justified">
                            AT
                        </ToggleButton>
                    </StyledToggleButtonGroup>
                </Paper>
            </div>
        )
    }



    console.log(isloaded)
    console.log(dataArray)

    const formatter = (str) =>{
        const date = parseISO(str);
        console.log(timerange)

        if (timerange == "1M"){
            console.log(date)
            if (date.getDate() % 2 === 0) {
                return format(date, "MMM, d");
            }
            return ''
        }else if (timerange == "3M"){
            console.log("ott")
            if (date.getDate() % 7 === 0) {
                return format(date, "MMM, d");
            }
            return ''
        }else if (timerange == "1J"){
            if (date.getDate() % 15 === 0) {
                return format(date, "MMM, d");
            }
            return ''
        }else if (timerange == 'AT'){

        }


    }


    return (
        <div id={"content"}>
            <h1 id={'ueberschriftfahrrad'}>Gewichtsverlauf</h1>
            <CustomToggleButton />

            {isloaded &&
            <ResponsiveContainer width="100%" height={400} id={"graphContainer"}>
                <AreaChart data={dataArray}>
                    <defs>
                        <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#2451B7" stopOpacity={0.4} />
                            <stop offset="75%" stopColor="#2451B7" stopOpacity={0.05} />
                        </linearGradient>
                    </defs>

                    <Area dataKey="gewicht" stroke="#2451B7" fill="url(#color)" />

                    <XAxis
                        dataKey="date"
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(str) => formatter(str)}

                    />

                    <YAxis
                        datakey="gewicht"
                        axisLine={false}
                        tickLine={false}
                        tickCount={6}
                        tickFormatter={number => `${number}kg`}

                    />

                    <Tooltip content={<CustomTooltip />} />



                    <CartesianGrid opacity={0.4} vertical={false} />
                </AreaChart>
            </ResponsiveContainer>
            }

            <Gewichtseingabe/>
        </div>
    );

}

function CustomTooltip({ active, payload, label }) {
    if (active) {
        return (
            <div className="tooltip">
                <h6 id={"tooltipDate"}>{format(parseISO(label), "eeee, d MMM, yyyy")}</h6>
                <p id={"tooltipValue"}>{payload[0].value} kg</p>
            </div>
        );
    }
    return null;
}


const Gewichtseingabe = () =>{

    const [valid, setValid] = useState(false);
    const [openAlert, setOpenAlert] = React.useState(false);
    let user = JSON.parse(localStorage.getItem("user"))
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    async function saveAction() {
        console.log(user.id)
        const tagesgewicht = document.getElementById('name').value
        console.log(tagesgewicht)

        let day = new Date().getDate()
        let month = new Date().getMonth() +1
        let year = new Date().getFullYear()

        const heutigesDatum = year + "-" + month + "-" + day

        const {data, error2} = await supabase
            .from("gewicht")
            .select()
            .match({date: heutigesDatum})

        console.log( data)

        if (data.length == 0 && valid){
            generatelatestvalues()
            const {error} = await supabase
                .from('gewicht')
                .insert([{
                    userID: user.id,
                    date: new Date(),
                    gewicht: tagesgewicht
                }])
        }else {
            setOpenAlert(true)
        }


    }

    async function generatelatestvalues(){
        const {data, error2} = await supabase
            .from("gewicht")
            .select()
            .order('date', { ascending: false })
            .limit(1)

        if (data != null) {


            function dateRange(startDate, endDate, steps = 1) {
                const dateArray = [];
                let currentDate = new Date(startDate);
                currentDate.setDate(currentDate.getDate() + 1)
                let latestDate = new Date(endDate)
                latestDate.setDate(latestDate.getDate() - 1)
                while (currentDate < latestDate) {
                    dateArray.push(new Date(currentDate));
                    // Use UTC date to prevent problems with time zones and DST
                    currentDate.setUTCDate(currentDate.getUTCDate() + steps);
                }

                return dateArray;
            }

            console.log(data)

            const dates = dateRange(data[0].date, new Date());
            console.log(dates)


            if (dates.length > 0) {
                dates.map(async (datum) => {
                    const {error} = await supabase
                        .from('gewicht')
                        .insert([{
                            userID: user.id,
                            date: datum,
                            gewicht: data[0].gewicht
                        }])


                })
            }
        }




    }

    function checkvalidation(gewicht){
        if (!validgewicht.test(gewicht)) {
            document.getElementById('name').style.backgroundColor = 'lightsalmon'
            setValid(false)
        } else {
            document.getElementById('name').style.backgroundColor = "lightgreen";
            setValid(true)

        }
    }

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenAlert(false);
    };

    return(
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries(formData.entries());
                        const email = formJson.email;
                        console.log(email);
                        handleClose();
                    },
                }}
            >
                <DialogTitle>Tägliches Gewicht</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Geben Sie ihr Tagesgewicht ein.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        type="number"
                        fullWidth
                        variant="standard"
                        onInput={(e) => checkvalidation(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Abbrechen</Button>
                    <Button type="submit" onClick={saveAction}>Speichern</Button>
                </DialogActions>
            </Dialog>
            <Button onClick={handleClickOpen}>Heutiges Gewicht eintragen</Button>




            <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseSnackbar}>

                <Alert severity="error" onClose={handleCloseSnackbar} sx={{width: '100%'}}>
                    Tägliches Gewicht bereits eingegeben oder das Format vom Gewicht ist falsch
                </Alert>


            </Snackbar>
        </>
    )

}



import * as React from 'react';
import {LineChart} from '@mui/x-charts';


import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slider} from "@mui/material";
import Box from "@mui/material/Box";
import * as PropTypes from "prop-types";
import dayjs from 'dayjs';
import {DemoContainer} from '@mui/x-date-pickers/internals/demo';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {DateField} from '@mui/x-date-pickers/DateField';
import Button from "@mui/material/Button";
import supabase from "../config/supabaseClient";
import {validgewicht, validTagesbezeichnung} from "../Regex";
import {useEffect, useState} from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

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

import {format, parseISO, subDays} from "date-fns";
import TextField from "@mui/material/TextField";
import {styled} from "@mui/material/styles";


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({theme}) => ({
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
    let user = JSON.parse(localStorage.getItem("user"))


    let {data, error2} = await supabase
        .from("gewicht")
        .select("date,gewicht")
        .match({userID: user.id})
        .order("date")

    return data
}

export default function Gewichtsverlauf() {

    const skeletonData = [
        {
            date: '2024-01-01',
            gewicht: 70,
        },
        {
            date: '2024-02-01',
            gewicht: 80,
        },
        {
            date: '2024-03-01',
            gewicht: 50,
        },
        {
            date: '2024-04-01',
            gewicht: 60,
        },
        {
            date: '2024-05-01',
            gewicht: 100,
        },
        {
            date: '2024-06-01',
            gewicht: 60,
        },
    ];
    const [dataArray, setDataArray] = React.useState(skeletonData)
    const [isloaded, setIsLoaded] = React.useState(false)

    function loadResources() {
        async function fetchData() {
            let data2 = await generatedatesandvalues()
            if (data2.length > 0) {
                setIsLoaded(true)
                setDataArray(data2)
            }
        }
        fetchData();
    }

    useEffect(() => {
        loadResources()
    }, []);







    const formatter = (str) => {
        const date = parseISO(str);
        if (dataArray.length <1000){
            if (date.getDate() % 1 === 0) {
                return format(date, "d.MMM           ");
            }else{
                return ''
            }
        }
    }

    const Gewichtseingabe = () => {

        const [valid, setValid] = useState(false);
        const [openAlert, setOpenAlert] = React.useState(false);
        let user = JSON.parse(localStorage.getItem("user"))
        const [openEingabe, setOpenEingabe] = React.useState(false);
        const [openSecond, setOpenSecond] = React.useState(false);
        const [tagesgewicht, setTagesgewicht] = React.useState();


        const handleClickOpenEingabe = () => {
            setOpenEingabe(true);
        };

        const handleCloseEingabe = () => {
            setOpenEingabe(false);
        };

        const handleClickOpenSecond = () => {
            setOpenSecond(true);
            setTagesgewicht(document.getElementById('name').value)
        };

        const handleCloseSecond = () => {
            setOpenSecond(false);
        };


        async function saveAction() {
            handleCloseSecond()
            let day = new Date().getDate()
            let month = new Date().getMonth() + 1
            let year = new Date().getFullYear()
            const heutigesDatum = year + "-" + month + "-" + day

            const {data, error2} = await supabase
                .from("gewicht")
                .select()
                .match({date: heutigesDatum, userID: user.id})

            if (data.length == 0 && valid) {
                await generatelatestvalues()
                const {error} = await supabase
                    .from('gewicht')
                    .insert([{
                        userID: user.id,
                        date: new Date(),
                        gewicht: tagesgewicht
                    }])
                loadResources()
            } else {
                setOpenAlert(true)
            }
        }

        async function generatelatestvalues() {
            const {data, error2} = await supabase
                .from("gewicht")
                .select()
                .match({userID: user.id})
                .order('date', {ascending: false})
                .limit(1)
            if (data.length > 0) {
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
                const dates = dateRange(data[0].date, new Date());
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

        function checkvalidation(gewicht) {
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


        return (
            <>
                <Button onClick={handleClickOpenEingabe}>Heutiges Gewicht eintragen</Button>
                <Dialog
                    open={openEingabe}
                    onClose={handleCloseEingabe}
                    PaperProps={{
                        component: 'form',
                        onSubmit: (event) => {
                            event.preventDefault();
                            const formData = new FormData(event.currentTarget);
                            const formJson = Object.fromEntries(formData.entries());
                            const email = formJson.email;
                            console.log(email);
                            handleCloseEingabe();
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
                            fullWidth
                            variant="standard"
                            onInput={(e) => checkvalidation(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseEingabe}>Abbrechen</Button>
                        <Button type="submit" onClick={handleClickOpenSecond}>Speichern</Button>
                    </DialogActions>
                </Dialog>

                <Dialog
                    open={openSecond}
                    onClose={handleCloseSecond}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Wollen Sie dieses Tagesgewicht speichern?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {tagesgewicht + " kg"}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseSecond}>Nein</Button>
                        <Button onClick={saveAction} autoFocus>
                            Ja
                        </Button>
                    </DialogActions>
                </Dialog>


                <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseSnackbar}>

                    <Alert severity="error" onClose={handleCloseSnackbar} sx={{width: '100%'}}>
                        Tägliches Gewicht bereits eingegeben oder das Format vom Gewicht ist falsch
                    </Alert>


                </Snackbar>
            </>
        )

    }


    return (
        <div id={"content"}>
            <h1 id={'ueberschriftfahrrad'}>Gewichtsverlauf</h1>


            <ResponsiveContainer width="100%" height={400} id={"graphContainer"}>
                <AreaChart data={dataArray}>
                    <defs>
                        <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#2451B7" stopOpacity={0.4}/>
                            <stop offset="75%" stopColor="#2451B7" stopOpacity={0.05}/>
                        </linearGradient>
                    </defs>
                    {isloaded === false &&
                        <text
                            x='50%'
                            y='60%'
                            style={{fontSize: 68, fontWeight: 'bold', fill: '#777'}}
                            width={500}
                            scaleToFit={true}
                            textAnchor='middle'
                            verticalAnchor='middle'
                        >
                            Bitte geben Sie ihr Startgewicht ein
                        </text>
                    }
                    <Area type="monotone" dataKey="gewicht" stroke="#2451B7" fill="url(#color)"/>

                    <XAxis
                        dataKey="date"
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={str => formatter(str)}
                    />
                    <YAxis
                        datakey="gewicht"
                        axisLine={false}
                        tickLine={false}
                        tickCount={6}
                        tickFormatter={number => `${number}kg`}
                    />

                    <Tooltip content={<CustomTooltip/>}/>


                    <CartesianGrid opacity={0.4} vertical={false}/>
                </AreaChart>
            </ResponsiveContainer>


            <Gewichtseingabe/>
        </div>
    );

}

function CustomTooltip({active, payload, label}) {
    if (active && payload[0] !== undefined) {
        return (
            <div className="tooltip">
                <h6 id={"tooltipDate"}>{format(parseISO(label), "eeee, d MMM, yyyy")}</h6>
                <p id={"tooltipValue"}>{payload[0].value} kg</p>
            </div>
        );
    }
    return null;
}






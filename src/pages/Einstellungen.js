import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Checkbox from "@mui/material/Checkbox";
import {
    Dialog, DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel, Radio, RadioGroup
} from "@mui/material";
import Button from "@mui/material/Button";
import {useState} from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import EditIcon from '@mui/icons-material/Edit';
import {validemail, validfirstName, validpassword} from "../Regex";
import supabase from "../config/supabaseClient";
import {useNavigate} from "react-router-dom";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import data from "../data";

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;


    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function BasicTabs() {
    const [value, setValue] = React.useState(0);
    let [firstName, setFirstName] = useState('');
    let [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [open, setOpen] = React.useState(false);
    const [open1, setOpen1] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [open3, setOpen3] = React.useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [emailError, setemailError] = useState(false);
    const [firstnameError, setfirstnameError] = useState(false);
    const [lastnameError, setlastnameError] = useState(false);
    const [severity, setSeverity] = useState("")
    const [alertinhalt, setAlertInhalt] = useState("")
    const [openalert, setOpenalert] = React.useState(false);
    const navigate = useNavigate();


    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpen1 = () => {
        setOpen1(true);
    };

    const handleClose1 = () => {
        setOpen1(false);
    };
    const handleClickOpen2 = () => {
        setOpen2(true);
    };

    const handleClose2 = () => {
        setOpen2(false);
    };
    const handleClickOpen3 = () => {
        setOpen3(true);
    };

    const handleClose3 = () => {
        setOpen3(false);
    };
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    const handleClosealert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenalert(false);
    };
    const handleClickalert = (nachricht) => {
        setOpenalert(true);
        setAlertInhalt(nachricht)
    };


    let user=JSON.parse(localStorage.getItem("user"))

    function stringToHash(string) {

        let hash = 0;

        if (string.length === 0) return hash;

        for (let i = 0; i < string.length; i++) {
            const  char = string.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }

        return hash;
    }

    async function updateUserPassword(password) {
        setPasswordError(false)
        const passwordErr = !validpassword.test(password)
        if (passwordErr) {
            setPasswordError(true);
        }
        if(passwordError){
            return;
        }
        if(!passwordErr) {
            const {data, error} = await supabase
                .from("benutzer")
                .update([{Kennwort: stringToHash(password)}])
                .eq('id', user.id)

            if(data!==0){
                handleClose1()
            }
        }
    }

    async function updateUserEmail(email) {
        setemailError(false)
        const emailErr = !validemail.test(email)
        if (emailErr) {
            setemailError(true);
        }
        if(emailError){
            return;
        }
        if(!emailErr) {
            const {data, error} = await supabase
                .from("benutzer")
                .update([{Email: email.toLowerCase()}])
                .eq('id', user.id)

            if(data!==0){
                handleClose()
            }
        }
    }

    async function updateUserVor(first) {
        setfirstnameError(false)
        const firstnameErr = !validfirstName.test(first)
        if (firstnameErr) {
            setfirstnameError(true);
        }
        if(firstnameErr){
            return;
        }
        if(!firstnameErr) {
            const {data, error} = await supabase
                .from("benutzer")
                .update([{Vorname: first}])
                .eq('id', user.id)

            if(data!==0){
                handleClose3()
            }
        }
    }

    async function updateUserNach(last) {
        setlastnameError(false)
        const lastnameErr = !validfirstName.test(last)
        if (lastnameErr) {
            setlastnameError(true);
        }
        if(lastnameErr){
            return;
        }
        if(!lastnameErr) {
            const {data, error} = await supabase
                .from("benutzer")
                .update([{Nachname: last}])
                .eq('id', user.id)

            if(data!==0){
                handleClose2()
            }
        }
    }

    const [valueprio, setValueprio] = React.useState('Home');

    const handleChangeprio = (event) => {
        setValueprio(event.target.value);
    };


   async function saveAction(){
                const {data, error} = await supabase
                    .from("benutzer")
                    .update([{Priorisiert: valueprio}])
                    .eq('id', user.id)

                    handleClickalert("Erfolgreich gespeichert")

                if(data!==0){
                }
        }


    return (
        <div id="content">
            <div id="ueberschriftfahrrad">Einstellungen</div>
            <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Priorisierte Startseite" {...a11yProps(0)} />
                    <Tab label="Kontoübersicht" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <div style={{fontSize:40}}>Priorisierte Startseite</div>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Bitte wähle deine Priorisierte Startseite</FormLabel>
                    <FormControl>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="female"
                            name="radio-buttons-group"
                            value={valueprio}
                            onChange={handleChangeprio}
                        >

                            <FormControlLabel value="Home" control={<Radio style={{ transform: 'scale(1.2)' }}/>}
                                              label={<Typography variant="h6">Home</Typography>}
                                              style={{ marginTop: 10 }}

                            />
                            <FormControlLabel value="Trainingsplanverwaltung" control={<Radio style={{ transform: 'scale(1.2)' }}/>}
                                              label={<Typography variant="h6">Trainingsplanverwaltung</Typography>}
                                              style={{ marginTop: 10 }}
                            />
                            <FormControlLabel value="Planken" control={<Radio style={{ transform: 'scale(1.2)' }}/>}
                                              label={<Typography variant="h6">Planken</Typography>}

                                              style={{ marginTop: 10 }}
                            />
                            <FormControlLabel value="HIIT Training" control={<Radio style={{ transform: 'scale(1.2)' }} />}
                                              label={<Typography variant="h6">HIIT Training</Typography>}
                                              style={{ marginTop: 10 }}
                            />
                            <FormControlLabel value="Gewichtsverlauf" control={<Radio style={{ transform: 'scale(1.2)' }} />}
                                              label={<Typography variant="h6">Gewichtsverlauf</Typography>}
                                              style={{ marginTop: 10 }}
                            />
                        </RadioGroup>
                        <div>
                            <Button variant="contained" color="success" id="saveButton" style={{float:"left", marginTop:25}} onClick={saveAction}>
                                Speichern
                            </Button>
                        </div>
                    </FormControl>
                </FormControl>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <div style={{fontSize:40}}>Kontoübersicht</div>
                <FormLabel component="legend">Hier siehst du deine Kontoübersicht</FormLabel>
                <Container maxWidth="sm" style={{marginLeft:-30}}>
                    <form>
                        <Grid container spacing={2}>
                            <Grid item xs={12} style={{display:"flex", alignItems: "center"}}>
                               <TextField
                                    label="Vorname"
                                    variant="outlined"
                                    id="Vornamea"
                                    fullWidth
                                    value={user.firstname}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    style={{marginTop:20}}
                                />
                            <EditIcon style={{margin: "10 0 0 10"}} onClick={handleClickOpen3}></EditIcon>
                                <Dialog
                                    open={open3}
                                    onClose={handleClose3}
                                    PaperProps={{
                                        component: 'form',
                                        onSubmit: (event) => {
                                            event.preventDefault();
                                            const formData = new FormData(event.currentTarget);
                                            const formJson = Object.fromEntries(formData.entries());
                                            const email = formJson.email;
                                            console.log(email);
                                            handleClose3();
                                        },
                                    }}
                                >
                                    <DialogTitle>Ändere deinen Vornamen</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText>
                                            Fülle deinen neunen Vornamen aus.
                                        </DialogContentText>
                                        <TextField
                                            autoFocus
                                            required
                                            margin="dense"
                                            id="vorname"
                                            name="vorname"
                                            label="Vorname"
                                            type="vorname"
                                            fullWidth
                                            variant="standard"
                                        />
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleClose3}>Abbrechen</Button>
                                        <Button onClick={async key => {
                                            firstName = document.getElementById("vorname").value
                                            await updateUserVor(firstName)
                                            user.firstname=firstName
                                            localStorage.setItem("user", JSON.stringify(user));

                                        }}
                                        >OK</Button>
                                    </DialogActions>
                                </Dialog>
                            </Grid>
                            <Grid item xs={12}  style={{display:"flex", alignItems: "center"}}>
                                <TextField
                                    label="Nachname"
                                    variant="outlined"
                                    fullWidth
                                    value={user.lastname}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                                <EditIcon style={{margin: "5 0 0 10"}} onClick={handleClickOpen2}></EditIcon>
                                <Dialog
                                    open={open2}
                                    onClose={handleClose2}
                                    PaperProps={{
                                        component: 'form',
                                        onSubmit: (event) => {
                                            event.preventDefault();
                                            const formData = new FormData(event.currentTarget);
                                            const formJson = Object.fromEntries(formData.entries());
                                            const email = formJson.email;
                                            console.log(email);
                                            handleClose2();
                                        },
                                    }}
                                >
                                    <DialogTitle>Ändere deinen Nachname</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText>
                                            Fülle deinen neunen Nachnamen aus.
                                        </DialogContentText>
                                        <TextField
                                            autoFocus
                                            required
                                            margin="dense"
                                            id="lastname"
                                            name="lastname"
                                            label="Nachname"
                                            type="lastname"
                                            fullWidth
                                            variant="standard"
                                        />
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleClose2}>Abbrechen</Button>
                                        <Button onClick={async () => {
                                            const last = document.getElementById("lastname").value
                                            await updateUserNach(last)
                                            user.lastname=last
                                            localStorage.setItem("user", JSON.stringify(user));
                                        }}
                                        >OK</Button>                                    </DialogActions>
                                </Dialog>
                            </Grid>
                            <Grid item xs={12} style={{display:"flex", alignItems: "center"}}>
                                <TextField
                                    label="E-Mail"
                                    type="email"
                                    variant="outlined"
                                    fullWidth
                                    value={user.emailUser}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <EditIcon style={{margin: "0 0 0 10"}} onClick={handleClickOpen}></EditIcon>
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
                                    <DialogTitle>Ändere deine Email</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText>
                                            Fülle deine neue Email aus.
                                        </DialogContentText>
                                        <TextField
                                            autoFocus
                                            required
                                            margin="dense"
                                            id="email"
                                            name="email"
                                            label="email"
                                            type="email"
                                            fullWidth
                                            variant="standard"
                                        />
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleClose}>Abbrechen</Button>
                                        <Button onClick={async () => {
                                            const email1 = document.getElementById("email").value
                                            await updateUserEmail(email1)
                                            user.emailUser=email1
                                            localStorage.setItem("user", JSON.stringify(user));
                                        }}
                                        >OK</Button>
                                    </DialogActions>
                                </Dialog>
                            </Grid>
                            <Grid item xs={12} style={{display:"flex", alignItems: "center"}}>
                                <TextField
                                    label="Passwort"
                                    type="password"
                                    variant="outlined"
                                    fullWidth
                                    value={"********"}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <EditIcon style={{margin: "5 0 0 10"}} onClick={handleClickOpen1}></EditIcon>
                                <Dialog
                                    open={open1}
                                    onClose={handleClose1}
                                    PaperProps={{
                                        component: 'form',
                                        onSubmit: (event) => {
                                            event.preventDefault();
                                            const formData = new FormData(event.currentTarget);
                                            const formJson = Object.fromEntries(formData.entries());
                                            const email = formJson.email;
                                            console.log(email);
                                            handleClose1();
                                        },
                                    }}
                                >
                                    <DialogTitle>Ändere dein Passwort</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText>
                                           Fülle dein neues Passwort aus.
                                        </DialogContentText>
                                        <TextField
                                            autoFocus
                                            required
                                            margin="dense"
                                            id="password"
                                            name="password"
                                            label="password"
                                            type="password"
                                            fullWidth
                                            variant="standard"
                                            error={passwordError}
                                            helperText={passwordError ? "Checke die Validations" : ""}
                                        />
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleClose1}>Abbrechen</Button>
                                        <Button onClick={async () => {
                                            const pass = document.getElementById("password").value
                                            await updateUserPassword(pass)
                                            user.passwort=pass
                                            localStorage.setItem("user", JSON.stringify(user));
                                        }}
                                        >OK</Button>
                                    </DialogActions>
                                </Dialog>
                            </Grid>
                        </Grid>
                    </form>
                </Container>

            </CustomTabPanel>
        </Box>
            <Snackbar open={openalert} autoHideDuration={6000} onClose={handleClosealert}>
                <Alert severity={"success"} onClose={handleClosealert} sx={{width: '100%'}}>
                    {alertinhalt}
                </Alert>
            </Snackbar>
        </div>
    );
}
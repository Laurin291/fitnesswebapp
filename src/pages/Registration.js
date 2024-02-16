import * as React from 'react';
import {useEffect, useRef, useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import {Link, useNavigate} from "react-router-dom";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import data1 from "../data.js"
import {validemail, validfirstName, validlastName, validpassword} from '../Regex.js';
import {Zoom} from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import supabase from "../config/supabaseClient";
import * as emailjs from "@emailjs/browser";
import md5 from 'md5-hash'
import {Alert} from "@supabase/ui";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";




export default function SignUp() {
    const [firstnameErr, setFirstNameErr] = useState(false);
    const [lastnameErr, setLastNameError] = useState(false);
    const [emailErr, setEmailError] = useState(false);
    const [passwordErr, setpasswordErr] = useState(false);
    const [emailinuse, setemailinuse] = useState(false);
    const [loading, setLoading] = useState(false);
    const [openAlert, setOpenAlert] = React.useState(false);
    const [alertinhalt, setAlertInhalt] = useState("")
    const navigate = useNavigate();
    const emailRef = useRef();

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const handleSubmit = async () => {
        setFirstNameErr(false);
        setLastNameError(false);
        setEmailError(false);
        setpasswordErr(false);
        setemailinuse(false);

        const firstname = document.getElementById("firstName").value;
        const lastname = document.getElementById("lastName").value;
        const email = document.getElementById("email").value;
        const passwort = document.getElementById("password").value;


        const firstNameError = !validfirstName.test(firstname)
        const lastNameError = !validlastName.test(lastname)
        const emailError = !validemail.test(email)
        const passwordError = !validpassword.test(passwort)

        if (firstNameError) {
            setFirstNameErr(true);
        }

        if (lastNameError) {
            setLastNameError(true);
        }

        if (emailError) {
            setEmailError(true);
        }

        if (passwordError) {
            setpasswordErr(true);
        }


        const {data, error1} = await supabase
            .from('benutzer')
            .select('Email')
            .match({Email: email.toLowerCase()})

        if (error1 != null || data.length !== 0) {
            setemailinuse(true)
            return;
        }


        if (firstNameError || lastNameError || emailError || passwordError) {
            return;
        }


        const { sha256 } = require('js-sha256');

        await data1.postbenutzer(firstname, lastname, sha256(passwort), email)
        await handleSubmit1()
        navigate("/")

    }
    const handleClosealert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlert(false);
    };
    const handleClickalert = (nachricht) => {
        setOpenAlert(true);
        setAlertInhalt(nachricht)
    };


    useEffect(() => emailjs.init("eLuBMI1Jv0oeM60Z4"), []);
    const handleSubmit1 = async (e) => {
        async function getName(email) {
            const {data, error} = await supabase
                .from('benutzer')
                .select('Vorname')
                .match({Email: email.toLowerCase()})

            return data;
        }

        const serviceId = "service_3q3xr4z";
        const templateId = "template_0zc8frq";
        try {
            const name = await getName(emailRef.current.value)
            setLoading(true);
            await emailjs.send(serviceId, templateId, {
                name: name[0].Vorname,
                recipient: emailRef.current.value,
                message: "https://laurin291.github.io/fitnesswebapp//Verifyemail/" + encodeURIComponent(emailRef.current.value)
            });
            alert("email successfully sent check inbox");
            handleClickalert("Checke deine Emails und Verifiziere deinen Acoount")
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <Box
                sx={{
                    marginTop: 20,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box component="form" noValidate sx={{mt: 3}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="given-name"
                                name="firstName"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                error={firstnameErr}
                                helperText={firstnameErr ? "Nur Buchstaben verwenden" : ""}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="family-name"
                                error={lastnameErr}
                                helperText={lastnameErr ? "Nur Buchstaben verwenden" : ""}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                inputRef={emailRef}
                                error={emailinuse}
                                helperText={emailinuse ? "Email wurde bereits verwendet" : ""}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Tooltip TransitionComponent={Zoom}
                                     title={
                                         <>
                                             <Typography color="inherit">Passwort Anforderungen:</Typography>
                                             <Typography color="inherit">-Muss mindestens 8 Zeichen haben</Typography>
                                             <Typography color="inherit">-Muss einen Großbuchstaben
                                                 enthalten</Typography>
                                             <Typography color="inherit">-Muss einen Kleinbuchstaben
                                                 enthalten</Typography>
                                             <Typography color="inherit">-Muss ein Sonderzeichen enthalten</Typography>
                                         </>
                                     }
                            >
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    error={passwordErr}
                                    helperText={passwordErr ? "Checke die Validations" : ""}
                                />
                            </Tooltip>
                        </Grid>
                    </Grid>
                    <Button onClick={handleSubmit}
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link to="/" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleClosealert}>
                <Alert severity={"success"} onClose={handleClosealert} sx={{width: '100%'}}>
                    {alertinhalt}
                </Alert>
            </Snackbar>
        </Container>

    );
}
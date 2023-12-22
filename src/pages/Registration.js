import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {Link} from "react-router-dom";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {normalize} from "@testing-library/jest-dom/dist/utils";
import data1 from "../data.js"
import {validfirstName, validlastName,validemail,validpassword} from '../Regex.js';
import {useState} from "react";
import {Zoom} from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import {useNavigate} from "react-router-dom";
import supabase from "../config/supabaseClient";



function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function SignUp() {
    const [firstnameErr,setFirstNameErr] = useState(false);
    const [lastnameErr,setLastNameError] = useState(false);
    const [emailErr,setEmailError] = useState(false);
    const [passwordErr,setpasswordErr] = useState(false);
    const [emailinuse,setemailinuse] = useState(false);
    const navigate = useNavigate();




    async function handlesubmit() {
        let firstname;
        let lastname;
        let email;
        let passwort;

        firstname = document.getElementById("firstName").value;
        lastname = document.getElementById("lastName").value;
        passwort = document.getElementById("password").value;
        email = document.getElementById("email").value;


        if (!validfirstName.test(firstname)) {
            setFirstNameErr(true);
        }
        if (!validlastName.test(lastname)) {
            setLastNameError(true);
        }

        if (!validemail.test(email)) {
            setEmailError(true);
        }
        if (!validpassword.test(passwort)) {
            setpasswordErr(true);
        }

        const {data, error} = await supabase
            .from('benutzer')
            .select('Email')
            .match({Email: email.toLowerCase()})

        if (error != null || data.length !== 0) {
            setemailinuse(true)
            return null;
        }

        if (firstnameErr == false && lastnameErr == false && emailErr == false && passwordErr == false) {
            data1.postbenutzer(firstname, lastname, passwort, email)
            navigate("/")

        } else if (firstnameErr == true || lastnameErr == true || emailErr == true || passwordErr==true) {
            setEmailError(false)
            setFirstNameErr(false)
            setLastNameError(false)
            setpasswordErr(false)
        }


    }



    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 20,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box component="form" noValidate sx={{ mt: 3 }}>
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
                                error={emailinuse}
                                helperText={emailinuse? "Email wurde bereits verwendet":""}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Tooltip TransitionComponent={Zoom}
                                     title={
                                         <>
                                             <Typography color="inherit">Passwort Anforderungen:</Typography>
                                             <Typography color="inherit">-Muss mindestens 8 Zeichen haben</Typography>
                                             <Typography color="inherit">-Muss einen Großbuchstaben enthalten</Typography>
                                             <Typography color="inherit">-Muss einen Kleinbuchstaben enthalten</Typography>
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
                                    helperText={passwordErr? "Checke die Validations":""}
                                />
                            </Tooltip>
                        </Grid>
                    </Grid>
                    <Button onClick={handlesubmit}
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                    >
                        Sign In
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
        </Container>
    );
}
import * as React from 'react';
import {useState} from 'react';
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


function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function SignUp() {
    const [firstnameErr, setFirstNameErr] = useState(false);
    const [lastnameErr, setLastNameError] = useState(false);
    const [emailErr, setEmailError] = useState(false);
    const [passwordErr, setpasswordErr] = useState(false);
    const [emailinuse, setemailinuse] = useState(false);
    const navigate = useNavigate();

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


        await data1.postbenutzer(firstname, lastname, passwort, email)
        navigate("/")
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
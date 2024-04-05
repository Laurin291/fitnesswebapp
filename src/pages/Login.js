import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {validemail, validpassword} from "../Regex";
import supabase from "../config/supabaseClient";
import {useEffect, useRef, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import {Button} from "@material-ui/core";
import * as emailjs from "@emailjs/browser";
import * as React from "react";
import md5 from 'md5-hash'



const defaultTheme = createTheme();

export default function Login() {
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [AuthErr, setAuthErr] = useState(false);
    const [authError, setAuthError] = useState(false);
    const navigate = useNavigate();
    const emailRef = useRef();
    const [loading, setLoading] = useState(false);

    async function getUser(email, password) {
        const {data, error} = await supabase
            .from('benutzer')
            .select('Vorname, Nachname, id,Email,Kennwort,Verified,Priorisiert')
            .match({Email: email.toLowerCase(), Kennwort: password})

        if (error != null || data.length === 0) {
            return null;
        }

        return {
            firstname: data[0].Vorname,
            lastname: data[0].Nachname,
            id: data[0].id,
            emailUser:data[0].Email,
            passwortUser:data[0].Kennwort,
            verifiedUser:data[0].Verified,
            prioUser:data[0].Priorisiert

        }
    }

    async function handleSubmit() {
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;

        if (!validemail.test(email)) {
            setEmailError(true);
        }

        if (!validpassword.test(password)) {
            setPasswordError(true);
        }

        const { sha256 } = require('js-sha256');

        let user = await getUser(email, sha256(password));

        if (user !== null) {
            if(user.verifiedUser===false){
                alert("Bitte checke deine Emails und Verifiziere deinen Account")
                return
            }
        }

        if (user === null) {
            setAuthError(true)
            return
        }

            localStorage.setItem("user", JSON.stringify(user));

        if(user.prioUser==="Home"){
            navigate("/Home")
        }

        if(user.prioUser==="Trainingsplanverwaltung"){
            navigate("/create")
        }
        if(user.prioUser==="Planken"){
            navigate("/Plank")
        }
        if(user.prioUser==="HIIT Training"){
            navigate("/Fahrrad")
        }
        if(user.prioUser==="Gewichtsverlauf"){
            navigate("/Gewichtsverlauf")
        }
    }

    useEffect(() => emailjs.init("eLuBMI1Jv0oeM60Z4"), []);
    const handleSubmit1 = async (e) => {
        async function getName(email) {
            const {data, error} = await supabase
                .from('benutzer')
                .select('Vorname')
                .match({Email: email.toLowerCase()})

            return data;
        }
        e.preventDefault();
        const serviceId = "service_3q3xr4z";
        const templateId = "template_q8w1k15";
        try {
            const name= await getName(emailRef.current.value)
            setLoading(true);
            await emailjs.send(serviceId, templateId, {
                name:name[0].Vorname,
                recipient: emailRef.current.value,
                message: "https://fitnesswebapp-navy.vercel.app/ResetPassword/"+encodeURIComponent(emailRef.current.value)
            });
            alert("email successfully sent check inbox");
        } catch (error) {
            setAuthErr(true)
        } finally {
            setLoading(false);
        }

    };


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
                    Sign in
                </Typography>
                <Box component="form" noValidate sx={{mt: 1}}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        inputRef={emailRef}
                        error={AuthErr}
                        helperText={AuthErr ? "Email exestiert nicht" : ""}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        error={authError}
                        helperText={authError ? "Password oder Email ist Falsch" : ""}
                    />

                    <Button onClick={handleSubmit}
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                            style={{backgroundColor:"#076BF3",color:"white"}}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2" onClick={handleSubmit1}>
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link to="/Registration" variant="body2">
                                Don't have an account? Sign Up
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>

    );
}
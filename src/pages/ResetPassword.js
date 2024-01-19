import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import supabase from "../config/supabaseClient";
import {Link, useNavigate, useParams} from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import {Button} from "@material-ui/core";
import {validpassword} from "../Regex";
import {useState} from "react";
import Tooltip from "@mui/material/Tooltip";
import {Zoom} from "@mui/material";
import * as React from "react";


const defaultTheme = createTheme();

export default function ResetPassword() {
    const [passwordError, setPasswordError] = useState(false);
    const email1=useParams()
    const navigate = useNavigate();

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

    async function updateUser(password) {
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
                .eq('Email', email1.email.toLowerCase())


            navigate("/")
        }
    }



    return (
        <ThemeProvider theme={defaultTheme}>
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
                        New Password
                    </Typography>
                    <Box component="form" noValidate sx={{mt: 1}}>
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
                                    error={passwordError}
                                    helperText={passwordError ? "Checke die Validations" : ""}
                                />
                            </Tooltip>
                        </Grid>
                        <Grid container>
                            <Grid item xs>
                                <Button onClick={async () => {
                                    const pass = document.getElementById("password").value
                                    await updateUser(pass)
                                }
                                }
                                        fullWidth
                                        variant="contained"
                                        sx={{mt: 3, mb: 2}}
                                >
                                    Change Password
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
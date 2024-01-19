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

export default function Verifyemail() {
    const email1=useParams()
    const navigate = useNavigate();

    async function updateUser() {
            const {data, error} = await supabase
                .from("benutzer")
                .update([{Verified: true}])
                .eq('Email', email1.email.toLowerCase())

        if (error != null) {
            return;
        }
        navigate("/")
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
                        Verify your account please!
                    </Typography>
                    <Box component="form" noValidate sx={{mt: 1}}>
                        <Grid container>
                            <Grid item xs>
                                <Button onClick={updateUser}
                                        fullWidth
                                        variant="contained"
                                        sx={{mt: 3, mb: 2}}
                                >
                                    Verify
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
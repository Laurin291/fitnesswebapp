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


const defaultTheme = createTheme();

export default function Login() {
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [AuthErr, setAuthErr] = useState(false);
    const [authError, setAuthError] = useState(false);
    const navigate = useNavigate();
    const emailRef = useRef();
    const [loading, setLoading] = useState(false);

    async function Einstellungen() {


    }

    return (
        <div id="content">
            Otto
        </div>

    );
}
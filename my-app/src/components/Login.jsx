import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import GoogleButton from 'react-google-button'
import { useState } from 'react';
import { app } from '../config/firebase.config'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import {useNavigate} from 'react-router-dom'
import { useEffect } from 'react';

export default function SignInSide({setAuth}) {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();
  var loginHeader = new Headers();

  const handleSubmit = (event) => {
    event.preventDefault();
    const inputData = new FormData(event.currentTarget);
    let formDataObject = Object.fromEntries(inputData.entries())
    let formDataString = JSON.stringify(formDataObject)
    
    fetch("/localUsers/signin",{
      method: "POST",
      headers: { "Content-type": "application/json", "Accept": "application.json"},
      body: formDataString
    })
    .then((res) => res.json())
    .then((data) => {
      if(data.success === "false"){
      alert(JSON.stringify(data.msg))
      } else{
        navigate("/home", {replace: true});
        localStorage.setItem('profile', data.user.email)
      }
    })
  };

  const googleSignIn = async () => {
    await signInWithPopup(firebaseAuth, provider)
    .then((userCredentials) => {
      if(userCredentials){ //If user credentials already exist, set auth true
        setAuth(true);
        window.localStorage.setItem("auth", "true");

        firebaseAuth.onAuthStateChanged((userCredentials) => {
          if (userCredentials) { //If exists, redirect to homepage
            userCredentials.getIdToken().then((token) => {
              loginHeader.append("Accept", "application/json");
              loginHeader.append("Authentication", "Bearer Token");
              loginHeader.append("Authorization", "Bearer " + token);

              fetch("/users/login/", {
                method: "GET",
                headers: loginHeader,
              })
                .then((res) => res.json())
                .then((data) => {
                  if (data.success == false) {
                    alert(data.msg);
                  }
                });

                fetch("/users/credentials", {
                  method: "GET",
                  headers: loginHeader,
                })
                .then((res) => res.json())
                .then((data) => {
                  window.localStorage.setItem('role', data.user.role)
                })
              window.localStorage.setItem('profile', userCredentials.email)
            });            
            navigate("/home", {replace: true});
          } 
        });
      }
    })
  }

  useEffect(() => { //Redirect to homepage if auth state is true
    if (window.localStorage.getItem("auth") === "true") {
      //navigate("/home", {replace: true})
    }
  }, [])




  return (
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://wallpaperaccess.com/full/427393.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
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
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 3 }}
              >
                Sign In
              </Button>
              <GoogleButton
                onClick={googleSignIn}
              />
              <Grid container
                sx={{ mt: 3, mb: 3 }}
                justifyContent="center"
              >
                <Grid item>
                  <Link href='signup' variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
  );
}
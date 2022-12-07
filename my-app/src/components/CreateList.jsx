import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import PlaylistAddRoundedIcon from '@mui/icons-material/PlaylistAddRounded';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom'
import Switch from '@mui/material/Switch';
import TrackSearch from './TrackSearch';
import NavBar from './NavBar';
import { useState, useEffect } from 'react';

const theme = createTheme();
let trackNums = []

export default function CreateList() {
  const navigate = useNavigate();
  const [listName, setListName] = useState('')
  const [description, setDescription] = useState('')
  const [visibility, setVisibility] = useState('false')

  const convertTracks = () => {
    let trackString = window.localStorage.getItem("list_trackIDS")
    trackString = trackString.replace(/['"]+/g, '')
    let trackStringArray = trackString.split(',')
    for(let x = 0; x < trackStringArray.length; x++){
      trackNums[x] = parseInt(trackStringArray[x])
    }
    window.localStorage.setItem("list_trackIDS", trackNums)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const inputData = new FormData(event.currentTarget);
    let formDataObject = Object.fromEntries(inputData.entries())
    convertTracks();

    formDataObject.visibility = visibility
    formDataObject.list_trackIDS = trackNums
    formDataObject.email = window.localStorage.getItem("profile")
    let formDataString = JSON.stringify(formDataObject)
  
    fetch("/lists/save", {
      method: "POST",
      headers: { "Content-type": "application/json", "Accept": "application.json"},
      body: formDataString
    })
    .then((res) => res.json())
    .then((data) => {
      if(data.success == "false"){
        alert(JSON.stringify(data.msg))
      } else { //Route back to playlists on success, clear localstorage to reset form data for next
        navigate("/playlists", {replace: true})
        localStorage.setItem("list_trackIDS", '')
        localStorage.setItem("list_title", '')
        localStorage.setItem("description", '')
      }
    })    
  };

  const clearTrackList = () => {
    window.localStorage.setItem("list_trackIDS", "")
    window.location.reload();
  }

  const saveName = (event) => {
    const value = event.target.value
    setListName(value)
  }

  const saveDescription = (event) => {
    const value = event.target.value
    setDescription(value)
  }

  const saveInput = (event) => {
    window.localStorage.setItem("list_title", listName)
    window.localStorage.setItem("description", description)
  }

  return (
    <div>
    <NavBar />
    <Grid container spacing={0}>
      <Grid item xs>
        <TrackSearch />
      </Grid>
    <Grid item xs >
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <PlaylistAddRoundedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create New List
          </Typography>
          <Grid container spacing={6} justifyContent="space-evenly" alignItems="center">
            <Grid item xs={6}>
            <Button onClick={saveInput} variant="contained">Save Input Fields</Button>
            </Grid>
            <Grid item xs={6}>
            <Button onClick={clearTrackList} variant="contained">Clear Tracks</Button>
            </Grid>
          </Grid>
          <Typography component="h1" variant="body1" paddingTop={'20px'}>
            Remember To Hit Save To Prevent Input Refreshing!
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="list_title"
                  required
                  fullWidth
                  id="list_title"
                  label="List Title"
                  autoFocus
                  onInput={saveName}
                  defaultValue={window.localStorage.getItem("list_title")}
                  inputProps={{maxLength: 50}}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  disabled
                  inputMode='none'
                  fullWidth
                  id="list_trackIDS"
                  label="List Track IDs"
                  name="list_trackIDS"
                  defaultValue={window.localStorage.getItem("list_trackIDS")}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="description"
                  label="Description (optional)"
                  name="description"
                  onInput={saveDescription}
                  defaultValue={window.localStorage.getItem("description")}
                  inputProps={{maxLength: 100}}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  disabled
                  inputMode='none'
                  id="email"
                  label="Creator"
                  name="email"
                  defaultValue={window.localStorage.getItem("profile")}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel 
                control={<Checkbox />} 
                label="Public List?" 
                onChange={(event, newVisibility) => {
                  setVisibility(newVisibility);
                  }}
              />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create New List
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link href="playlists" variant="body2">
                  Return to Playlists
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    </Grid>
    </Grid>
    </div>
  );
}
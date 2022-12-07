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
import TrackSearch from './TrackSearch';
import NavBar from './NavBar';
import { useState } from 'react';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { useEffect } from 'react';
import Slider from '@mui/material/Slider';

const theme = createTheme();
let options = []

export default function RateList() {
  const navigate = useNavigate();
  const [rating, setRating] = useState('5')
  const [description, setDescription] = useState('');
  const [value, setValue] = useState(options[0]);
  const [inputValue, setInputValue] = useState('');
  

  useEffect(() => {
    fetch('/lists/getAll/')
    .then((res) => res.json())
    .then((data) => {
      for(let x = 0; x < data.length; x++){
        options[x] = data[x].list_title
      }
    })
  }, [])
  
  const handleSubmit = (event) => {
   event.preventDefault()
   const inputData = new FormData(event.currentTarget);
   let formDataObject = Object.fromEntries(inputData.entries());
   formDataObject.rating = rating
   let formDataString = JSON.stringify(formDataObject)

   if(formDataObject.description.length === 0){
    alert("Must Add Description to Rating")
   } else {
    fetch('/lists/addRating/' + value, {
      method: 'PUT',
      headers: { "Content-type": "application/json", "Accept": "application.json"},
      body: formDataString
    })
    .then((res) => res.json())
    .then((data) => {
      if(data.success === "false"){
        alert(data.msg)
      } else {
        navigate("/playlists", {replace: true})
      }
    })
   }

  
  };

  const saveDescription = (event) => {
    const value = event.target.value
    setDescription(value)
  }

  function valuetext(value) {
    return `${value}`;
  }

  return (
    <div>
    <NavBar />
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
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
            Rate List
          </Typography>
          <Typography component="h1" variant="body1" paddingTop={'20px'} paddingBottom={'10px'}>
            Add a Rating To Desired List
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                <Autocomplete
                  fullWidth
                  disablePortal
                  value={value}
                  onChange={(event, newValue) => {
                  setValue(newValue);
                  window.localStorage.setItem("list_title", newValue)
                  }}
                  inputValue={inputValue}
                  onInputChange={(event, newInputValue) => {
                  setInputValue(newInputValue);
                  }}
                  id="controllable-states-demo"
                  options={options}
                  sx={{ width: 300 }}
                  renderInput={(params) => <TextField {...params} label="Select List Below" />}
                />
                </Grid>
                <Grid item xs={12}>
              </Grid>
              <Grid item xs={12}>
                <Typography id="input-slider" gutterBottom>
                    Rating:
                </Typography>
                <Slider
                    aria-label="Rating"
                    defaultValue={5}
                    getAriaValueText={valuetext}
                    valueLabelDisplay="auto"
                    step={1}
                    min={0}
                    max={10}
                    onChange={(event, newRatingValue) => {
                        setRating(newRatingValue);
                    }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="description"
                  label="Description "
                  name="description"
                  onInput={saveDescription}
                  inputProps={{maxLength:50}}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add Rating
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
    </div>
  );
}
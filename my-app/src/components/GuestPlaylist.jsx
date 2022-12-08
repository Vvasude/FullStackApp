import React, { useEffect } from "react";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import NavBar from './NavBar'
import HomeTrackSearch from './HomeTrackSearch'
import HomeListSearch from './HomeListSearch'
import { useNavigate } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function GuestPlaylist() {
    const navigate = useNavigate();

    useEffect(() => {
        let loginStatus = atob(window.localStorage.getItem("auth"))
        if(loginStatus === "true"){
            navigate("/auth/playlists")
        }
    }, [])

  return (
    <div>
    <NavBar />
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <HomeTrackSearch />
        </Grid>
        <Grid item xs={6}>
          <HomeListSearch />
        </Grid>
      </Grid>
    </Box>
    </div>
  );
}
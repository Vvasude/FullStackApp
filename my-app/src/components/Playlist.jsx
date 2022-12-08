import React, { useEffect } from "react";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import NavBar from './NavBar'
import TrackSearch from './TrackSearch'
import ListSearch from './ListSearch'
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RateReviewIcon from '@mui/icons-material/RateReview';
import { DeleteList } from '.';
import { useNavigate } from 'react-router-dom';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Playlist() {
  const navigate = useNavigate();

    useEffect(() => {
        let loginStatus = atob(window.localStorage.getItem("auth"))
        if(loginStatus === "false"){
            navigate("/playlists")
        }
    }, [])
  return (
    <div>
    <NavBar />
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={5.5}>
          <TrackSearch />
        </Grid>
        <Grid item xs={4.5}>
          <ListSearch />
        </Grid>
        <Grid item xs={2} >
          <Button variant="contained" href="createlist" endIcon={<AddIcon />} fullWidth>
          Create List
          </Button>
          <Button variant="contained" href="updatelist" endIcon={<EditIcon />} fullWidth>
          Edit List
          </Button>
          <DeleteList />
          <Button variant="contained" href="ratelist" endIcon={<RateReviewIcon />} fullWidth>
          Rate Playlist
          </Button>
      </Grid>
      </Grid>
    </Box>
    </div>
  );
}
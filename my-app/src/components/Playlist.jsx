import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import NavBar from './NavBar'
import TrackSearch from './TrackSearch'
import ListSearch from './ListSearch'
import CreateList from './CreateList';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Playlist() {
  return (
    <div>
    <NavBar />
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={5}>
          <TrackSearch />
        </Grid>
        <Grid item xs={5}>
          <ListSearch />
        </Grid>
        <Grid item xs={2} justifyContent="flex-end" alignItems="center">
            <CreateList />
        </Grid>
      </Grid>
    </Box>
    </div>
  );
}
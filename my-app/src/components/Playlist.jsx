import react from 'react'
import NavBar from './NavBar'
import { Typography } from '@mui/material';
import List from './List'


const Playlist = () => {

    return (
        <div className="test">
        <NavBar />
        <Typography variant='h3' paddingBottom={0}>
            Your Playlists
        </Typography>
        <List />
        </div>
    )
}

export default Playlist
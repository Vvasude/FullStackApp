import react from 'react'
import NavBar from './NavBar'
import { Typography } from '@mui/material';


const Playlist = () => {

    return (
        <div className="test">
        <NavBar />
        <Typography variant='h3' paddingBottom={2}>
            Your Playlists
        </Typography>
        </div>
    )
}

export default Playlist
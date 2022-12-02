import react from 'react'
import NavBar from './NavBar'
import { Typography } from '@mui/material';
import List from './List'
import FormDialog from './FormDialog';


const Playlist = () => {

    return (
        <div className="test">
        <NavBar />
        <Typography variant='h3' paddingBottom={0}>
            Your Playlists
        </Typography>
        <FormDialog />
        <List />
        </div>
    )
}

export default Playlist
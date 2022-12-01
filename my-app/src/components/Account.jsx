import react from 'react'
import NavBar from './NavBar'
import { Typography } from '@mui/material';


const Account = () => {

    return (
        <div className="test">
        <NavBar />
        <Typography variant='h3' paddingBottom={2}>
            Account Dashboard
        </Typography>
        </div>
    )
}

export default Account
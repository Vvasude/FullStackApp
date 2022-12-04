import { Button, Typography } from '@mui/material';
import React from 'react'
import AboutUs from './AboutUs';
import NavBar from './NavBar'

const Home = () => {
    const testFetch = () => {
        const element = this.input
        console.log(element)

    }

    return (
        <div className="test">
            <NavBar />
            <Typography variant='h3' paddingBottom={2}>
                <AboutUs />
            </Typography>
            <Button onClick={testFetch}>Test</Button>
        </div>
    )
}

export default Home
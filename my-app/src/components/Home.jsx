import { Button, Typography } from '@mui/material';
import React from 'react'
import NavBar from './NavBar'
import StickyFooter from './StickyFooter';

const Home = () => {
    const testFetch = () => {
        fetch('/genres/getAll')
        .then((res) => res.json())
        .then((data) => { 
        alert(JSON.stringify(data))
    })
}

    return (
        <div className="test">
        <NavBar />
        <Typography variant='h3' paddingBottom={2}>
            Hello World
        </Typography>
        <button onClick={testFetch}>Hello World</button>
        <StickyFooter />
        </div>
    )
}

export default Home
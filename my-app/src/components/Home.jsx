import { Button } from '@mui/material';
import { Button } from '@mui/material';
import React from 'react'

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
        <button onClick={testFetch}>Hello World</button>
        </div>
    )
}

export default Home




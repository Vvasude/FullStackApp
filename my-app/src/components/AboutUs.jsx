import React from 'react'
import Button from '@mui/material/Button';

import { Typography } from '@mui/material';
import './startPage.css'

export default function AboutUs() {
    const userEmail = atob(window.localStorage.getItem("profile"))

    return (
        <div className="test" text-align="center">
            <Button variant="contained" href="login">
                    Go to Login Page
                </Button>
            <Typography>
                Logged In As: {userEmail}
            </Typography>
            <div className="about-section">
                <h1>About Us</h1>
                <p>Online Full Stack MusicApp</p>
                <p>Resizable.Simple.Easy to use.</p>
            </div>
            <h2 style={{ textAlign: "center" }}>Who We Are</h2>
            <div className="row">
                <div className="column">
                    <div className="card">

                        <div className="container">
                            <h2>Thibesan Raveenderan</h2>
                            <p className="title">Backend Developer</p>
                            <p>Loves JDM Cars</p>
                            <p>jane@example.com</p>

                        </div>
                    </div>
                </div>

                <div className="column">
                    <div className="card">

                        <div className="container">
                            <h2>Varnesh Vasudevan</h2>
                            <p className="title">Front End Developer</p>
                            <p>Loves his mom</p>
                            <p>mike@example.com</p>

                        </div>
                    </div>
                </div>

                <div className="column">
                    <div className="card">

                        <div className="container">
                            <h2>Moon</h2>
                            <p className="title">Designer</p>
                            <p>Likes 3316 with a passion</p>
                            <p>john@example.com</p>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


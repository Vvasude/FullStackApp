import React from 'react'

import { Typography } from '@mui/material';
import './startPage.css'

export default function AboutUs() {

    return (
        <div className="test">
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
                            <h2>Visindu Biyanwila</h2>
                            <p className="title">Designer</p>
                            <p>Also loves JDM cars</p>
                            <p>john@example.com</p>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


import React from 'react'
import NavBar from './NavBar'
import { Typography } from '@mui/material';

const clearSearch = () => {
    const ul = document.getElementById('tracklist')
    //Remove All Child Elements from prev. Search before fetching new search 
    while (ul.firstChild) {
        ul.removeChild(ul.firstChild)
    }

    Admin();
}

function Admin() {
    var trackArr = [];
    const ul = document.getElementById('tracklist');
    ul.innerHtml = "";

    fetch('/users/getAll')
        .then((res) => res.json())
        .then((data) => {
            trackArr.push(data);
            JSON.stringify(trackArr);
            for (var i = 0; i < trackArr[0].length; i++) {
                var li = document.createElement("li");
                ul.appendChild(li);

                var trackDescription = [
                    "Name: " + trackArr[0][i].name,
                    "Email: " + trackArr[0][i].email,
                    "Role: " + trackArr[0][i].role,
                ];

                for (var j = 0; j < trackDescription.length; j++) {
                    li.appendChild(document.createTextNode(trackDescription[j]));
                    li.style.display = "";
                    li.appendChild(document.createElement("br"));
                }
            }
        });
}

const Account = () => {

    if (window.localStorage.getItem("role") == "admin") {
        console.log("Is Admin");
        return (

            <div className="test">
                <NavBar />
                <Typography variant='h3' paddingBottom={2}>
                    Admin Account
                </Typography>
                <button variant="contained" onClick={clearSearch}>See Users</button>

                <ul id="tracklist"></ul>
            </div>
        )

    } else {
        return (
            <div className="test">
                <NavBar />
                <Typography variant='h3' paddingBottom={2}>
                    Account Dashboard
                </Typography>
            </div>
        )
    }

}

export default Account
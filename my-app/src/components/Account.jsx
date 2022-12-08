import React from 'react'
import NavBar from './NavBar'
import { Typography } from '@mui/material';
import TrackSearch from './TrackSearch';

const clearSearch = () => {
    const ul = document.getElementById('tracklist')
    //Remove All Child Elements from prev. Search before fetching new search 
    while (ul.firstChild) {
        ul.removeChild(ul.firstChild)
    }

    Admin();
}

const clearSearch2 = () => {
    const ul = document.getElementById('tracklist')
    //Remove All Child Elements from prev. Search before fetching new search 
    while (ul.firstChild) {
        ul.removeChild(ul.firstChild)
    }

    Rating();
}

function Admin() {
    //Grabbing Gmail Authentication Users
    var userArr = [];
    const ul = document.getElementById('tracklist');
    ul.innerHtml = "";

    fetch('/users/getAll')
        .then((res) => res.json())
        .then((data) => {
            userArr.push(data);
            JSON.stringify(userArr);
            for (var i = 0; i < userArr[0].length; i++) {
                var li = document.createElement("li");
                ul.appendChild(li);

                //Populates array with user info
                var userDescription = [
                    "Name: " + userArr[0][i].name,
                    "Email: " + userArr[0][i].email,
                    "Role: " + userArr[0][i].role,
                    "Account Type: Google"
                ];
                
                for (var j = 0; j < userDescription.length; j++) {
                    li.appendChild(document.createTextNode(userDescription[j]));
                    li.style.display = "";
                    li.appendChild(document.createElement("br"));    
                }
            
            }  
        });

    //Grabbing Local JWT Authentication Users
    var localUserArr = [];

    fetch('/localUsers/getAll')
    .then((res) => res.json())
    .then((data) => {
        localUserArr.push(data);
        JSON.stringify(localUserArr);
        for (var i = 0; i < localUserArr[0].length; i++) {
            var li = document.createElement("li");
            ul.appendChild(li);

            //Populates array with user info
            var userDescription = [
                "Name: " + localUserArr[0][i].name,
                "Email: " + localUserArr[0][i].email,
                "Role: " + localUserArr[0][i].role,
                "Account Type: Local"
            ];
          

            for (var j = 0; j < userDescription.length; j++) {
                li.appendChild(document.createTextNode(userDescription[j]));
                li.style.display = "";
                li.appendChild(document.createElement("br"));     
            }
        }  
    });
}

function Rating() {
    var trackArr = [];
    const ul = document.getElementById('tracklist');
    ul.innerHtml = "";

    fetch('/lists/getAll')
        .then((res) => res.json())
        .then((data) => {
            trackArr.push(data);
            JSON.stringify(trackArr);
            for (var i = 0; i < trackArr[0].length; i++) {
                var li = document.createElement("li");
                ul.appendChild(li);

                var trackDescription = [
                    "Rating: " + trackArr[0][i].rating,

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

    if (atob(window.localStorage.getItem("role")) == "admin") {
        return (

            <div className="test">
                <NavBar />
                <Typography variant='h3' paddingBottom={2}>
                    Admin Account
                </Typography>
                <button variant="contained" onClick={clearSearch}>See Users</button>
                <button variant="contained" onClick={clearSearch2}>See Ratings</button>
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
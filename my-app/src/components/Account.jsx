import React from 'react'
import NavBar from './NavBar'
import { Typography } from '@mui/material';


//method that clears the search
const clearSearch = () => {
    const ul = document.getElementById('tracklist')
    //Remove All Child Elements from prev. Search before fetching new search 
    while (ul.firstChild) {
        ul.removeChild(ul.firstChild)
    }

    Admin();
}

//method that clears the search for the tracklist ul
const clearSearch2 = () => {
    const ul = document.getElementById('tracklist')
    //Remove All Child Elements from prev. Search before fetching new search 
    while (ul.firstChild) {
        ul.removeChild(ul.firstChild)
    }

    Rating();
}

//function for Admin users
function Admin() {
    //Grabbing Gmail Authentication Users
    var userArr = [];
    const ul = document.getElementById('tracklist');
    ul.innerHtml = "";

    //fetch function that takes the 
    //users api route and retrieves all specified fields
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

                //loops though array and create textnode to ul
                for (var j = 0; j < userDescription.length; j++) {
                    li.appendChild(document.createTextNode(userDescription[j]));
                    li.style.display = "";
                    li.appendChild(document.createElement("br"));
                }
            }
        });
}

//function for Ratings
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
                //loop through array and add elements to ul
                for (var j = 0; j < trackDescription.length; j++) {
                    li.appendChild(document.createTextNode(trackDescription[j]));
                    li.style.display = "";
                    li.appendChild(document.createElement("br"));
                }
            }
        });
}

//account function
const Account = () => {
    //logical if statement that checks if active user is 
    //an admin or not
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
        //else give unathenticated user privlieges
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
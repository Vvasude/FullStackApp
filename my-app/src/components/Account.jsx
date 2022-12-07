import react from 'react'
import NavBar from './NavBar'
import { Typography } from '@mui/material';
import { storage } from '../config/firebase.config';

const clearSearch = () => {
    const ul = document.getElementById('tracklist')
    //Remove All Child Elements from prev. Search before fetching new search 
    while (ul.firstChild) {
        ul.removeChild(ul.firstChild)
    }

    Admin();
}

function Admin() {
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

                var userDescription = [
                    "Name: " + userArr[0][i].name,
                    "Email: " + userArr[0][i].email,
                    "Role: " + userArr[0][i].role,
                    "Created: Website Sign-in"
                ];
                let button = ul.appendChild(document.createElement("button"));
                button.value = userArr[0][i].role;
                button.innerHTML = button.value;
                button.addEventListener("click", (e) => 
                {
                  console.log(button.value); 
                
                }
                 )

                for (var j = 0; j < userDescription.length; j++) {
                    li.appendChild(document.createTextNode(userDescription[j]));
                    li.style.display = "";
                    li.appendChild(document.createElement("br"));     
                }
            }  
        });

    var localUserArr = [];

    fetch('/localUsers/getAll')
    .then((res) => res.json())
    .then((data) => {
        localUserArr.push(data);
        JSON.stringify(localUserArr);
        for (var i = 0; i < localUserArr[0].length; i++) {
            var li = document.createElement("li");
            ul.appendChild(li);

            var userDescription = [
                "Name: " + localUserArr[0][i].name,
                "Email: " + localUserArr[0][i].email,
                "Role: " + localUserArr[0][i].role,
                "Created: Google Sign-in"
            ];
            let button = ul.appendChild(document.createElement("button"));
            button.value = localUserArr[0][i].role;
            button.innerHTML = button.value;
            button.addEventListener("click", (e) => 
            {
              console.log(button.value); 
            
            }
             )

            for (var j = 0; j < userDescription.length; j++) {
                li.appendChild(document.createTextNode(userDescription[j]));
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
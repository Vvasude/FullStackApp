import react from 'react'
import NavBar from './NavBar'
import { Typography } from '@mui/material';

function Admin() {
    var trackArr = [];
    const ul = document.getElementById('tracklist');
    ul.innerHtml = "";

    fetch('/tracks/getAll')
        .then((res) => res.json())
        .then((data) => {
            trackArr.push(data);
            JSON.stringify(trackArr);
            for (var i = 0; i < trackArr[0].length; i++) {
                var li = document.createElement("li");
                ul.appendChild(li);

                var trackDescription = [
                    "ID: " + trackArr[0][i].track_id,
                    "Track: " + trackArr[0][i].track_title,
                    "By: " + trackArr[0][i].artist_name,
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
                <button onClick={Admin}>See Users</button>
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
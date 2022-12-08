import React from "react"
import "./style.css"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState } from "react";
import { useEffect } from "react";


var selectedTracks = [];
var allSearchTracks = [];

export default function HomeTrackSearch() {
      //Setting Form Variables to Update with UseState
    const [inputValue, setInputValue] = useState('')

    //Clear Search Upon Searching Again
    const clearSearch = () => {
        const ul = document.getElementById('tracklist')
        //Remove All Child Elements from prev. Search before fetching new search 
        while(ul.firstChild){ 
            ul.removeChild(ul.firstChild)
        }

        fetchTracks();
    }
    //Function to fetch search request and display results accordingly
    const fetchTracks = () => {
        let input = inputValue;
        if(input.length == 0){
            alert("Invalid Search Query")
        }
        var trackArr = [];
        const ul = document.getElementById('tracklist');
        ul.innerHtml = "";

        fetch('/tracks/search/' + input)
            .then((res) => res.json())
            .then((data) => {
                trackArr.push(data);
                JSON.stringify(trackArr);
                for (var i = 0; i < trackArr[0].length; i++) {
                    var li = document.createElement("li");
                    ul.appendChild(li);

                    //Array holding track description for each result
                    var trackDescription = [
                        "ID: " + trackArr[0][i].track_id,
                        "Track: " + trackArr[0][i].track_title,
                        "By: " + trackArr[0][i].artist_name,
                        "Year: " + trackArr[0][i].track_date_recorded,
                        "Duration: " + trackArr[0][i].track_duration
                    ];

                    let trackTitle = trackArr[0][i].track_title
                    let ytStringArr = trackTitle.split(' ')
                    let searchURL = ytStringArr.join('+')
                    let str = searchURL.replace(/\s/g, '');

                    for (var j = 0; j < trackDescription.length; j++) {
                        li.appendChild(document.createTextNode(trackDescription[j]));
                        li.style.display = "";
                        li.appendChild(document.createElement("br"));
                    }

                    let inpt = li.appendChild(document.
                        createElement("INPUT"));
                    inpt.type = "image"
                    inpt.src = "https://variety.com/wp-content/uploads/2020/06/youtube-logo.png?w=681&h=383&crop=1"
                    inpt.style.width = '100px';
                    inpt.style.height = '50px';
                    inpt.style.borderRadius = '5px'
                    inpt.style.display = 'inline-block'
                    inpt.stringURL = str //Set btm params to be used in arrow function
                    inpt.addEventListener("click", (e) => { //Search on Youtube
                        let str = e.currentTarget.stringURL;
                        window.open("https://www.youtube.com/results?search_query=" + str, '_blank', 'noopener,noreferrer')
                    });
                }
            });
        }
    
    return (
        <div>
            <TextField 
                id="standard-basic" 
                label="Search Tracks" 
                variant="standard" 
                onChange={(e) => setInputValue(e.target.value)}
                inputProps={{maxLength: 40}}
            />            
            <Button variant="contained" onClick={clearSearch}>Search</Button>
            {/* Button to start dynamic add /}
            {/ Dynamically add list */}
            <ul id="tracklist"></ul>
        </div>
    )
}
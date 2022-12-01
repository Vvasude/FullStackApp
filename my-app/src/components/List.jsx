import React from "react"
import NavBar from "./NavBar";
import { Link } from 'react-router-dom';
import "./style.css"

export default function List() {

    const testFetch = () => {
        let input = document.getElementById('trackSearch').value;
        var arr = [];
        const ul = document.getElementById('playlist');
        ul.innerHtml = "";
        fetch('/tracks/search/' + input)
            .then((res) => res.json())
            .then((data) => {
                arr.push(data);
                JSON.stringify(arr);
                console.log(arr);
                for (var i = 0; i < arr[0].length; i++) {
                    var li = document.createElement("li");
                    ul.appendChild(li);

                    var trackDescription = [
                        "Track: " + arr[0][i].track_title,
                        "Artist: " + arr[0][i].artist_name,
                    ];

                    for (var j = 0; j < trackDescription.length; j++) {
                        li.appendChild(document.createTextNode(trackDescription[j]));
                        li.style.display = "";
                        li.appendChild(document.createElement("br"));
                    }
                    let btn = li.appendChild(document.
                        createElement("BUTTON"));
                    btn.innerHTML = "Play on Youtube";
                    btn.addEventListener("click", () => {
                        console.log('clicked');
                    });


                    li.appendChild(document.createElement("br"));

                }
            });
    }
    return (
        <div className="test">
            <NavBar />
            <input type="text" id="trackSearch" placeholder="Search" /><button id="button" onClick={testFetch}>Search
            </button>
            {/* Button to start dynamic add */}
            {/* Dynamically add list */}
            <ul id="playlist"></ul>
        </div>
    )
}
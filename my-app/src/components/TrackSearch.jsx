import React from "react"
import "./style.css"

var selectedTracks = [];
var allSearchTracks = [];

export default function TrackSearch() {
    const updateSelection = () => {
        let selectedTracks = []; //Clear Selected
        let ul = document.getElementById('tracklist');
        let boxes = ul.getElementsByTagName("INPUT");
        //Pull Ticked Values
        for(let x = 0; x < boxes.length; x++){
            if(boxes[x].checked) {
                selectedTracks.push(boxes[x].value)
            }
        }
        //Remove Dupes
        allSearchTracks = [...new Set(selectedTracks)]
        console.log(allSearchTracks)
    }

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
        let input = document.getElementById('trackSearch').value;
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

                    var trackDescription = [
                        "ID: " + trackArr[0][i].track_id,
                        "Track: " + trackArr[0][i].track_title,
                        "By: " + trackArr[0][i].artist_name,
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

                    let checkBox = ul.appendChild(document.createElement("INPUT"))
                    checkBox.type = "checkbox";
                    checkBox.id = "tick";
                    checkBox.value = trackArr[0][i].track_id;

                    let p = ul.appendChild(document.createElement("p"))
                    p.innerHTML = "Add to Playlist: "
                    p.appendChild(checkBox)

                    let inpt = li.appendChild(document.
                        createElement("INPUT"));
                    inpt.type = "image"
                    inpt.src = "https://variety.com/wp-content/uploads/2020/06/youtube-logo.png?w=681&h=383&crop=1"
                    inpt.style.width = '100px';
                    inpt.style.height = '50px';
                    inpt.style.borderRadius = '5px'
                    inpt.stringURL = str //Set btm params to be used in arrow function
                    inpt.addEventListener("click", (e) => { //Search on Youtube
                        let str = e.currentTarget.stringURL;
                        window.open("https://www.youtube.com/results?search_query=" + str, '_blank', 'noopener,noreferrer')
                    });


                    li.appendChild(document.createElement("br"));

                }
            });
        }
    
    return (
        <div>
            <input type="text" id="trackSearch" placeholder="Search Tracks" />
            <button 
            id="button" 
            onClick={clearSearch}
            >
                Search
            </button>
            <button onClick={updateSelection}>Confirm Selected Tracks</button>
            {/* Button to start dynamic add /}
            {/ Dynamically add list */}
            <ul id="tracklist"></ul>
        </div>
    )
}
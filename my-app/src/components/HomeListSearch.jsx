import React from 'react'
import Button from '@mui/material/Button'

export default function HomeListSearch() {
    //Clear Search Upon Searching Again
    const clearSearch = () => {
        const ul = document.getElementById('playlist')
        //Remove All Child Elements from prev. Search before fetching new search 
        while(ul.firstChild){ 
            ul.removeChild(ul.firstChild)
        }

        fetchLists();
    }
    //Fetch List Data based on Search Query
    const fetchLists = () => {
        var listArr = []
        const ul = document.getElementById('playlist')
        ul.innerhtml = ""

        fetch('/lists/getLimitPublic/')
        .then((res) => res.json())
        .then((data) => {
            listArr.push(data)
            JSON.stringify(listArr);
            console.log(listArr)
            for (let i = 0; i < listArr[0].length; i++){
                var li = document.createElement("li") //Add listitem for each track in search reuslt
                ul.appendChild(li)

                //Array holding description for each list
                //With respective formatting
                var listDescription = [
                    "Name: " + listArr[0][i].list_title,
                    "Saved Tracks: " + listArr[0][i].list_trackIDS,
                    "description: " + listArr[0][i].description,
                ]

                for (var j = 0; j < listDescription.length; j++){
                    li.appendChild(document.createTextNode(listDescription[j]));
                    li.style.display = "";
                    li.appendChild(document.createElement("br"))
                }
            }
        })
    }

    return (
        <div>
            <Button variant="contained" onClick={clearSearch}>View Lists</Button>
            <ul id="playlist"></ul>
        </div>
    )
}
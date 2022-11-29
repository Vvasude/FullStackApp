import React from 'react'
import NavBar from "./NavBar";



const Home = () => {
    const testFetch = () => {
        fetch('/genres/getAll')
            .then((res) => res.json())
            .then((data) => {
                alert(JSON.stringify(data))
            })
    }

    return (
        <div className='test'>
            <NavBar />
            <button onClick={testFetch}>Hello World</button>
            <h2>Playlist</h2>
            <ul><li>PlayList 1:</li></ul>
        </div>
    )
}

export default Home





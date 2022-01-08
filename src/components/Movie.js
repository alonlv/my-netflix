import { setData, setState } from 'react'
import { useState, useEffect } from 'react';
import React from 'react';
import DataShit from './DataShit';
import ReactDOM from 'react-dom'


function UpdateDB(Movie) { // chnge name
    // Simple POST request with a JSON body using fetch
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Movie)
    };

    fetch('/toggleMovie', requestOptions)
        .then(response => response.json());
    //.then(data => setData(data));
    window.location.reload();
}


async function fetchMovieData(setData, imdbID) {
    const DataDiv = document.getElementById(imdbID)
    if (DataDiv.children.length == 0) {
        const response = await fetch(`http://www.omdbapi.com/?i=` + imdbID + `&apikey=63f983f4`);
        const MovieData = await response.json();
        if (MovieData["Response"] == "True") {
            setData(MovieData)
        }
        else {
            if (MovieData["Error"] == "Movie not found!") {
                setData([])
            }
        }
        ReactDOM.render(<DataShit movieData={MovieData} />, DataDiv);
        return
    }
    DataDiv.hidden = !DataDiv.hidden
    return
}


function Movie(props) {
    const Movie = props.movie
    const [MovieData, setData] = useState()

    return (
        <div className="d-flex justify-content-start m-3" id="movie">
            <div>
                <a href={"https://www.imdb.com/title/" + Movie.imdbID}>
                    <img src={Movie.Poster} alt="Poster" height="600" className="movie_poster"></img>
                </a>
                <center> {Movie.Title} ({Movie.Year})
                    <br></br>
                    <button onClick={() => UpdateDB(Movie)}>Add/Remove as Favorite</button>
                    <button onClick={() => fetchMovieData(setData, Movie.imdbID)}>More Data</button>
                </center>
            </div>
            <div id={Movie.imdbID}>

            </div>
        </div>


    );
}
export default Movie;
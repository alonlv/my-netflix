import { setData, setState } from 'react'
import React from 'react';

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


function Movie(props) {
    const Movie = props.movie

    return (
        <div className="d-flex justify-content-start m-3" id="movie">
            <div>
                <a href={"https://www.imdb.com/title/" + Movie.imdbID}>
                    <img src={Movie.Poster} alt="Poster" height="600" className="movie_poster"></img>
                </a>
                <center> {Movie.Title} ({Movie.Year})
                <br></br>
                <button onClick={()=>UpdateDB(Movie)}>Add/Remove as Favorite</button>
                </center>
            </div>
        </div>


    );
}
export default Movie;
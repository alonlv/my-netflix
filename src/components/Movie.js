import { setData, setState } from 'react'
import { useState, useEffect } from 'react';
import React from 'react';
import DataSheet from './DataSheet';
import ReactDOM from 'react-dom'
import notFavoriteIcon from '../Img/not-favorite-icon.png';
import favoriteIcon from '../Img/favorite-icon.png';

function UpdateDB(Movie) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Movie)
    };
    fetch('/toggleMovie', requestOptions)
        .then(response => response.json());

    //window.location.reload();
}

async function fetchMovieData(imdbID) {
    const DataDiv = document.getElementById(imdbID)
    if (DataDiv.children.length == 0) {
        const response = await fetch(`http://www.omdbapi.com/?i=` + imdbID + `&apikey=63f983f4`);
        const MovieData = await response.json();
        ReactDOM.render(<DataSheet movieData={MovieData} />, DataDiv);
        return
    }
    DataDiv.hidden = !DataDiv.hidden
    return
}

function Movie(props) {
    const Movie = props.movie
    //const Favorite = props.Favorite
    const [Favorite = props.Favorite, setData] = useState()

    return (
        <div className="d-flex justify-content-start m-3" id="movie">
            <div>
                <a onClick={() => fetchMovieData(Movie.imdbID)}>
                    <img src={Movie.Poster} alt="Poster" height="600" className="movie_poster"></img>
                </a>
                <center> {Movie.Title} ({Movie.Year})
                    <img onClick={() => UpdateDB(Movie)} src={Favorite ? favoriteIcon : notFavoriteIcon} alt="IsFavorite" className="icon"></img>
                </center>
            </div>
            <div id={Movie.imdbID}>

            </div>
        </div>


    );
}
export default Movie;
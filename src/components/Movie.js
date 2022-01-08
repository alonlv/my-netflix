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
    window.location.reload();
}

async function fetchMovieData(setData, imdbID, ListType) {
    const DataDiv = document.getElementById(imdbID + ListType)
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
        ReactDOM.render(<DataSheet movieData={MovieData} />, DataDiv);
        return
    }
    DataDiv.hidden = !DataDiv.hidden
    return
}

function Movie(props) {
    const Movie = props.movie
    const Favorite = props.Favorite
    const ListType = props.ListType
    const [MovieData, setData] = useState()

    return (
        <div className="d-flex justify-content-start m-3" id="movie">
            <div>
                <a onClick={() => fetchMovieData(setData, Movie.imdbID, ListType)}>
                    <img src={Movie.Poster} alt="Poster" height="600" className="movie_poster"></img>
                </a>
                <center> {Movie.Title} ({Movie.Year})
                    <a onClick={() => fetchMovieData(setData,Movie.imdbID, ListType )}> </a>
                    <img onClick={() => UpdateDB(Movie)} src={Favorite ? favoriteIcon : notFavoriteIcon} alt="IsFavorite" className="icon"></img>
                </center>
            </div>
            <div id={Movie.imdbID + ListType}>

            </div>
        </div>


    );
}
export default Movie;
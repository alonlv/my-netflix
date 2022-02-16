import React from 'react';
import DataSheet from './DataSheet';
import ReactDOM from 'react-dom'
import notFavoriteIcon from '../Img/not-favorite-icon.png';
import favoriteIcon from '../Img/favorite-icon.png';

function UpdateDB(Movie, favorite) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Movie)
    };
    fetch('/toggleMovie', requestOptions)
        .then(response => response.json());
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

function ToggleFavoriteImg(Movie, Favorite) {
    const ImgIsFavorite = document.getElementById("IsFavorite"+Movie.imdbID);
    const ImgIsNotFavorite = document.getElementById("IsNotFavorite"+Movie.imdbID);
    ImgIsFavorite.hidden = !ImgIsFavorite.hidden;
    ImgIsNotFavorite.hidden = !ImgIsNotFavorite.hidden;
    UpdateDB(Movie, Favorite);
}

function Movie(props) {
    const Movie = props.movie
    let Favorite = props.Favorite;
    return (
        <div className="d-flex justify-content-start m-3" id="movie">
            <div>
                <a onClick={() => fetchMovieData(Movie.imdbID)}>
                    <img src={Movie.Poster} alt="Poster" height="600" className="movie_poster"></img>
                </a>
                <center> {Movie.Title} ({Movie.Year})
                    <div id={Movie.imdbID + "Img"}>
                        <img id={"IsFavorite"+Movie.imdbID} onClick={() => ToggleFavoriteImg(Movie, Favorite)} src={favoriteIcon} alt="IsFavorite" className="icon" hidden={!Favorite}></img>
                        <img id={"IsNotFavorite"+Movie.imdbID} onClick={() => ToggleFavoriteImg(Movie, Favorite)} src={notFavoriteIcon} alt="IsNotFavorite" className="icon" hidden={Favorite}></img>
                    </div>
                </center>
            </div>
            <div id={Movie.imdbID}>

            </div>
        </div>


    );
}
export default Movie;
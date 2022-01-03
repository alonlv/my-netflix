import { useState } from 'react'

function Movie(props) {
    const Movie = props.movie
    const Liked = props.liked

    return (
        <div className="d-flex justify-content-start m-3" id="movie">
            <div>
                <a href={"https://www.imdb.com/title/" + Movie.imdbID}>
                    <img src={Movie.Poster} alt="Poster" height="600" className="movie_poster"></img>
                </a>
                <center> {Movie.Title} ({Movie.Year}) </center>
                <form method='POST' action='toggleMovie'>
                    <input type="text" name="Title" hidden="true" value={Movie.Title}></input>
                    <input type="text" name="imdbID" hidden="true" value={Movie.imdbID}></input>
                    <input type="text" name="Poster" hidden="true" value={Movie.Poster}></input>
                    <input type="text" name="Year" hidden="true" value={Movie.Year}></input>
                    <input type="submit" value="Add/Remove as Favorite"></input>
                </form>
            </div>
        </div>


    );
}
export default Movie;
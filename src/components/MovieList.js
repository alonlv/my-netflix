import { useState } from 'react'
import Movie from './Movie';


function MovieList(props) {
    const Movies = props.MovieList
    const FavoriteList = props.FavoriteList

    return (
        <div className="container-fluid movie-app">
            <div className="row">
                {Movies.map((x) => <Movie movie={x} Favorite={FavoriteList.includes(x["imdbID"])} />)}
            </div>
        </div>
    );

}
export default MovieList;
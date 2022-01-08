import { useState } from 'react'
import Movie from './Movie';


function MovieList(props) {
    const Movies = props.MovieList
    const FavoriteList = props.FavoriteList
    const ListType = props.ListType

    return (
        <div className="container-fluid movie-app">
            <div className="row">
                {Movies.map((x) => <Movie movie={x} ListType={ListType} Favorite={FavoriteList.includes(x["imdbID"])} />)}
            </div>
        </div>
    );

}
export default MovieList;
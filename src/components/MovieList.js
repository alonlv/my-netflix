import {useState} from 'react'
import Movie from './Movie';

function MovieList(props){
    const Movies = props.MovieList
    const Likedlist = props.likedlist
    return(
        <div className="container-fluid movie-app">
            <div className="row">
                {Movies.map((x)=> <Movie movie={x}/>)}
            </div>
        </div>
    );

    }
export default MovieList;
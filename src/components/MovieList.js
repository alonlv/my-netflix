import Movie from './Movie';

function MovieList(props) {
    const Movies = props.MovieList;
    const FavoriteList = props.FavoriteList;
    const ShowList = props.ShowList;

    return (
        <div className="container-fluid movie-app">
            <div className="row">
                {Movies.map((x) => <Movie movie={x} showList={ShowList} favorite={FavoriteList.includes(x["imdbID"])} />)}
            </div>
        </div>
    );

}
export default MovieList;
import SearchBox from './components/SearchBox';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './components/Header';
import MovieList from './components/MovieList';
import { useState, useEffect } from 'react';


// Fetch data Data From SQLlite local server
async function FetchMovies(setData, search) {
  useEffect(() => {
    async function fetchMoviesList() {
      const response = await fetch(`http://www.omdbapi.com/?s="` + search + `"&apikey=63f983f4`);
      const data = await response.json();
      if (data["Response"] == "True") {
        setData(data["Search"])
      }
      else {
        if (data["Error"] == "Movie not found!") {
          setData([])
        }
      }
      return
    } fetchMoviesList()
  }, [search])
}


// Fetch Favorite Data From SQLlite local server
async function FetchFavoriteData(setFavoriteData) {
  useEffect(() => {
    async function fetchfavoriteMoviesList() {
      const response = await fetch(`http://localhost//GetFavorites`);
      const data = await response.json();
      setFavoriteData(data["Search"])
      return
    } fetchfavoriteMoviesList()
  }, [])
}

function liked(FavoriteList) {
  const liked_list = []
  for (let movie in FavoriteList) {
    liked_list.add(movie.imdbID)
  }
  return liked_list
}

function App() {
  const [search, setText] = useState("Batman")
  const [MoviesList, setData] = useState([])
  const [MyFavorite, setFavoriteData] = useState([])
  FetchFavoriteData(setFavoriteData)
  FetchMovies(setData, search)

  return (
    <div>
      <br></br>
      <center>
        <SearchBox search={setText} />
        <Header header="Search result:" />
        <MovieList MovieList={MoviesList} FavoriteList={MyFavorite.map((x) => x["imdbID"])} />
        <Header header="My Favorites:" />
        <MovieList MovieList={MyFavorite} FavoriteList={MyFavorite.map((x) => x["imdbID"])} />
      </center>
    </div>
  );
}

export default App;

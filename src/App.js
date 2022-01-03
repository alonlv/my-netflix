import SearchBox from './components/SearchBox';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import Header from './components/Header';
import { useState, useEffect } from 'react';


// Fetch data Data From SQLlite local server
async function FetchData(setData, search) {
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

function liked(FavoriteList){
  const liked_list = []
  for (let movie in FavoriteList)
  {
    liked_list.add(movie.imdbID)
  }
  return liked_list
}

function App() {
  const [search, setText] = useState("Batman")
  const [MoviesList, setData] = useState([])
  const [MyFavorite, setFavoriteData] = useState([])
  FetchFavoriteData(setFavoriteData)
  FetchData(setData, search)
  console.log(MoviesList)

  return (
    <div>
      <br></br>
      <center>
        <SearchBox search={setText} />
        <Header header="Search result:" />
        <MovieList MovieList={MoviesList} />
        <Header header="My Favorites:" />
        <MovieList MovieList={MyFavorite}/>
      </center>
    </div>
  );
}

export default App;

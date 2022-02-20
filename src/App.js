import SearchBox from './components/SearchBox';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './components/Header';
import MovieList from './components/MovieList';
import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom'


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

// Fetch MyFavorites Data and create my Favorites list 
async function GetMyFavorites() {
  const DataDiv = document.getElementById('FavoriteSection')
  if (DataDiv.children.length == 0) {
    const MyFavorites = await FetchFavoriteFullData();
    ReactDOM.render(<>
      <Header header="My Favorites:" />
      <MovieList MovieList={MyFavorites} ShowList="Favorite" FavoriteList={MyFavorites.map((x) => x["imdbID"])} />
    </>, DataDiv);
    return
  }
  DataDiv.hidden = !DataDiv.hidden
  return
}

// Fetch Favorites Data From SQLlite local server
async function FetchFavoriteFullData() {
  const response = await fetch(`http://localhost//GetFavorites`);
  const data = await response.json();
  return data["Search"]
}

// Fetch Favorites ID From SQLlite local server
async function FetchFavoriteData(setFavoriteData) {
  useEffect(() => {
    async function fetchfavoriteMoviesList() {
      const response = await fetch(`http://localhost//GetFavoritesID`);
      const data = await response.json();
      setFavoriteData(data["Search"])
      return
    } fetchfavoriteMoviesList()
  }, [])
}

function App() {
  const [search, setText] = useState("Batman")
  const [MoviesList, setData] = useState([])
  const [MyFavorites, setFavoriteData] = useState([])
  FetchFavoriteData(setFavoriteData)
  FetchMovies(setData, search)

  return (
    <div>
      <br></br>
      <center>
        <SearchBox search={setText} />
        <Header header="Search result:" />
      </center>
      <MovieList MovieList={MoviesList} ShowList="Search" FavoriteList={MyFavorites.map((x) => x["imdbID"])} />
      <bar></bar>
      <button onClick={GetMyFavorites}>Show my Favorites</button>
      <center>
        <div id="FavoriteSection"></div>
      </center >
    </div>
  );
}

export default App;

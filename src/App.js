import { useEffect, useState } from "react";
import "./App.css";
import SearchIcon from "./assets/search.svg";
import MovieCard from "./Movie";
import Banner from "./Banner";
import Footer from "./Footer"
function App() {
  // API Key: 186948e1

  const API_URL = "http://www.omdbapi.com?apikey=186948e1";
  const [movies, setMovies] = useState([]);

  /* The async function will wait for response to fetch the API request
  while data awaits until the response is fetched to return the movies searched by the user */
  const searchMovies = async (title, e) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };

  const [searchTerm, setSearchTerm] = useState();
  useEffect(() => {
    searchMovies({ searchMovies });
  }, []);

  const resetMovies = (e) => {
    //setting it here to not pass it as ana arrow function on the jsx element
    setSearchTerm(e.target.value);

    if (e.target.value === "") {
      searchMovies({ searchMovies });
    }
  };

  function submitOnEnter(e) {
    const key = e.key;
    if (key === "Enter") {
      searchMovies(searchTerm);
    }
  }

  return (
    <main className='app'>
      <nav>
        <Banner />

        <div className='search'>
          <input
            placeholder='Search for movies'
            value={searchTerm}
            onChange={resetMovies}
            onKeyDown={(e) => submitOnEnter(e)}
          />

          <img
            src={SearchIcon}
            alt='search'
            onClick={() => searchMovies(searchTerm)}
          />
        </div>
      </nav>
      {movies?.length > 0 ? (
        <section className='container'>
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </section>
      ) : (
        <div className='empty'>
          <h2> No movies found! </h2>
        </div>
      )}

      <Footer/>
    </main>
  );
}

export default App;

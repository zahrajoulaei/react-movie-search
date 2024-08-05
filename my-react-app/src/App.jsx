import { useState, useEffect } from 'react'
import MovieDisplay from './components/MovieDisplay'
import Form from './components/Form'

import './App.css'

export default function App() {
  //variable with your apiKey
  const apiKey = "fb793b58";

  //State to hold movie data
  const [movie, setMovie] = useState(null);

  //Function to getMovies
  const getMovie = async (searchTerm) => {
    // make fetch request and store response
    try {
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${apiKey}&t=${searchTerm}`
      );
      // Parse JSON response into a javascript object
      const data = await response.json();
      //set the Movie state to the movie
      setMovie(data);
    } catch(e){
      console.error(e)
    }
  };

    //This will run on the first render but not on subsquent renders
    useEffect(() => {
      getMovie("interstellar");
    }, []);

  // USE OUR COMPONENTS IN APPs RETURNED JSX
  // We pass the getMovie function as a prop called moviesearch
  return (
    <div className="App">
      <Form moviesearch={getMovie} />
      <MovieDisplay movie={movie}/>
    </div>
  );
}

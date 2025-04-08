import { useState, useEffect } from 'react';
import logo from './logo.svg';
import './Home.css';

function Home() {
  const [movieName, setMovieName] = useState('');
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const apiUrl = 'https://api.themoviedb.org/3/movie/popular?api_key=522d421671cf75c2cba341597d86403a';

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.results); // Stocke la liste des films dans le state
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des films :', error);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1> 🎬 Catalogues des films </h1>
        <input
          type="text"
          name="nom du film"
          id="nom du film"
          placeholder="Rechercher un film..."
          value={movieName}
          onChange={(e) => setMovieName(e.target.value)}
        />
        <p>Nom du film : {movieName}</p>

        {/* 🔽 Liste des films populaires affichée ici */}
        <ul>
          {movies.map((movie) => (
            <li key={movie.id}>{movie.title}</li>
          ))}
        </ul>

      </header>
    </div>
  );
}

export default Home;

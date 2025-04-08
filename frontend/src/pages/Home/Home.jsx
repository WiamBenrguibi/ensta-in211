import { useState, useEffect } from 'react';
import { useFetchMovies } from './useFetchMovies';
import Movie from './Movie';
import logo from './logo.svg';
import './Home.css';

function Home() {
  const [movieName, setMovieName] = useState('');
  const { movies, loading, error } = useFetchMovies();

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(movieName.toLowerCase())
  );

  return (
    <div className="App">
      <header className="App-header">
        <h1> Catalogues des films </h1>
        <input
          type="text"
          name="nom du film"
          id="nom du film"
          placeholder="Rechercher un film..."
          value={movieName}
          onChange={(e) => setMovieName(e.target.value)}
        />
        <p>Nom du film : {movieName}</p>

        {loading && <p>Chargement des films...</p>}
        {error && <p>Une erreur est survenue </p>}

        <div className="movie-list">
          {filteredMovies.length === 0 ? (
            <p>Aucun film trouvé pour cette recherche.</p>
          ) : (
            filteredMovies.map((movie) => (
              <Movie key={movie.id} movie={movie} />
            ))
          )}
        </div>

      </header>
    </div>
  );
}

export default Home;

import { useEffect, useState } from "react";
import axios from "axios";

export function useFetchMovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);   // chargement
  const [error, setError] = useState(null);       // d'erreur

  useEffect(() => {
    const tmdbUrl = 'https://api.themoviedb.org/3/movie/popular?api_key=522d421671cf75c2cba341597d86403a';
    const localUrl = `${import.meta.env.VITE_BACKDEND_URL}/movies`;

    Promise.all([
      axios.get(tmdbUrl),
      axios.get(localUrl)
    ])
    .then(([tmdbRes, localRes]) => {
      // les films TMDB ont un "title"
      const tmdbMovies = tmdbRes.data.results;

      // les films locaux ont un "titre" => on les convertit
      const localMovies = localRes.data.movies.map(m => ({
        id: m.id,
        title: m.titre,
        release_date: m.date,
        poster_path: ''  // pas d’image, donc on met vide
      }));

        setMovies([...localMovies, ...tmdbMovies]); // fusion
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur API :", err);
        setError(err);
        setLoading(false);
      });
  }, []);

  return { movies, loading, error };
}
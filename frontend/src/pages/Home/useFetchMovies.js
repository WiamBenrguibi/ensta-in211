import { useEffect, useState } from "react";
import axios from "axios";

export function useFetchMovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);   // chargement
  const [error, setError] = useState(null);       // d'erreur

  useEffect(() => {
    const apiUrl = 'https://api.themoviedb.org/3/movie/popular?api_key=522d421671cf75c2cba341597d86403a';

    axios
      .get(apiUrl)
      .then((response) => {
        setMovies(response.data.results);
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
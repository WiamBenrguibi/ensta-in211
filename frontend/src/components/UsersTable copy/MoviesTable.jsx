import { useEffect, useState } from 'react';
import axios from 'axios';
import './MoviesTable.css';

const useFetchMovies = () => {
    const [movies, setMovies] = useState([]);
    const [moviesLoadingError, setMoviesLoadingError] = useState(null);

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_BACKDEND_URL}/movies`)
            .then((response) => {
                setMovies(response.data.movies);
            })
            .catch((error) => {
                setMoviesLoadingError('An error occured while fetching movies.');
                console.error(error);
            });
    }, []);

    return { movies, moviesLoadingError };
};

function MoviesTable() {
    const { movies, moviesLoadingError } = useFetchMovies();

    const deleteMovie = (movieId) => {
        axios.delete(`${import.meta.env.VITE_BACKDEND_URL}/movies/${movieId}`);
    };

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>First name</th>
                        <th>Last name</th>
                    </tr>
                </thead>
                <tbody>
                    {movies.map((movie) => (
                        <tr key={movie.email}>
                            <td>{movie.email}</td>
                            <td>{movie.firstname}</td>
                            <td>{movie.lastname}</td>
                            <td>
                                <button onClick={() => deleteMovie(movie.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {moviesLoadingError !== null && (
                <div className="movies-loading-error">{moviesLoadingError}</div>
            )}
        </div>
    );
}

export default MoviesTable;

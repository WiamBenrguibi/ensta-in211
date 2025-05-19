import './Movies.css';
import AddMovieForm from '../../components/AddMovieForm/AddMovieForm';

function Movies() {
  return (
    <div className="Movies-container">
      <h1>Catalogue des films</h1>
      <AddMovieForm />
    </div>
  );
}

export default Movies;

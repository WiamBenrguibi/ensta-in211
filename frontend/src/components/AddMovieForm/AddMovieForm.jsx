import { useState } from 'react';
import axios from 'axios';
import './AddMovieForm.css';

const DEFAULT_FORM_VALUES = {
  titre: '',
  date: '',
};

const useSaveMovie = () => {
  const [movieCreationError, setMovieCreationError] = useState(null);
  const [movieCreationSuccess, setMovieCreationSuccess] = useState(null);
  const displayCreationSuccessMessage = () => {
    setMovieCreationSuccess('Film ajouté avec succès !');
    setTimeout(() => {
      setMovieCreationSuccess(null);
    }, 3000);
  };

  const saveMovie = (event, formValues, setFormValues) => {
    // This avoid page reload
    event.preventDefault();

    setMovieCreationError(null);
    if (formValues.titre === '') {
      console.error('Le titre est obligatoire');
      return;
    }
    console.log("Form values envoyés :", formValues);

    axios
      .post(`${import.meta.env.VITE_BACKDEND_URL}/movies/new`, formValues)
      .then(() => {
        displayCreationSuccessMessage();
        setFormValues(DEFAULT_FORM_VALUES);
      })
      .catch((error) => {
        setMovieCreationError('An error occured while creating new movie.');
        console.error('Erreur axios :', error);
      });
  };

  return { saveMovie, movieCreationError, movieCreationSuccess };
};

function AddMovieForm() {
  const [formValues, setFormValues] = useState(DEFAULT_FORM_VALUES);
  const { saveMovie, movieCreationError, movieCreationSuccess } = useSaveMovie();

  return (
    <div>
      <form
        className="add-movie-form"
        onSubmit={(event) => saveMovie(event, formValues, setFormValues)}
      >
        <input
          className="add-movie-input"
          placeholder="Titre du film"
          value={formValues.titre}
          onChange={(event) =>
            setFormValues({ ...formValues, titre: event.target.value })
          }
        />
        <input
          className="add-movie-input"
          type="date"
          placeholder="Date de sortie"
          value={formValues.date}
          onChange={(event) =>
            setFormValues({ ...formValues, date: event.target.value })
          }
        />
        <button className="add-movie-button" type="submit">
          Ajouter le film
        </button>
      </form>
      {movieCreationSuccess && (
        <div className="movie-creation-success">{movieCreationSuccess}</div>
      )}
      {movieCreationError && (
        <div className="movie-creation-error">{movieCreationError}</div>
      )}
    </div>
  );
}

export default AddMovieForm;
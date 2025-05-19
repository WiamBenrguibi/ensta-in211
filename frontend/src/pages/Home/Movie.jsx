function Movie({ movie }) {
  const title = movie.title || movie.titre;
  const releaseDate = movie.release_date || movie.date;

  const isLocalMovie = !movie.poster_path; // si pas d'image, c’est un film ajouté manuellement

  const handleDelete = () => {
    fetch(`${import.meta.env.VITE_BACKDEND_URL}/movies/${movie.id}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (!res.ok) throw new Error('Échec suppression');
        window.location.reload(); // simple pour recharger la liste
      })
      .catch((err) => console.error('Erreur suppression :', err));
  };

  return (
    <div className="movie-card">
      <img
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
            : "https://via.placeholder.com/200x300?text=No+Image"
        }
        alt={title}
      />
      <h3>{title}</h3>
      <p>Date de sortie : {releaseDate}</p>

      {/* Affiche le bouton seulement pour les films locaux */}
      {isLocalMovie && (
        <button onClick={handleDelete}>🗑 Supprimer</button>
      )}
    </div>
  );
}

export default Movie;

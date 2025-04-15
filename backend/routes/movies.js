import express from 'express';
import { appDataSource } from '../datasource.js';
import Movie from '../entities/movies.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const movieRepository = appDataSource.getRepository(Movie);
    const movies = await movieRepository.find();
    res.json({ movies });
  } catch (error) {
    console.error('Erreur lors de la récupération des films :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

router.post('/new', async (req, res) => {
  try {
    const movieRepository = appDataSource.getRepository(Movie);

    const newMovie = movieRepository.create({
      titre: req.body.titre,
      date: req.body.date,
    });

    const result = await movieRepository.insert(newMovie);

    res.status(201).json({
      message: "Film ajouté avec succès",
      id: result.identifiers[0].id,
    });
  } catch (error) {
    console.error('Erreur lors de l’ajout du film :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

router.delete('/:id', async (req, res) => {
    try {
      const movieRepository = appDataSource.getRepository(Movie);
  
      const result = await movieRepository.delete({ id: req.params.id });
  
      if (result.affected === 0) {
        return res.status(404).json({ message: 'Film non trouvé ' });
      }
  
      res.status(200).json({ message: 'Film supprimé ' });
    } catch (error) {
      console.error('Erreur lors de la suppression du film :', error);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  });
  

export default router;
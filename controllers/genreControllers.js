import dbPool from '../db/dbConnection.js';

const getAllGenres = async (req, res) => {
    try {
      const { rows } = await dbPool.query('SELECT * FROM genres;');
      console.log(rows);
      return res.json(rows);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };

  const createGenre = async (req, res) => {
    try {
      const { genre_name, genre_description } = req.body;
      if (!genre_name || !genre_description)
        return res.status(400).json({ error: 'Missing fields to create a new Genre!' });
  
      const {
        rows: [newGenre],
      } = await dbPool.query(
        'INSERT INTO genres (genre_name, genre_description) VALUES ($1, $2) RETURNING *;',
        [genre_name, genre_description]
      );
  
      return res.json(newGenre);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };

  const getOneGenre = async (req, res) => {
    try {
      const { id } = req.params;
      if (!+id) return res.status(400).json({ error: 'Invalid Id' });
  
      const {
        rows: [oneGenre],
      } = await dbPool.query('SELECT * FROM genres WHERE id=$1', [id]);
  
      if (!oneGenre) return res.status(404).json({ error: 'Genre not found' });
  
      return res.json(oneGenre);
      
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };

  export { getAllGenres, createGenre, getOneGenre };
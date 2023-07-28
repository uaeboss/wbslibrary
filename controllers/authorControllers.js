import dbPool from '../db/dbConnection.js';

const getAllAuthors = async (req, res) => {
    try {
      const { rows } = await dbPool.query('SELECT * FROM authors;');
      console.log(rows);
      return res.json(rows);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };

  const createAuthor = async (req, res) => {
    try {
      const { first_name, last_name, about, image_url } = req.body;
      if (!first_name || !last_name)
        return res.status(400).json({ error: 'Name is required to add a new Author!' });
  
      const {
        rows: [newAuthor],
      } = await dbPool.query(
        'INSERT INTO authors (first_name, last_name, about, image_url) VALUES ($1, $2, $3, $4) RETURNING *;',
        [first_name, last_name, about, image_url]
      );
  
      return res.json(newAuthor);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };

  const getOneAuthor = async (req, res) => {
    try {
      const { id } = req.params;
      if (!+id) return res.status(400).json({ error: 'Invalid Id' });
  
      const {
        rows: [oneAuthor],
      } = await dbPool.query('SELECT * FROM authors WHERE id=$1', [id]);
  
      if (!oneAuthor) return res.status(404).json({ error: 'Book not found' });
  
      return res.json(oneAuthor);
      
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };

export { getAllAuthors, createAuthor, getOneAuthor };
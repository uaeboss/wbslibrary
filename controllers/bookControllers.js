import dbPool from '../db/dbConnection.js';

const getAllBooks = async (req, res) => {
  try {
    const { rows } = await dbPool.query('SELECT * FROM books;');
    console.log(rows);
    return res.json(rows);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const createBook = async (req, res) => {
  try {
    const { title, subtitle, description, image_url, isbn, genre } = req.body;
    if (!title || !description || !isbn || !genre)
      return res.status(400).json({ error: 'Missing fields to create a new book!' });

    const {
      rows: [newBook],
    } = await dbPool.query(
      'INSERT INTO books (title, subtitle, description, image_url, isbn, genre) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;',
      [title, subtitle, description, image_url, isbn, genre]
    );

    return res.json(newBook);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getOneBook = async (req, res) => {
  try {
    const { id } = req.params;
    if (!+id) return res.status(400).json({ error: 'Invalid Id' });

    const {
      rows: [oneBook],
    } = await dbPool.query('SELECT * FROM books WHERE id=$1', [id]);

    if (!oneBook) return res.status(404).json({ error: 'Book not found' });

    return res.json(oneBook);
    
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const editBook = async (req, res) => {
  try {
    const { id } = req.params;
    if (!+id) return res.status(400).json({ error: 'Invalid Id' });

    const { title, subtitle, description, image_url, isbn, genre, active } = req.body;
    if (!title || !description || !isbn || !genre)
      return res.status(400).json({ error: 'Missing fields to create a new book!' });

    const {
      rows: [updatedBook],
    } = await dbPool.query(
      'UPDATE books SET title=$1, subtitle=$2, description=$3, image_url=$4, isbn=$5, genre=$6, active=$7 WHERE id=$8 RETURNING *;',
      [title, subtitle, description, image_url, isbn, genre, active, id]
    );

    if (!updatedBook) return res.status(404).json({ error: 'Book not found' });

    return res.json(updatedBook);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deactivateBook = async (req, res) => {
  try {
    const { id } = req.params;
    if (!+id) return res.status(400).json({ error: 'Invalid Id' });

    const {
      rows: [deactivatedBook],
    } = await dbPool.query(
      'UPDATE books SET active=false WHERE id=$1 RETURNING *;',
      [id]
    );

    return res.json(deactivatedBook);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export { getAllBooks, createBook, getOneBook, editBook, deactivateBook };
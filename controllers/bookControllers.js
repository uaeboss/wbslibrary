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


export { getAllBooks, createBook };
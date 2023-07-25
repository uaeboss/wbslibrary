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

export { getAllBooks };
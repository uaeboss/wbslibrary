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

export { getAllAuthors };
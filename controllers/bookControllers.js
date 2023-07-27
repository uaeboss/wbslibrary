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

const getOneBook = async (req, res) => {
  try {
    const { id } = req.params;
    if (!+id) return res.status(400).json({ error: 'Invalid Id sent' });

    const {
      rows: [oneBook],
    } = await dbPool.query('SELECT * FROM books WHERE id=$1', [id]);

    if (!oneBook) return res.status(404).json({ error: 'Book not found' });

    return res.json(oneBook);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export { getAllBooks, getOneBook };
import express from 'express';

import { getAllBooks, getOneBook, createBook, editBook, deactivateBook } from './controllers/bookControllers.js';
import { getAllAuthors, createAuthor } from './controllers/authorControllers.js';


const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());

app.route('/').get(async (req, res) => {
    try {
        const dbResponse = await pool.query("SELECT NOW();");
        console.log(dbResponse);
        res.send(dbResponse.rows);
      } catch (error) {
        res.status(500).send({ error: error.message });
      }
});

app.route('/books').get(getAllBooks).post(createBook);

app.route('/books/:id').get(getOneBook).put(editBook).delete(deactivateBook);

app.route('/authors').get(getAllAuthors).post(createAuthor);


app.listen(port, () => console.log(`Server up on port:http://localhost:${port}/`));
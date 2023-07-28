import express from 'express';
import cors from 'cors';
import { getAllBooks, getOneBook, createBook, editBook, deactivateBook } from './controllers/bookControllers.js';
import { getAllAuthors, createAuthor, getOneAuthor, editAuthor, deleteAuthor } from './controllers/authorControllers.js';


const app = express();
const port = process.env.PORT || 8000;

app.use(cors())
app.use(express.json());
app.use(cors({ origin: ['http://localhost:5173',
'/https:\/\/?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.netlify\.app/'] }));

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

app.route('/authors/:id').get(getOneAuthor).put(editAuthor).delete(deleteAuthor);


app.listen(port, () => console.log(`Server up on port:http://localhost:${port}/`));
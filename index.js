import express from 'express';
import { getAllBooks, getOneBook } from './controllers/bookControllers.js';

const app = express();
const port = process.env.PORT || 6969;

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

app.route('/books').get(getAllBooks)

app.route('/books/:id').get(getOneBook)


app.listen(port, () => console.log(`Server up on port:http://localhost:${port}/`));
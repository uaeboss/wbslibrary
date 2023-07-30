import dbPool from "../db/dbConnection.js";

const getAllGenres = async (req, res) => {
  try {
    const { rows } = await dbPool.query("SELECT * FROM genres;");
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
      return res
        .status(400)
        .json({ error: "Name is required to add a new Author!" });

    const {
      rows: [newGenre],
    } = await dbPool.query(
      "INSERT INTO genres (genre_name, genre_description) VALUES ($1, $2) RETURNING *;",
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
    if (!+id) return res.status(400).json({ error: "Invalid Id" });

    const {
      rows: [oneGenre],
    } = await dbPool.query("SELECT * FROM genres WHERE id=$1", [id]);

    if (!oneGenre) return res.status(404).json({ error: "Genre not found" });

    return res.json(oneGenre);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const editGenre = async (req, res) => {
  try {
    const { id } = req.params;
    if (!+id) return res.status(400).json({ error: "Invalid Id" });

    const { genre_name, genre_description } = req.body;
    if (!genre_name || !genre_description)
      return res
        .status(400)
        .json({ error: "Name is required to add a new Genre!" });

    const {
      rows: [updatedGenre],
    } = await dbPool.query(
      "UPDATE genres SET genre_name=$1, genre_description=$2 WHERE id=$3 RETURNING *;",
      [genre_name, genre_description, id]
    );

    if (!updatedGenre)
      return res.status(404).json({ error: "Genre not found" });

    return res.json(updatedGenre);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteGenre = async (req, res) => {
  try {
    const { id } = req.params;
    if (!+id) return res.status(400).json({ error: "Invalid Id" });

    const {
      rows: [deletedGenre],
    } = await dbPool.query("DELETE FROM genres WHERE id=$1 RETURNING *;", [id]);

    return res.json(deletedGenre);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export { getAllGenres, createGenre, getOneGenre, editGenre, deleteGenre };

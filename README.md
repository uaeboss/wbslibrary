ES6
-------------------------------------------------------------------------------------------------------------------


Installed packages:
- nodemon
- express
- pg
- dotenv

-------------------------------------------------------------------------------------------------------------------

<p>dbConnection:<br/>
Verbindung zur Datenbank</p>

<p>bookControllers:<br/>
Auslagerung der Funktionen</p>

-------------------------------------------------------------------------------------------------------------------


Aufbau Datenbank:

        CREATE TABLE books (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255),
            subtitle VARCHAR(255),
            description TEXT,
            image_url TEXT,
            isbn VARCHAR(255),
            genre VARCHAR(255),
            active BOOLEAN NOT NULL DEFAULT true
        );

        CREATE TABLE authors (
            id SERIAL PRIMARY KEY,
            first_name varchar(255),
            last_name varchar(255),
            about TEXT,
            image_url TEXT
        );

        CREATE TABLE books_authors (
            id SERIAL PRIMARY KEY,
            author_id int,
            book_id int,
            FOREIGN KEY (author_id) REFERENCES authors(id),
            FOREIGN KEY (book_id) REFERENCES books(id)
        );

        CREATE TABLE genres (
            id SERIAL PRIMARY KEY,
            genre_name varchar(255),
            genre_description TEXT
        );

-------------------------------------------------------------------------------------------------------------------


Vorlagen:

        INSERT INTO books (title, subtitle, description, image_url, isbn, genre) VALUES ('', '', '', '', '', '')

        INSERT INTO authors (first_name, last_name, about, image_url) VALUES ('', '', '', '')

        INSERT INTO genres (genre_name, genre_description) VALUES ('', '')
        
        
-------------------------------------------------------------------------------------------------------------------

Funktionalitäten:
books:<br>
[x] get all books
[x] get one book
[x] create book
[x] edit book
[x] deactivate book

authors:<br>
[x] get all authors
[x] get one author
[x] create author
[x] edit author
[x] delete author

genres:
[ ] get all genres
[ ] get one genre
[ ] create genre
[ ] edit genre
[ ] delete genre
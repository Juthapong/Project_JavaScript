const express = require('express');
const sqlite3 = require('sqlite3');
const ejs = require('ejs');

const app = express();

// Initialize SQLite database
const db = new sqlite3.Database('path/to/your/database.sqlite');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

// Define a route to render the EJS template
app.get('/', (req, res) => {
  db.all('SELECT id, nameplayer FROM players', (err, rows) => {
    if (err) {
      return res.status(500).send('Database error');
    }
    res.render('index', { players: rows });
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
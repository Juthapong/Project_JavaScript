// Description: Node Express REST API with Sequelize and SQLite CRUD Book
// npm install express sequelize sqlite3
// Run this file with node SequlizeSQLiteCRUDBook.js
// Test with Postman

const express = require('express');
const Sequelize = require('sequelize');
const app = express();

// parse incoming requests
app.use(express.json());

// create a connection to the database
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'sqlite',
  storage: './Database/SQPlayers.sqlite',
});
const sequelize2 = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'sqlite',
  storage: './Database/SQTeams.sqlite',
});
// define the Book model
const Player = sequelize.define('player', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nameplayer: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  score: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

// create the books table if it doesn't exist
sequelize.sync();

// route to get all books
app.get('/players', (req, res) => {
  Player.findAll()
    .then((players) => {
      res.json(players);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// route to get a book by id a
app.get('/players/:id', (req, res) => {
  Player.findByPk(req.params.id)
    .then((player) => {
      if (!player) {
        res.status(404).send('Player not found');
      } else {
        res.json(player);
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// route to create a new book
app.post('/players', (req, res) => {
  Player.create(req.body)
    .then((player) => {
      res.send(player);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// route to update a book
app.put('/players/:id', (req, res) => {
  Player.findByPk(req.params.id)
    .then((player) => {
      if (!player) {
        res.status(404).send('Player not found');
      } else {
        player
          .update(req.body)
          .then(() => {
            res.send(player);
          })
          .catch((err) => {
            res.status(500).send(err);
          });
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// route to delete a book
app.delete('/players/:id', (req, res) => {
  Player.findByPk(req.params.id)
    .then((player) => {
      if (!player) {
        res.status(404).send('Player not found');
      } else {
        player
          .destroy()
          .then(() => {
            res.send({});
          })
          .catch((err) => {
            res.status(500).send(err);
          });
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});
const Team = sequelize2.define('team', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  teamname: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  
});

// Create the teams table if it doesn't exist
sequelize2.sync();

// Route to get all teams
app.get('/teams', (req, res) => {
  Team.findAll()
    .then((teams) => {
      res.json(teams);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// Route to get a team by id
app.get('/teams/:id', (req, res) => {
  Team.findByPk(req.params.id)
    .then((team) => {
      if (!team) {
        res.status(404).send('Team not found');
      } else {
        res.json(team);
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// Route to create a new team
app.post('/teams', (req, res) => {
  Team.create(req.body)
    .then((team) => {
      res.send(team);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// Route to update a team
app.put('/teams/:id', (req, res) => {
  Team.findByPk(req.params.id)
    .then((team) => {
      if (!team) {
        res.status(404).send('Team not found');
      } else {
        team
          .update(req.body)
          .then(() => {
            res.send(team);
          })
          .catch((err) => {
            res.status(500).send(err);
          });
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// Route to delete a team
app.delete('/teams/:id', (req, res) => {
  Team.findByPk(req.params.id)
    .then((team) => {
      if (!team) {
        res.status(404).send('Team not found');
      } else {
        team
          .destroy()
          .then(() => {
            res.send({});
          })
          .catch((err) => {
            res.status(500).send(err);
          });
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

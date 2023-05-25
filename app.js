require("dotenv").config();


const express = require("express");

const app = express();

const port = process.env.APP_PORT ?? 5000;

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

app.get("/", welcome);

const movieHandlers = require("./movieHandlers");

app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);

// ROUTE TO API/USERS QUEST EXPRESS NUMBER 2//
const users = require ("./users");
app.get("/api/users", users.getUsers);
// ROUTE TO API/USERS/ID QUEST EXPRESS NUMBER 2 //
app.get("/api/users/:id", users.getUserById);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});

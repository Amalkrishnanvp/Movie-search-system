const express = require("express");
const router = express.Router();
const movieHelpers = require("../helpers/movie-helpers");

/* GET - Render home page, get existing movies from database */
router.get("/", async (req, res) => {
  // Call function to get all movies from database
  const movies = await movieHelpers.getAllMoviesFromDb();

  res.render("admin/view-movies", { admin: true, movies });
});

/* GET - Get movies by name by search */
router.get("/get-movies", async (req, res) => {
  const movieName = req.query.movieName;
  //   console.log(movieName);

  const movies = await movieHelpers.getMoviesByName(movieName);

  console.log(movies);

  res.render("admin/view-search-movies", {
    movies,
    admin: true,
  });
});

/* POST - Add movie to database */
router.post("/add-movie", async (req, res) => {
  const movieId = req.body.movieId;
  // console.log("movie", movieId);

  const movie = await movieHelpers.geMovieById(movieId);
  const result = await movieHelpers.addMovieToDb(movie);

  res.json({ result });
});

module.exports = router;

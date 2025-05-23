const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movieControllers");

/* GET - Get movies by name by search */
router.get("/get-movies", movieController.getMovies);

/* POST - Add movie to database */
router.post("/add-movie", movieController.addMovie);

/* GET - Get movie by id */
router.get("/get-movie/:id", movieController.getMovieById);

/* POST - Delete movie from database */
router.post("/delete-movie", movieController.deleteMovie);

router.post("/delete-selected-movies", movieController.deleteSelectedMovies);

module.exports = router;

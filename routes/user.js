const express = require("express");
const router = express.Router();
const movieHelpers = require("../helpers/movie-helpers");

/* GET - Render home page */
router.get("/", async (req, res) => {
  // Call function to get all movies
  const movies = await movieHelpers.getAllMoviesFromDb();

  res.render("user/view-movies", { movies });
});

/* GET - Render login page */
router.get("/login", (req, res) => {
  // render login page and products page based on logged in state
  // if (req.session.loggedIn) {
  //   res.redirect("/");
  // } else {
  //   res.render("user/login", { loginErr: req.session.loginErr });
  //   req.session.loginErr = false;
  // }
  res.render("user/login");
});

/* GET - Render sign up page */
router.get("/signup", (req, res, next) => {
  res.render("user/signup");
});

module.exports = router;

const movieHelpers = require("../helpers/movieHelpers");

module.exports = {
  // Function to get movies by name
  getMovies: async (req, res) => {
    const movieName = req.query.movieName;
    //   console.log(movieName);

    const movies = await movieHelpers.getMoviesByName(movieName);

    console.log(movies);

    res.render("admin/view-search-movies", {
      movies,
      admin: true,
    });
  },

  // Function to add movie
  addMovie: async (req, res) => {
    const movieId = req.body.movieId;
    // console.log("movie", movieId);

    const movie = await movieHelpers.geMovieById(movieId);
    const result = await movieHelpers.addMovieToDb(movie);

    res.json({ result });
  },
};

const movieHelpers = require("../helpers/movieHelpers");

module.exports = {
  // Function to render home page
  renderHomepage: async (req, res) => {
    // Access if session exists
    let user = req.session.user;

    if (user) {
      // Call function to get all movies
      const movies = await movieHelpers.getAllMoviesFromDb();

      res.render("user/view-movies", { movies, user });
    } else {
      res.redirect("/auth/login");
    }
  },

  // Function to add movie to favourites
  addToFavourites: async (req, res) => {
    try {
      // console.log("favourites router");
      const movieId = req.body.imdbID;
      console.log("Movie id: ", movieId);

      const movie = await movieHelpers.geMovieById(movieId);
      const result = await movieHelpers.addMovieToFavourites(movie);

      res.status(200).json({
        success: true,
        message: "Movie added to favourites",
        movie: result, // Optional: only if you want to return the saved movie
      });
    } catch (error) {
      console.error("Error adding to favourites:", error);
      res.status(500).json({
        success: false,
        message: "Something went wrong",
      });
    }
  },
};

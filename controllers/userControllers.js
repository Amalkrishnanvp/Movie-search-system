const movieHelpers = require("../helpers/movieHelpers");

module.exports = {
  // Function to render home page
  renderHomepage: async (req, res) => {
    // Access if session exists
    let user = req.session.user;
    console.log("User session: ", user);
    // let userId = req.session.user._id;
    // console.log("User id: ", userId);

    if (user) {
      const userId = user._id;
      console.log("User id: ", userId);
      // Call function to get all movies
      const movies = await movieHelpers.getAllMoviesFromDb();
      const favouriteMoviesIds = await movieHelpers.getAllFavouritesIdsFromDb(
        user._id
      );
      console.log("favourite movies ids: ", favouriteMoviesIds);
      const favouriteMoviesCount = await movieHelpers.getFavouriteMoviesCount(
        user._id
      );
      // console.log("favourite movies: ", favouriteMovies);

      res.render("user/view-movies", {
        movies,
        user,
        favouriteMoviesIds,
        favouriteMoviesCount,
      });
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
      const userId = req.session.user._id;
      console.log("hello", userId);

      const movie = await movieHelpers.geMovieById(movieId);
      const result = await movieHelpers.addMovieToFavourites(movie, userId);
      const favouriteMoviesCount = await movieHelpers.getFavouriteMoviesCount(
        userId
      );
      console.log("result", result);

      res.status(200).json({
        success: true,
        message: result.message,
        movie: result, // Optional: only if you want to return the saved movie
        favouriteMoviesCount: favouriteMoviesCount,
      });
    } catch (error) {
      console.error("Error adding to favourites:", error);
      res.status(500).json({
        success: false,
        message: "Something went wrong",
      });
    }
  },

  // Function to render favourite movies page
  renderFavouritesPage: async (req, res) => {
    // Access if session exists
    let user = req.session.user;
    console.log("User session: ", user);
    // let userId = req.session.user._id;
    // console.log("User id: ", userId);

    if (user) {
      const userId = user._id;
      console.log("User id: ", userId);
      // Call function to get all movies
      const favouriteMovies = await movieHelpers.getAllFavouritesFromDb(
        user._id
      );
      const favouriteMoviesCount = await movieHelpers.getFavouriteMoviesCount(
        user._id
      );
      console.log("favourite movies: ", favouriteMovies);

      res.render("user/favourite-movies", {
        favouriteMovies: favouriteMovies.favouriteMovies,
        user,
        favouriteMoviesCount,
      });
    } else {
      res.redirect("/auth/login");
    }
  },
};

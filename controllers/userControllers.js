const movieHelpers = require("../helpers/movieHelpers");

// Function to verify login

module.exports = {
  // Function to render home page
  renderHomepage: async (req, res) => {
    console.log("home page router");
    // Access if session exists
    let user = req.session.user;
    console.log("User session: ", user);
    // let userId = req.session.user._id;
    // console.log("User id: ", userId);

    if (!user || user.role !== "user") {
      return res.redirect("/auth/login");
    }

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

    const popularMovies = await movieHelpers.getPopularMoviesFromTmdbApi();
    console.log("popular movies: ", popularMovies);
    const genres = await movieHelpers.getAllGenresFromTmdbApi();

    popularMovies.forEach((movie) => {
      movie.genre_names = movie.genre_ids.map((genreId) => {
        const genre = genres.find((g) => g.id === genreId);
        return genre ? genre.name : null;
      });
    });

    const newMovies = await movieHelpers.getNewMoviesFromTmdbApi();

    res.render("user/home", {
      movies,
      user,
      isUser: user && user.role === "user",
      favouriteMoviesIds,
      favouriteMoviesCount,
      popularMovies,
      genres,
      newMovies,
    });
  },

  // Function to add movie to favourites
  addToFavourites: async (req, res) => {
    try {
      // console.log("favourites router");
      const movieId = req.body.tmdbId;
      console.log("Movie id: ", movieId);
      const userId = req.session.user._id;
      console.log("hello", userId);

      const movie = await movieHelpers.getMovieById(movieId);

      const movieExistInDb = await movieHelpers.checkMovieExistInDb(movieId);

      if (!movieExistInDb) {
        console.log("Movie does not exist in DB, adding to DB...");
        await movieHelpers.addMovieToDb(movie);
      }

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
    console.log("favourites router");
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

      if (!favouriteMovies.favouriteMovies) {
        res.render("user/no-favourites", {
          user,
          favouriteMoviesCount,
        })
      }

      res.render("user/favourite-movies", {
        favouriteMovies: favouriteMovies.favouriteMovies,
        user,
        favouriteMoviesCount,
      });
    } else {
      res.redirect("/auth/login");
    }
  },

  // Function to get movies
  getMovies: async (req, res) => {
    let user = req.session.user;
    console.log("User session: ", user);
    // let userId = req.session.user._id;
    // console.log("User id: ", userId);

    if (!user || user.role !== "user") {
      return res.redirect("/auth/login");
    }

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
    // const genres = await movieHelpers.getAllGenresFromTmdbApi();

    // movies.forEach((movie) => {
    //   movie.genre_names = movie.genre_ids.map((genreId) => {
    //     const genre = genres.find((g) => g.id === genreId);
    //     return genre ? genre.name : null;
    //   });
    // });
    // console.log("favourite movies: ", favouriteMovies);

    res.render("user/view-movies", {
      movies,
      user,
      favouriteMoviesIds,
      favouriteMoviesCount,
    });
  },

  // Function to remove movie from favourites
  removeFromFavourites: async (req, res) => {
    try {
      const movieId = req.body.tmdbId;
      console.log("Movie id: ", movieId);
      const userId = req.session.user._id;
      console.log("hello", userId);
      const movie = await movieHelpers.getMovieById(movieId);

      const result = await movieHelpers.removeMovieFromFavourites(
        movieId,
        userId,
        movie
      );
      const favouriteMoviesCount = await movieHelpers.getFavouriteMoviesCount(
        userId
      );
      console.log("result", result);

      res.status(200).json({
        success: true,
        message: result.message,
        favouriteMoviesCount: favouriteMoviesCount,
      });
    } catch (error) {
      console.error("Error removing from favourites:", error);
      res.status(500).json({
        success: false,
        message: "Something went wrong",
      });
    }
  },
};

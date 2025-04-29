const movieHelpers = require("../helpers/movieHelpers");

module.exports = {
  // Function to get movies by name
  getMovies: async (req, res) => {
    // Access if session exists
    let user = req.session.user;
    // console.log("User session: ", user);

    if (!user) {
      return res.redirect("/auth/login");
    }

    const movieName = req.query.movieName;
    //   console.log(movieName);

    const movies = await movieHelpers.getMoviesByName(movieName);
    const favouriteMoviesIds = await movieHelpers.getAllFavouritesIdsFromDb(
      user._id
    );
    const favouriteMoviesCount = await movieHelpers.getFavouriteMoviesCount(
      user._id
    );

    const genres = await movieHelpers.getAllGenresFromTmdbApi();

    movies.forEach((movie) => {
      movie.genre_names = movie.genre_ids.map((genreId) => {
        const genre = genres.find((g) => g.id === genreId);
        return genre ? genre.name : null;
      });
    });

    console.log("ithaan movies: ", movies);

    if (user.role === "admin") {
      res.render("admin/view-search-movies", {
        user,
        movies,
        layout: "layouts/adminLayout",
      });

      return;
    } else if (user.role === "user") {
      res.render("user/view-search-movies", {
        user,
        movies,
        favouriteMoviesCount,
        favouriteMoviesIds,
      });
    }
  },

  // Function to add movie
  addMovie: async (req, res) => {
    const movieId = req.body.movieId;
    // console.log("movie", movieId);

    const movie = await movieHelpers.getMovieById(movieId);
    const result = await movieHelpers.addMovieToDb(movie);

    res.json({ result });
  },

  // Function to get movie by id
  getMovieById: async (req, res) => {
    // Access if session exists
    let user = req.session.user;
    // console.log("User session: ", user);

    if (!user) {
      return res.redirect("/auth/login");
    }

    const favouriteMoviesCount = await movieHelpers.getFavouriteMoviesCount(
      user._id
    );
    const favouriteMoviesIds = await movieHelpers.getAllFavouritesIdsFromDb(
      user._id
    );

    const movieId = req.params.id;
    // console.log("movie", movieId);

    const movieData = await movieHelpers.getMovieById(movieId);
    console.log("bro movie", movieData);

    // Preprocess the movie data
    movieData.production_companies = movieData.production_companies.map(
      (company) => {
        // Add a 'short_name' property for the first letter of the company name
        company.short_name = company.name.charAt(0);
        return company;
      }
    );

    // Format budget
    movieData.budgetFormatted = movieData.budget.toLocaleString(); // Add a formatted budget

    // You can also add other formatted values here as needed, for example:
    movieData.revenueFormatted = movieData.revenue.toLocaleString();

    res.render("user/movie-details", {
      user,
      movieData,
      favouriteMoviesCount,
      favouriteMoviesIds,
    });
  },

  // Function to delete movie from database
  deleteMovie: async (req, res) => {
    console.log("Delete movie handler called");
    const movieId = req.body.movieId;
    // console.log("movie", movieId);

    const result = await movieHelpers.deleteMovieFromDb(movieId);
    res.json({ result });
  },
};

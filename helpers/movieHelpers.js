const Movie = require("../models/movie");
const Favourite = require("../models/favourite");
const { ObjectId } = require("mongoose").Types;

module.exports = {
  // Function to get movies by name
  getMoviesByName: async (movieName) => {
    const apiKey = "aefbb563";
    const title = movieName;

    const response = await fetch(
      `http://www.omdbapi.com/?s=${title}&apikey=${apiKey}`
    );

    const data = await response.json();
    // console.log(data);

    return data.Search;
  },
  // Function to get movie by id
  geMovieById: async (movieId) => {
    const apiKey = "aefbb563";
    const imdbID = movieId;

    const response = await fetch(
      `https://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`
    );

    const data = await response.json();
    // console.log(data);

    return data;
  },

  // Function to add movie to the database
  addMovieToDb: async (movie) => {
    const newMovie = await Movie.create({
      Title: movie.Title,
      Year: movie.Year,
      imdbID: movie.imdbID,
      Type: movie.Type,
      Genre: movie.Genre,
      Poster: movie.Poster,
    });

    console.log("Movie inserted: ", newMovie);

    return { movidDbId: newMovie._id, status: true };
  },

  // Function to get all movies from database
  getAllMoviesFromDb: async () => {
    const movies = await Movie.find();
    console.log("All movies", movies);

    return movies;
  },

  // Function to add movie to favourites
  addMovieToFavourites: async (movie, userId) => {
    let movieId = movie.imdbID;

    let userFavourites = await Favourite.findOne({
      user: new ObjectId(userId),
    });

    if (userFavourites) {
      // Check if movie already exists in favourites
      const isMovieInFavourites = userFavourites.favouriteMovies.some(
        (favouriteMovie) => favouriteMovie === movieId
      );

      if (isMovieInFavourites) {
        console.log("Movie already from favourites: ", movieId);
        return { status: false, message: "Movie already in favourites" };
      } else {
        // Add movie to favourites
        await Favourite.updateOne(
          { user: new ObjectId(userId) },
          { $push: { favouriteMovies: movieId } }
        );
        console.log("Movie added to favourites: ", movieId);
        return { movieId, status: true };
      }
    } else {
      // Create favourite document to user
      const response = await Favourite.create({
        user: new ObjectId(userId),
        favouriteMovies: movieId,
      });

      console.log("Movie added to favourites: ", movieId);
      return { movieId, status: true };
    }
  },

  // Function to get all favourite movies from database
  getAllFavouritesFromDb: async (userId) => {
    const userFavourites = await Favourite.findOne({
      user: new ObjectId(userId),
    });
    // console.log(userFavourites);
    const favouriteMovies = userFavourites.favouriteMovies;

    // if (favouriteMovies.length === 0) {
    //   console.log("No favourite movies found for user: ", userId);
    //   return [];
    // }
    console.log("All favourite movies", favouriteMovies);

    return favouriteMovies;
  },
};

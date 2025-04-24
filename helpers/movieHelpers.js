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

    let movieObject = await Movie.findOne({ imdbID: movieId });
    let movieObjectId = movieObject._id;
    console.log("movieObjectId: ", movieObjectId);

    let userFavourites = await Favourite.findOne({
      user: new ObjectId(userId),
    });

    if (userFavourites) {
      // Check if movie already exists in favourites
      const isMovieInFavourites = userFavourites.favouriteMovies.some(
        (favouriteMovie) => favouriteMovie === movieObjectId
      );

      if (isMovieInFavourites) {
        console.log("Movie already from favourites: ", movieId);
        return { status: false, message: "Movie already in favourites" };
      } else {
        // Add movie to favourites
        await Favourite.updateOne(
          { user: new ObjectId(userId) },
          { $push: { favouriteMovies: new ObjectId(movieObjectId) } }
        );
        console.log("Movie added to favourites: ", movieId);
        return { movieId, status: true, message: "Movie added to favourites" };
      }
    } else {
      // Create favourite document to user
      const response = await Favourite.create({
        user: new ObjectId(userId),
        favouriteMovies: new ObjectId(movieObjectId),
      });

      console.log("Movie added to favourites: ", movieId);
      return {
        movieId,
        status: true,
        message: "Movie added to favouritesssss",
      };
    }
  },

  // Function to get all favourite movies from database
  getAllFavouritesIdsFromDb: async (userId) => {
    const userFavourites = await Favourite.findOne({
      user: new ObjectId(userId),
    }).populate("favouriteMovies");
    // console.log("user fav: ", userFavourites);

    if (userFavourites === null) {
      console.log("No favourite movies found for user: ", userId);
      return [];
    }
    // console.log(userFavourites);
    const favouriteMovies = userFavourites.favouriteMovies;
    const favouriteMoviesIds = favouriteMovies.map((movie) => movie.imdbID);
    console.log(favouriteMoviesIds);

    // console.log("favourite movies count: ", favouriteMoviesCount);

    // if (favouriteMovies.length === 0) {
    //   console.log("No favourite movies found for user: ", userId);
    //   return [];
    // }
    console.log("All favourite movies ids", favouriteMoviesIds);

    return favouriteMoviesIds;
  },

  // Function to get favourite movies count
  getFavouriteMoviesCount: async (userId) => {
    const userFavourites = await Favourite.findOne({
      user: new ObjectId(userId),
    });
    if (userFavourites === null) {
      console.log("No favourite movies found for user: ", userId);
      return 0;
    }
    const favouriteMoviesCount = userFavourites.favouriteMovies.length;

    // console.log("favourite movies count: ", favouriteMoviesCount);

    return favouriteMoviesCount;
  },

  // Function to get all favourite movies from database
  getAllFavouritesFromDb: async (userId) => {
    const favouriteMovies = await Favourite.findOne({
      user: new ObjectId(userId),
    }).populate("favouriteMovies");

    if (favouriteMovies === null) {
      console.log("No favourite movies found for user: ", userId);
      return [];
    }

    return favouriteMovies;
  },
};

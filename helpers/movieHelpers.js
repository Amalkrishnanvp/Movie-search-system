const Movie = require("../models/movie");
const Favourite = require("../models/favourite");
const { ObjectId } = require("mongoose").Types;

module.exports = {
  // Function to get movies by name
  getMoviesByName: async (movieName) => {
    const apiKey = "aefbb563";
    const title = movieName;

    const tmdbApiKey = "b7e28ca6a866eedf4ead50f7f22135b1";

    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${tmdbApiKey}&query=${title}`
    );

    const data = await response.json();
    // console.log(data);

    return data.results;
  },
  // Function to get movie by id
  getMovieById: async (movieId) => {
    // const apiKey = "aefbb563";
    const id = movieId;

    const tmdbApiKey = "b7e28ca6a866eedf4ead50f7f22135b1";

    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${tmdbApiKey}` // Use 'id' instead of 'movieId'
    );

    const data = await response.json();
    console.log("eda movie data: ", data);

    return data;
  },

  // Function to add movie to the database
  addMovieToDb: async (movieData) => {
    // Take the genres array and convert to string
    const genres = movieData.genres.map((genre) => genre.name).join(", ");

    const newMovie = await Movie.create({
      Title: movieData.title,
      ReleaseDate: movieData.release_date,
      imdbID: movieData.imdb_id,
      tmdbId: movieData.id,
      Type: "Movie",
      Genre: genres,
      PosterPath: movieData.poster_path,
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
    console.log("movie: ", movie);
    let movieId = movie.id;
    console.log("movieId: ", movieId);

    let movieObject = await Movie.findOne({ tmdbId: movieId });
    console.log("movieObject: ", movieObject);
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
    const favouriteMoviesIds = favouriteMovies.map((movie) => movie.tmdbId);
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

  // Function to get popular movies from TMDB API
  getPopularMoviesFromTmdbApi: async () => {
    const tmdbApiKey = "b7e28ca6a866eedf4ead50f7f22135b1";
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${tmdbApiKey}`
    );
    const data = await response.json();
    // console.log("Popular movies: ", data.results);
    return data.results;
  },

  // Function to get genres from TMDB API
  getAllGenresFromTmdbApi: async () => {
    const tmdbApiKey = "b7e28ca6a866eedf4ead50f7f22135b1";
    const response = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${tmdbApiKey}`
    );
    const data = await response.json();
    console.log("Genres: ", data.genres);
    return data.genres;
  },

  // Function to get new movies from TMDB API
  getNewMoviesFromTmdbApi: async () => {
    const tmdbApiKey = "b7e28ca6a866eedf4ead50f7f22135b1";
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${tmdbApiKey}`
    );
    const data = await response.json();
    console.log("New movies: ", data.results);
    return data.results;
  },
  
};

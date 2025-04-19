const Movie = require("../models/movie");

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
};

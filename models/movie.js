const mongoose = require("mongoose");

// Defining a schema
const movieSchema = new mongoose.Schema({
  Title: { type: String, required: true },
  ReleaseDate: { type: String, required: true },
  imdbID: { type: String, required: true, unique: true },
  tmdbId: { type: String, required: true, unique: true },
  Type: { type: String, required: true },
  Genre: { type: String, required: true },
  PosterPath: { type: String, required: true },
  Rating: { type: String, required: true },
});

// Creating a model
const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;

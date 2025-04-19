const mongoose = require("mongoose");

// Defining a schema
const movieSchema = new mongoose.Schema({
  Title: { type: String, required: true },
  Year: { type: String, required: true },
  imdbID: { type: String, required: true, unique: true },
  Type: { type: String, required: true },
  Genre: { type: String, required: true },
  Poster: { type: String },
});

// Creating a model
const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;

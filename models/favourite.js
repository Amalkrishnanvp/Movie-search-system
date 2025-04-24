const mongoose = require("mongoose");

// Defining a schema
const favouriteSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  favouriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie", required: true }],
});

// Creating a model
const Favourite = mongoose.model("Favourite", favouriteSchema);

module.exports = Favourite;

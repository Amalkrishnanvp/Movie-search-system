const mongoose = require("mongoose");

// Defining a schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
});

// Creating a model
const User = mongoose.model("User", userSchema);

module.exports = User;

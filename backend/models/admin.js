const mongoose = require("mongoose");

// Defining a schema
const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
});

// Creating a model
const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;

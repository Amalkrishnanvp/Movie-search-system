const mongoose = require("mongoose");
require("dotenv").config();

// Connection string
const uri = process.env.MONGO_URI;

const connectToDb = async () => {
  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("Connection error:", err);
  }
};

module.exports = { connectToDb };

const express = require("express");
const app = express();
const port = process.env.port || 4000;
const hbs = require("hbs");
const path = require("path");
const { connectToDb } = require("./config/connection");
const session = require("express-session");
const adminCreation = require("./adminCreation");

// Register a helper to add 1 to the index
hbs.registerHelper("addOne", (index) => {
  return index + 1;
});

// Register a helper to check if a value is in an array
hbs.registerHelper(
  "isMovieInFavourites",
  function (movieId, moviesArray, options) {
    return moviesArray.includes(movieId.toString())
      ? options.fn(this)
      : options.inverse(this);
  }
);

// Register a helper to check if a value is in an array
hbs.registerHelper("isFavourite", function (favourites, tmdbId, options) {
  const found = favourites.some((movie) => movie.tmdbId === tmdbId);
  return found ? options.fn(this) : options.inverse(this);
});

// Set view engine to hbs
app.set("view engine", "hbs");

// Set the views directory
app.set("views", path.join(__dirname, "../frontend/views"));

// Register the layout directory
app.set("view options", { layout: "../views/layouts/layout" });

// Register the partials directory
hbs.registerPartials(path.join(__dirname, "../frontend/views/partials"));

// Import routes
const userRouter = require("./routes/userRoutes");
const adminRouter = require("./routes/adminRoutes");
const authRouter = require("./routes/authRoutes");
const movieRouter = require("./routes/movieRoutes");

// Serve static files from 'public' folder
app.use(express.static("../frontend/public"));

// Parse json bodies
app.use(express.json());

// Middleware to Parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Session setup
app.use(
  session({
    secret: "Key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// Redirect base request to /user
app.get("/", async (req, res) => {
  res.redirect("/user");
});

// Use routes
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/auth", authRouter);
app.use("/movie", movieRouter);

const startServer = async () => {
  try {
    // Connect to db
    await connectToDb();
    await adminCreation.createAdmin();

    // Start server
    app.listen(port, () => {
      console.log(`Server started running on port: ${port}`);
    });
  } catch (error) {
    console.error("Failed to connect to DB, exiting...", error);
    process.exit(1);
  }
};

startServer();

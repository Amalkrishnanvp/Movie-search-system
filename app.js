const express = require("express");
const app = express();
const port = 4000;
const hbs = require("hbs");
const path = require("path");
const { connectToDb } = require("./config/connection");
const session = require("express-session");

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

// Set view engine to hbs
app.set("view engine", "hbs");

// Set the views directory
app.set("views", path.join(__dirname, "views"));

// Register the layout directory
app.set("view options", { layout: "layouts/layout" });

// Register the partials directory
hbs.registerPartials(path.join(__dirname, "views/partials"));

// Import routes
const userRouter = require("./routes/userRoutes");
const adminRouter = require("./routes/adminRoutes");
const authRouter = require("./routes/authRoutes");
const movieRouter = require("./routes/movieRoutes");

// Serve static files from 'public' folder
app.use(express.static("public"));

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

// Connect to db
connectToDb();

// Use routes
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/auth", authRouter);
app.use("/movie", movieRouter);

// Start server
app.listen(port, () => {
  console.log(`Server started running on port: ${port}`);
});

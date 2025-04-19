const express = require("express");
const app = express();
const port = 4000;
const hbs = require("hbs");
const path = require("path");
const { connectToDb } = require("./config/connection");

// Register a helper to add 1 to the index
hbs.registerHelper("addOne", (index) => {
  return index + 1;
});

// Set view engine to hbs
app.set("view engine", "hbs");

// Set the views directory
app.set("views", path.join(__dirname, "views"));

// Register the layout directory
app.set("view options", { layout: "layouts/layout" });

// Register the partials directory
hbs.registerPartials(path.join(__dirname, "views/partials"));

// Import routes
const userRouter = require("./routes/user");
const adminRouter = require("./routes/admin");

// Serve static files from 'public' folder
app.use(express.static("public"));

// Parse json bodies
app.use(express.json());

// Middleware to Parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Connect to db
connectToDb();

// Use routes
app.use("/", userRouter);
app.use("/admin", adminRouter);

// Start server
app.listen(port, () => {
  console.log(`Server started running on port: ${port}`);
});

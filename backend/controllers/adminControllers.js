const movieHelpers = require("../helpers/movieHelpers");

module.exports = {
  // Get home page
  getAdminPanel: async (req, res) => {
    try {
      // Access if session exists
      let user = req.session.user;
      // console.log("User session: ", user);

      if (!user || user.role !== "admin") {
        return res.redirect("/auth/login");
      }

      // Call function to get all movies from database
      // const movies = await movieHelpers.getAllMoviesFromDb();

      const moviesCount = await movieHelpers.getMoviesCount();
      console.log("Movies count: ", moviesCount);

      res.render("admin/admin-dashboard", {
        user,
        moviesCount,
        isAdmin: user && user.role === "admin",
        layout: "layouts/adminLayout",
      });
    } catch (error) {
      console.error("Error rendering homepage:", err);
      return res.status(500).send("Internal Server Error");
    }
  },

  // Get movies list page
  getMoviesList: async (req, res) => {
    // Access if session exists
    let user = req.session.user;
    // console.log("User session: ", user);

    if (!user) {
      return res.redirect("/auth/login");
    }

    // Call function to get all movies from database
    const movies = await movieHelpers.getAllMoviesFromDb();
    // console.log("Movies: ", movies);
    const moviesCount = await movieHelpers.getMoviesCount();

    res.render("admin/view-movies", {
      user,
      movies,
      moviesCount,
      layout: "layouts/adminLayout",
    });
  },

  // Admin dashboard
  getAdminDashboard: async (req, res) => {
    // Access if session exists
    let user = req.session.user;
    // console.log("User session: ", user);

    if (!user) {
      return res.redirect("/auth/login");
    }

    // Call function to get all movies from database
    const movies = await movieHelpers.getAllMoviesFromDb();
    // console.log("Movies: ", movies);
    const moviesCount = await movieHelpers.getMoviesCount();

    res.render("admin/admin-dashboard", {
      user,
      moviesCount,
      layout: "layouts/adminLayout",
    });
  },

  // User management page
  getUserManagement: async (req, res) => {
    // Access if session exists
    let user = req.session.user;
    // console.log("User session: ", user);

    if (!user || user.role !== "admin") {
      return res.redirect("/auth/login");
    }

    // Call function to get all users from database
    const users = await movieHelpers.getAllUsersFromDb();
    console.log("Users: ", users);
    const moviesCount = await movieHelpers.getMoviesCount();

    res.render("admin/user-management", {
      user,
      users,
      moviesCount,
      layout: "layouts/adminLayout",
    });
  },

  // Call function to get user favourites
  getUserFavourites: async (req, res) => {
    // Access if session exists
    let user = req.session.user;
    // console.log("User session: ", user);

    if (!user || user.role !== "admin") {
      return res.redirect("/auth/login");
    }

    const userId = req.params.userId;
    console.log("User ID: ", userId);

    // Call function to get all users from database
    const userFavourites = await movieHelpers.getAllFavouritesFromDb(userId);
    // console.log("User Favourites: ", userFavourites);
    const favouriteMovies = userFavourites.favouriteMovies;
    const moviesCount = await movieHelpers.getMoviesCount();

    if (!favouriteMovies || favouriteMovies.length === 0) {
      return res.render("admin/no-favourites", {
        user,
        moviesCount,
        layout: "layouts/adminLayout",
      });
    }

    res.render("admin/user-favourites", {
      user,
      favouriteMovies,
      moviesCount,
      layout: "layouts/adminLayout",
    });
  },
};

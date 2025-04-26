const movieHelpers = require("../helpers/movieHelpers");

module.exports = {
  // Get home page
  getAdminPanel: async (req, res) => {
    // Access if session exists
    let user = req.session.user;
    // console.log("User session: ", user);

    if (!user) {
      return res.redirect("/auth/login");
    }

    // Call function to get all movies from database
    // const movies = await movieHelpers.getAllMoviesFromDb();

    res.render("admin/admin-panel", {
      user,
      isAdmin: user && user.role === "admin",
      // movies,
    });
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

    res.render("admin/view-movies", {
      user,
      isAdmin: user && user.role === "admin",
      movies,
      layout: "layouts/adminLayout",
    });
  },
};

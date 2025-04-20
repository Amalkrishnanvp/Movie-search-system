const movieHelpers = require("../helpers/movieHelpers");

module.exports = {
  // Get home page
  getHomepage: async (req, res) => {
    // Access if session exists
    let user = req.session.user;

    // Call function to get all movies from database
    const movies = await movieHelpers.getAllMoviesFromDb();

    res.render("admin/view-movies", {
      user,
      isAdmin: user && user.role === "admin",
      movies,
    });
  },
};

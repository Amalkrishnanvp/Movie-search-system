const express = require("express");
const router = express.Router();
const userController = require("../controllers/userControllers");

const verifyLogin = (req, res, next) => {
  if (req.session.loggedIn) {
    next();
  } else {
    res.redirect("/auth/login");
  }
};

/* GET - Render home page */
router.get("/", userController.renderHomepage);

/*GET - Get movies */
router.get("/movies", userController.getMovies);

/* POST - Add to favourites */
router.post("/add-to-favourites", userController.addToFavourites);

/* GET - Render favourite movies page */
router.get("/favourites", userController.renderFavouritesPage);

/* POST - Remove from favourites */
router.post("/remove-from-favourites", userController.removeFromFavourites);

/* POST - Suspend user */
router.post("/suspend", userController.suspendUser);

module.exports = router;

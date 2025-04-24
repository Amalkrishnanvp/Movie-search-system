const express = require("express");
const router = express.Router();
const userController = require("../controllers/userControllers");

/* GET - Render home page */
router.get("/", userController.renderHomepage);

/* GET - Add to favourites */
router.post("/add-to-favourites", userController.addToFavourites);

/* GET - Render favourite movies page */
router.get("/favourites", userController.renderFavouritesPage);

module.exports = router;

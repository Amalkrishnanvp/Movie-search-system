const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminControllers");

/* GET - Render home page, get existing movies from database */
router.get("/", adminController.getAdminPanel);

/* GET - Movies list page */
router.get("/movies", adminController.getMoviesList);

module.exports = router;

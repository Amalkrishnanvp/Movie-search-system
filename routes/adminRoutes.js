const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminControllers");

/* GET - Render home page, get existing movies from database */
router.get("/", adminController.getAdminPanel);

/* GET - Movies list page */
router.get("/movies", adminController.getMoviesList);

/* GET - Admin Dashboard */
router.get("/dashboard", adminController.getAdminDashboard);

/* GET - User management page */
router.get("/user-management", adminController.getUserManagement);

/* GET - Get user favourites */
router.get("/user-favourites/:userId", adminController.getUserFavourites);

module.exports = router;

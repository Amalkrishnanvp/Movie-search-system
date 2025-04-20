const express = require("express");
const router = express.Router();
const authController = require("../controllers/authControllers");

/* GET - Render sign up page */
router.get("/signup", authController.renderSignupPage);

/* POST - Handle sign up logic */
router.post("/signup", authController.registerUser);

/* GET - Render login page */
router.get("/login", authController.renderLoginPage);

/* POST - Handle login logic */
router.post("/login", authController.loginUser);

/* GET - Render Log out page */
router.get("/logout", authController.logoutUser);

module.exports = router;

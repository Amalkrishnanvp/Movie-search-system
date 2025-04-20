const userHelpers = require("../helpers/userHelpers");

module.exports = {
  // Function to render signup page
  renderSignupPage: async (req, res, next) => {
    res.render("user/signup");
  },
  // Function to register user
  registerUser: async (req, res) => {
    // console.log("post signup");

    const data = req.body;
    console.log(data);

    // Pass user data to signup function
    const result = await userHelpers.doSignup(data);
    console.log(result);
    console.log(result.userData);

    if (result.message) {
      req.session.loggedIn = true;
      req.session.user = result.userData;
      res.redirect("/");
    } else {
      res.status(400).send(result.message);
    }
  },

  // Function to render login page
  renderLoginPage: (req, res) => {
    // render login page and products page based on logged in state
    if (req.session.loginErr) {
      res.render("user/login", {
        loginErr: req.session.loginErr,
        isLoginPage: true,
      });
      req.session.loginErr = false;
    }
    res.render("user/login", { isLoginPage: true });
  },

  // Function to handle user login
  loginUser: async (req, res) => {
    try {
      const data = req.body;

      const result = await userHelpers.doLogin(data);

      if (result.logged) {
        if (result.role === "admin") {
          req.session.loggedIn = true;

          // Save user data to session
          req.session.user = result.userData;

          res.redirect("/admin");
        } else if (result.role === "user") {
          req.session.loggedIn = true;

          // Save user data to session
          req.session.user = result.userData;

          res.redirect("/");
        } else {
          req.session.loginErr = true;
          res.redirect("/auth/login");
        }
      } else {
        req.session.loginErr = true;
        res.redirect("/auth/login");
      }
    } catch (error) {
      console.error("Error in login route: ", error);
      return res.status(400).send("Internal server error");
    }
  },

  // Function to log out user
  logoutUser: (req, res, next) => {
    // Destroy session when log out
    req.session.destroy();
    res.redirect("/");
  },
};

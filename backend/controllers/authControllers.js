const userHelpers = require("../helpers/userHelpers");

module.exports = {
  // Function to render signup page
  renderSignupPage: async (req, res, next) => {
    if (req.session.signUpErr) {
      return res.render("user/signup", {
        signUpErr: req.session.signUpErr,
        signUpErrMessage: req.session.signUpErrMessage,
        isSignupPage: true,
      });
      req.session.signUpErr = false;
    }
    res.render("user/signup", { isSignupPage: true });
  },
  // Function to register user
  registerUser: async (req, res) => {
    // console.log("post signup");

    const data = req.body;
    console.log(data);

    // Pass user data to signup function
    const result = await userHelpers.doSignup(data);
    console.log(result);
    // console.log(result.userData);

    if (result.success) {
      req.session.loggedIn = true;
      req.session.user = result.userData;
      res.redirect("/");
    } else {
      req.session.signUpErr = true;
      // Set error message in session
      req.session.signUpErrMessage = result.message;
      res.redirect("/auth/signup");
    }
  },

  // Function to render login page
  renderLoginPage: (req, res) => {
    // render login page and products page based on logged in state
    if (req.session.loginErr) {
      res.render("user/login", {
        loginErr: req.session.loginErr,
        loginErrMessage: req.session.loginErrMessage,
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

          return res.redirect("/admin");
        } else if (result.role === "user") {
          req.session.loggedIn = true;

          // Save user data to session
          req.session.user = result.userData;

          return res.redirect("/");
        } else {
          req.session.loginErr = true;
          req.session.loginErrMessage = result.message;
          return res.redirect("/auth/login");
        }
      } else {
        req.session.loginErr = true;
        req.session.loginErrMessage = result.message;
        return res.redirect("/auth/login");
      }
    } catch (error) {
      console.error("Error in login route: ", error);
      // Only send error response if no redirect has occurred
      if (!res.headersSent) {
        return res.status(500).send("Internal server error");
      }
    }
  },

  // Function to log out user
  logoutUser: (req, res, next) => {
    // Destroy session when log out
    req.session.destroy();
    res.redirect("/");
  },
};

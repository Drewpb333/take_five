// Requiring path to so we can use relative routes to our HTML files
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    // if (req.user) {
    //   console.log("its redirecting...")
    //   res.redirect("/");
    // }
    // res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      console.log("its redirecting...")
      res.redirect("/userlist");
    }
    // res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/userlist", isAuthenticated, function(req, res) {
    // res.sendFile(path.join(__dirname, "../public/members.html"));
    console.log("user authenticated");
  });

};














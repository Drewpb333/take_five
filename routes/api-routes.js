// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");
var contentFeed = require("../controllers/break-controller/break-controller.js");

module.exports = function (app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    console.log("logged in");
    res.status(200).end();
    // we need to actually just close the modal and show the main page.
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function (req, res) {
    db.user.create({
      userName: req.body.userName,
      passWord: req.body.passWord,
      firstName: req.body.firstName,
      lastName: req.body.lastName
    }).then(function ( newUser ) {
      // hide the modal.
      // show the main screen
      res.json({
        id: newUser.id,
        userName: newUser.userName,
        firstname: newUser.firstName,
        lastName: newUser.lastName
      });
    }).catch(function (err) {
      console.log(err);
      res.json(err);
      // res.status(422).json(err.errors[0].message);
    });
  });

  // Route for logging user out
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });


  //   // probably wont use this.
  //   // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
      console.log("you arent logged in!");
    }
    else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        userName: req.user.userName,
        id: req.user.id
      });
    }
  });

  //returns newsfeed
  app.get("/api/newsfeed", function (req, res) {
    contentFeed.newsFeed(function (newsItems) {
      res.json(newsItems);
    })
  })

  //returns redditFeed
  app.get("/api/redditfeed", function (req, res) {
    contentFeed.redditFeed(function (redditItems) {
      res.json(redditItems);
    })
  })
}




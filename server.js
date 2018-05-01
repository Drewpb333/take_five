// Requiring necessary npm packages
var express = require("express");
var bodyParser = require("body-parser");
var session = require("express-session");
var sequelize = require("sequelize");
// Requiring passport as we've configured it
var passport = require("./config/passport");

// Setting up port and requiring models for syncing
var PORT = process.env.PORT || 8080;
var db = require("./models");

// Creating express app and configuring middleware needed for authentication
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "taako", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Requiring our routes
require("./routes/auth-routes.js")(app);
require("./routes/api-routes.js")(app);

// sync database
db.sequelize.sync().then(function () {

    app.listen(PORT, function (err) {
        if (!err) {
            console.log("App listening on PORT " + PORT);
        }
        else {
            console.log(err);
            console.log("There was an error in the sync");
        }


    })

}).catch(function (err) {
    console.log("error: " + err);
    console.log("theres something wrong with your sync");
})
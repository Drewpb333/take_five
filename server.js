// requirements
var express = require("express");
var app = express();
var passport = require("passport");
var session = require("express-session");
var bodyParser = require("body-parser");
var env = require("dotenv").load();
var exphbs = require("express-handlebars");
var authController = require("./controllers/auth-controller.js");

// PORT setup
var PORT = process.env.PORT || 8080;

// Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// for passport
app.use(session({secret: 'taako', resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

//models
var models = require("./models");

// routes
var authRoute = require("./routes/auth-routes.js")(app, passport);
// will need a route for html routing
// will need a route for api routing

// load passport strats
require("./config/passport/passport.js")(passport, models.user);


// sync database
models.sequelize.sync().then(function(){

    app.listen(PORT, function(err){
        if (!err) {
            console.log("App listening on PORT " + PORT);
        }
        else {
            console.log(err);
            console.log("There was an error in the sync");
        }


    })

}).catch(function(err) {
    console.log("error: " + err);
    console.log("theres something wrong with your sync");
})
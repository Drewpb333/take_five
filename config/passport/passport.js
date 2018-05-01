var bCrypt = require('bcrypt-nodejs');

var connection = require("../connection.js");

var User = require("../../models/user.js");
module.exports = function (passport, user) {

    // var User = user;
    var LocalStrategy = require("passport-local").Strategy;

    // serialize
    // determining what user information should be saved for the session
    passport.serializeUser(function(user, done){
        done(null, user.id);
    })

    // deserialize
    // using the session stored information to attach the entire object as req.user
    // passport.deserializeUser(function(id, done) {
    //     User.findById(id).then(function(user){
    //         if (user) {
    //             done(null, user.get());
    //         }
    //         else {
    //             done(user.errors, null);
    //         }
    //     })
    // })
    passport.deserializeUser(function(id, done) {
        connection.query("SELECT * FROM users WHERE id = " + id, function(err, rows) {
            done(err, rows[0]);
        })
    })

    // allowing passport to use local-signup to create a new strat.
    passport.use("local-signup", new LocalStrategy(
        {
            
            usernameField: "userName",
            passwordField: "passWord",
            // allows us to pass the entire request back to the callback for use elsewhere.
            passReqToCallback: true

        },
            // function to create the hashed password that will be compared
            function (req, userName, passWord, done) {
                var generateHash = function (passWord) {
                    // telling the function what data will be hashed and how many times to process the data in genSaltSync(8)
                    return bCrypt.hashSync(passWord, bCrypt.genSaltSync(8), null);
                }
                // fining by userName
                User.findOne({
                    where: {
                        userName: userName
                    }
                // comparing all logged userNames to the entered username to check if its already taken
                }).then(function (user) {
                    // if userName is already taken then tell them its taken and have them try again.
                    if (user) {
                        return done(null, false, {
                            message: "that username is already taken"
                        });

                    }
                    // if the username does not exist then we will create the user profile
                    else {
                        // creating a variable called userPassword equal to the hashed password.
                        var userPassword = generateHash(passWord);
                        // creating a variable called data equal to all of the user data entered.
                        var data = {
                            userName: req.body.userName,
                            passWord: req.body.passWord,
                            firstName: req.body.firstName,
                            lastName: req.body.lastName

                        };
                        // creating the user using the data variable then promising a function to create the user.
                        User.create(data).then(function (newUser, created) {
                            // creating the new user
                            if (newUser) {
                                connection.query("INSERT INTO users (userName, passWord) VALUES ('" + userName + "', '" + passWord + "')", function(err, rows){
                                    if (err) throw err;
                                })
                                return created(null, newUser);

                            }
                            // not creating the new user.
                            if (!newUser) {
                                return created(null, false);
                            }
                        });
                    }
                })
        }

    ));
    // local signin
    // allowing passport to use local-signin to create a new instance of LocalStrategy
    passport.use('local-signin', new LocalStrategy({
        usernameField: 'userName',
        passwordField: 'passWord',
        // allowing us to pass the entire request back to the callback for later use.
        passReqToCallback: true
    },
    // function to compare passwords and usernames
    function(req, userName, passWord, done) {

        var User = user;
        // comparing entered password with logged password
        var isValidPassword = function(userPassword, passWord) {
            // comparing the two passWords
            return bCrypt.compareSync(passWord, userPassword);
        }
        // finding the entry in the database to find the user with the matching userName
        User.findOne({
            where: {
                userName: userName
            }
        // comparing the user information gathered from user to tell the user if they entered any information wrong in the signin
        }).then(function(user) {
            if (!user) {
                return done(null, false, {
                    message: "username does not exist"
                });
            }
            if (!isValidPassword(user.passWord, passWord)) {
                return done(null, false, {
                    message: "Incorrect Password"
                });
            }
            // getting all of the user information if everything they entered is correct.
            var userInfo = user.get();
            return done(null, userInfo);
        // catching errors if there are any and console logging any errors.
        }).catch(function(err){
            console.log("Error: " + err );
            return done(null, false, {
                message: "An error occurred on your signin"
            });
        });
    }));


}
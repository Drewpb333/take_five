var authController = require("../controllers/auth-controller.js");

module.exports  = function(app, passport){
    // gets the information from the signup page
    app.get('/signup', authController.signUp);
    
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/dashboard',
        failureRedirect: '/signup'
    }));

    // gets the information from the sign in page
    app.get('/signin', authController.signIn);
    // populates the signup page

    app.post('/signin', passport.authenticate('local-signin', {
        successRedirect: '/dashboard',
        failureRedirect: '/signin'
    }));
    
    app.get('/dashboard', isLoggedIn, authController.dashBoard);

    app.get('logout',authController.logOut);


    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect('/signin ');
    };


};

// these routes should only handle authentication.














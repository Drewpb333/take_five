// will probably need a controller for the html displays

// helper functions to make certain things take you to a certain page... maybe not going here.

// something will need to be passed as an argument into the function.
module.exports = function() {
    // get route to display the login page.
    app.get("/", function(req, res) {
        // might need to change the filename that it sends.
        res.sendFile(path.join(__dirname, "..public/html/index.html"))
    })

    // get route to get the information for the home page
    app.get('/home', function(req, res) {
        res.sendFile(path.join(__dirname, "../public/html/home.html"));
    })
    
    // get route to get the information for the timer page
    // app.get('/timer', function(req, res) {
    //     res.sendFile(path.join(__dirname, "../public/html/timers.html"));
    // })

    // get route to get the information from the break content page
    app.get('/break-content', function(req, res) {
        res.sendFile(path.join(__dirname, "../public/html/breakContent.html"));
    })
};
    


// what routes do we actually need and where do they need to go?
// route for going to the login screen
    // function logout should take you here.
    // accessing the webpage should take you here as well.
// route for user 'home page' where they make their timers.
    // login function should take you here
    // the end of a full timer should take you here.
// route for the 'timer-page' where the timer is able to be viewed 
    // create timer function should take you here
    // after the break timer ends should take you here.
// route for the 'break-timer' where the break time content is viewed.
    // view break function should take you here
    // end of every work timer should take you here.
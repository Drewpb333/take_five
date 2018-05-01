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

// will probably need a controller for the html displays

// helper functions to make certain things take you to a certain page... maybe not going here.

// something will need to be passed as an argument into the function.
module.exports = function() {
    // get route to display the login page.
    app.get("/", function(req, res) {
        
        res.sendFile(path.join(__dirname, "../public/index.html"))

    })

};

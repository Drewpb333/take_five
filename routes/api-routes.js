var contentFeed = require("../controllers/break-controller/break-controller.js");

module.exports = function (app) {
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


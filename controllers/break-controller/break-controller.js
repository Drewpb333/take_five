var request = require("request");
// var spotify = new Spotify(keys.spotify);

//both will be called when five minute break starts

//BBC News API provided by News API
//make sure to include "Powered by News API in HTML"
var contentFeed = {
    newsFeed: function(cb) {
        request("https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=b14a7ceb6b5a4ed0b845497dca2a402d", function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var rawObj = JSON.parse(body);
                var articles = rawObj["articles"];
                // parent object that is returned in POST
                var articlesObj = {};
                //articles are stored in an array
                for (var j = 0; j < articles.length; j++) {
                    var newArticle = {};
                    newArticle.title = articles[j].title;
                    newArticle.description = articles[j].description;
                    newArticle.url = articles[j].url;
                    newArticle.urlToImage = articles[j].urlToImage;
                    articlesObj["Article " + j] = newArticle;
                }


                console.log(articlesObj);
              
                cb(articlesObj);
            }
        })
    },


    // obtains popular subreddit
    redditFeed: function(cb) {
        request("https://www.reddit.com/r/popular.json", function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var rawObj = JSON.parse(body);
                var subReddits = rawObj["data"]["children"];
                // parent object that is returned in POST
                var redditObj = {};
                //needed because articles are stored in an array
                for (var j = 0; j < 10; j++) {
                    var newThread = {};
                    newThread.title = subReddits[j].data.title;
                    newThread.permalink = subReddits[j].data.permalink;
                    newThread.url = subReddits[j].data.url;
                    newThread.thumbnail = subReddits[j].data.thumbnail;
                    redditObj["Thread " + j] = newThread;
                }
                console.log(redditObj);

                cb(redditObj);
            }
        })
    }
}



// contentFeed.newsFeed(function(obj){console.log(obj)});
// contentFeed.redditFeed(function(obj){console.log(obj)});

module.exports = contentFeed;


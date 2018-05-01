// we need to be able to get these functions from the break controller
// 

//returns newsfeed
app.get("api/newsfeed", function(req, res){
    newsFeed(function(newsItems){
        res.json(newsItems);
    })
 })
 
 //returns redditFeed
 app.get("api/redditfeed", function(req, res){
     redditFeed(function(redditItems){
         res.json(redditItems);
     })
 })
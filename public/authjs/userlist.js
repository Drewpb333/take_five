$(document).ready(function() {
    // This file just does a GET request to figure out which user is logged in
    $.get("/api/user_data").then(function(data) {
      console.log("User: " + data.userName + "logged in");
    });
  });
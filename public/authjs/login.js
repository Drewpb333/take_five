$(document).ready(function() {
    // Getting references to our form and inputs
    var loginBtn = $("#login-btn");
    var userNameInput = $("userName-signIn");
    var passwordInput = $("passWord-SignIn");
  
    // When the for is submitted, we validate there's an email and password entered
    loginBtn.on("click", function(event) {
      event.preventDefault();
      var userData = {
        userName: userNameInput.val().trim(),
        passWord: passWordInput.val().trim()
      };
  
      if (!userData.userName || !userData.passWord) {
        return;
      }
  
      // If we have an email and password we run the loginUser function and clear the form
      loginUser(userData.userName, userData.passWord);
      userNameInput.val("");
      passWordInput.val("");
    });
  
    // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
    function loginUser(userName, passWord) {
      $.post("/api/login", {
        userName: userName,
        passWord: passWord
      }).then(function(data) {
        window.location.replace(data);
        // If there's an error, log the error
      }).catch(function(err) {
        console.log(err);
      });
    }
  
});
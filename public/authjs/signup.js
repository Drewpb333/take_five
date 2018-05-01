$(document).ready(function() {
    // Getting references to our form and input
    var signUpBtn = $("#signUp-btn");
    var userNameInput = $("#userName-signUp");
    var passWordInput = $("#passWord-signUp");
    var firstNameInput = $("#firstName-signUp");
    var lastNameInput = $("#lastName-signUp");
    console.log("are we getting here?");
    // When the signup button is clicked, we validate the input values are not blank
    signUpBtn.on("click", function(event) {
      console.log("signup was clicked");
      event.preventDefault();
      var userData = {
        userName: userNameInput.val().trim(),
        passWord: passWordInput.val().trim(),
        firstName: firstNameInput.val().trim(),
        lastName: lastNameInput.val().trim()
      };
  
      if (!userData.userName || !userData.passWord) {
        return;
      }
      // If we have an email and password, run the signUpUser function
      signUpUser(userData.userName, userData.passWord, userData.firstName, userData.lastName);
      userNameInput.val("");
      passWordInput.val("");
      firstNameInput.val("");
      lastNameInput.val("");
    });
  
    // Does a post to the signup route. If successful, we are redirected to the members page
    // Otherwise we log any errors
    function signUpUser(userName, passWord, firstName, lastName) {
      $.post("/api/signup", {
        userName: userName,
        passWord: passWord,
        firstName: firstName,
        lastName: lastName
      }).then(function(data) {
        window.location.replace(data);
        // If there's an error, handle it by throwing up a boostrap alert
      }).catch(handleLoginErr);
    }
  
    function handleLoginErr(err) {
      $("#alert .msg").text(err.responseJSON);
      $("#alert").fadeIn(500);
    }
});
  
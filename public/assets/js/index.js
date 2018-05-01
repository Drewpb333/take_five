//modal prompts 1 and 2 as well as input storage
$(document).ready(function () {
   



    //MODAL INPUT SECTION
    $('.feed').hide();
    $('#loginModalCenter').modal('show');
    $(document).on('click', '#login-btn', function () {
        // on sign in send request to login and populate all account stuff
        //login criteria
        var Username = $("#userName").val().trim();
        var passWord = $("#passWord").val().trim();
        console.log(Username, passWord);

    })
    

    $(document).on('click', '#noAcct-btn', function (event) {
        event.preventDefault();
        $('#loginModalCenter').modal("hide");
        $('#signUpModal').modal('show');


    })


    // $(document).on('click', '#signUp-btn', function (event) {
    //     event.preventDefault();
    //     //new User Criteria
    //     var firstName = $("#nFirstName").val().trim();
    //     var lastName = $("#nLastName").val().trim();
    //     var dUserName = $("#nUserName").val().trim();
    //     var dPassword = $("#nPsw").val().trim();
    //     console.log(firstName, lastName, dUserName, dPassword);
    // })
    










    function myFunction() {
        var x = document.getElementById("inputTask").value;
        document.getElementById("myAgenda").innerHTML += "<br>" + x + "<br>";
    }
});


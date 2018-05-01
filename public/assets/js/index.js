//modal prompts 1 and 2 as well as input storage
$(document).ready(function () {

    //login criteria
    var Username = $("#userName");
    var passWord = $("#passWord");
    console.log (Username, passWord);


    //new User Criteria
    var firstName = $("#nFirstName");
    var lastName = $("#nLastName");
    var dUserName = $("#nUserName");
    var dPassword = $("#nPsw");
    console.log(firstName, lastName, dUserName, dPassword);

    $('.feed').hide();
    $('#loginModalCenter').modal('show');
    $(document).on('click', '#login-btn', function () {
        // on sign in send request to login and populate all account stuff



    });

    // $(document).on('click', '#close-btn', function () {
    //     console.log("test");
    //     $('#loginModalCenter').modal('hide');
    //     $("#signUpModal").modal("hide");
    // });

    $(document).on('click', '#signup-btn', function () {
        $('#loginModalCenter').modal("hide");
        $('#signUpModal').modal('show');
    })

    function myFunction() {
        var x = document.getElementById("inputTask").value;
        document.getElementById("myAgenda").innerHTML += "<br>" + x + "<br>";
    }
});


//modal prompts 1 and 2 as well as input storage
$(document).ready(function () {
    //MODAL INPUT description
    $('.feed').hide();
    $('#loginModalCenter').modal('show');
    $(document).on('click', '#login-btn', function () {
        // on sign in send request to login and populate all account stuff



    });
<<<<<<< HEAD
=======
    
    $(document).on("click", '#login-btn', function() {
        $('#loginModalCenter').modal("hide");
    })
>>>>>>> 2a8d1e376b209783d29e4c9ff37da54e5d4a43de
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

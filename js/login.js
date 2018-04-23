$(document).ready(() => {

    $("#submitBtn").click(()=>{
        const username = $("#usernameBox").val();
        const password = $("#passwordBox").val();

        $.get("http://localhost:3000/login", function(result){
            for(var i = 0; i<result.length; i++){
                if(username == result[i].username && password == result[i].password){
                    window.location = "index.html";
                    return;
                }
            }
            alert("Du har enten tastet noe feil, eller så eksisterer ikke brukeren.");

        });
    });






});
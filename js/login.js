$(document).ready(() => {

    $("#submitBtn").click(()=>{
        const username = $("#usernameBox").val();
        const password = $("#passwordBox").val();

        $.get("http://localhost:3000/login", function(result){
            for(var i = 0; i<result.length; i++){
                if(username == result[i].username && password == result[i].password){
                    if (result[i].stilling == "Translator"){
                        window.location = "translator.html";
                        return;
                    }
                    else if(result[i].stilling == "Product Manager"){
                        window.location = "index.html";
                        return;
                    }
                    else{
                        window.location = "contentmanager.html";
                        return;
                    }
                }
            }
            alert("Du har enten tastet noe feil, eller så eksisterer ikke brukeren.");

        });
    });






});
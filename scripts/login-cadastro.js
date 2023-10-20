var btnSignin = document.querySelector("#signin");
var btnSignup = document.querySelector("#signup");

var body = document.querySelector("body");


btnSignin.addEventListener("click", function () {
   document.body.style.background = "rgb(201, 229, 201)"
   body.className = "sign-in-js"; 
   
   });

btnSignup.addEventListener("click", function () {
    document.body.style.background = "rgb(237, 239, 218)"
    body.className = "sign-up-js";
    
    })
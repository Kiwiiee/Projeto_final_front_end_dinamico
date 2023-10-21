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

// setInterval(function jumpscare(){
//    let img = document.createElement("img")
//    img.src = "https://static.vecteezy.com/system/resources/previews/011/653/824/original/yellow-cut-guava-fruit-png.png"
//    img.setAttribute("id", "goiaba");
//    document.body.appendChild(img)
// } , 30000)
// setInterval(function jumpscareout(){
//    let img = document.getElementById("goiaba")
//    img.remove()
// } , 30010)
 


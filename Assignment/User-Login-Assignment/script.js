document.getElementById("btn").addEventListener("click",login);
document.getElementById("forget").addEventListener("click",find)


//function building
function login() {
    //un = username  pw = password
    let un = document.getElementById("username").value;
    let pw = document.getElementById("password").value;

    //Used to check if it get the right vale
    console.log(un)
    console.log(pw)
   
    //Check if it is correct
    if (un === "admin" && pw === "1234") {
        //tell the user if it is correct
        
        alert("Login successful")
        window.location.replace("https://chanceyang.com")
        
    } else if (un !== "admin" && pw === "1234") {
        alert("Invalid Username")
    } else if (un === "admin" && pw !== "1234") {
        alert("Invalid Password")
    } else {
        alert("Invalid Username and Password")
    }
}


function find() {
    alert('Your Username is:"admin"\n Your Password is:"1234"')

}
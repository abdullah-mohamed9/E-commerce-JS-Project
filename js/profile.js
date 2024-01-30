
document.getElementById("logout2").addEventListener("click" , ()=>{
  window.location.href = "../html/login.html";
   // Remove user data from localStorage
   localStorage.removeItem("user");
})
document.addEventListener("DOMContentLoaded", function() {  
  // get thr user from localStorage  
var user = JSON.parse(localStorage.getItem("user"));
var userName = user.name;
var email = user.email;
// get username input from form and set value to userName
document.getElementById("username").value = userName;
document.getElementById("e-mail").value = email;
});

document.getElementById("submit").addEventListener("click" , ()=>{

var user = JSON.parse(localStorage.getItem("user"));
var userName  = document.getElementById("username").value;


//Validate Name //
    var input = userName;
    var regex = /^[a-zA-Z\s\-]+$/; 

    if (!regex.test(input)) {
        alert("user cant be number") 
    }
var email = document.getElementById("e-mail").value; 
user.name = userName;
user.email = email;
localStorage.setItem("user", JSON.stringify(user));

})


//password

document.getElementById("submit").addEventListener("click", function updatePassword() {
    var user = JSON.parse(localStorage.getItem("user"));
 
    var currentPassword = document.getElementById("Currentpassword").value;
    var newPassword = document.getElementById("Newpassword").value;
    var confirmNewPassword = document.getElementById("Confirmnewpassword").value;
    var errorMessage = document.getElementById("errorMessage");

    if (newPassword === confirmNewPassword) {
        // Update user's password
        user.password = confirmNewPassword;

        // Store the updated user object back into local storage
        localStorage.setItem("user", JSON.stringify(user));
        var users = JSON.parse(localStorage.getItem("users"));
    }
});

document.getElementById("submit").addEventListener("click", function updatePassword() {
    var user = JSON.parse(localStorage.getItem("user"));
    var users = JSON.parse(localStorage.getItem("users"));

    var currentPassword = document.getElementById("Currentpassword").value;
    var newPassword = document.getElementById("Newpassword").value;
    var confirmNewPassword = document.getElementById("Confirmnewpassword").value;
    var newemail = document.getElementById("e-mail").value; 
    var newusername = document.getElementById("username").value; 
    var errorMessage = document.getElementById("errorMessage");

    if (newPassword === confirmNewPassword) {
        // Update user's password
        user.password = confirmNewPassword;

        // Update user information in the users array
        var currentUserIndex = users.findIndex(function(userItem) {
            return userItem.id === user.id;
        });

        if (currentUserIndex !== -1) {
            users[currentUserIndex].password = newPassword;
            // Update other user information if needed (e.g., email, name)
            users[currentUserIndex].email = newemail;
            users[currentUserIndex].name = newusername;

            // Store the updated users array back into local storage
            localStorage.setItem("users", JSON.stringify(users));

            // Store the updated user object back into local storage
            localStorage.setItem("user", JSON.stringify(user));
            alert(" updated successfully!");
            //clear input fields
            document.getElementById("Currentpassword").value = "";
            document.getElementById("Newpassword").value = "";
            document.getElementById("Confirmnewpassword").value = "";
            
           
        } else {
            alert("User not found in users array!");
        }
    } 
});

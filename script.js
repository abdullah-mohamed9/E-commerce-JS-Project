let userName = document.querySelector("#user");
let password = document.querySelector("#pass");
let submit = document.querySelector("#login-button");
let user_signup = document.querySelector("#user-signup");
let password_signup = document.querySelector("#pass-signup");
let password_signup_val = document.querySelector("#pass-signup-val");
let email = document.querySelector("#email");
let select_type = document.querySelector("#select-type");
let signup_button = document.querySelector("#signup_button");

let invaild_pas = document.querySelector("#invaild_pas");
let invaild_email_pas = document.querySelector("#invaild_email_pas");
let email_exist = document.querySelector("#email_exist");
let signup_done = document.querySelector("#signup_done");
let eye = document.querySelector("#eye");
let eye_signup = document.querySelector("#eye-signup");
let eye_signup_val = document.querySelector("#eye-signup-val");



let users = [{
    id: 1,
    name: "abdullah",
    email: "abdullah@gmail.com",
    password: "12345678",
    type: "admin"
}];

if (localStorage.getItem("users") != null) {
    users = JSON.parse(localStorage.getItem("users"));
} else {
    localStorage.setItem("users", JSON.stringify(users));
}

let nameRegex = /^[a-zA-Z ]{3,}$/;
let emailRegex = /^[a-zA-Z0-9_.]{4,}@(yahoo|gmail|hotmail|outlook).(com|net|eg)$/;


function User(id, name, email, password, type) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.type = type;
}

submit.addEventListener("click", function (e) {


    if (validateLogin()) {
        e.preventDefault();
        password.style.border = "solid 3px green";
        userName.style.border = "solid 3px green";
        //////sweeeeeeeeeeeeeeeeeeeeet aleeeeeeeeeeeeeeeeeeeeeeert

        window.location.href = "product.html";
    }
});

signup_button.addEventListener("click", function (e) {

    if (validateSignup()) {
        e.preventDefault();
        let newUser = new User(users.length + 1, user_signup.value, email.value, password_signup.value, select_type.value);
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));

        SignupDone();
        Swal.fire({
            title: "SignUp Confirmed!",
            text: "Welcome to ITI!",
            icon: "success",

        });
        console.log("valid");
    }
});
function SignupDone() {
    signup_done.innerText = "SignUp done"
    user_signup.value = '';
    password_signup.value = '';
    password_signup_val.value = "";
    email.value = "";
    user_signup.style.border = '';
    password_signup.style.border = '';
    password_signup_val.style.border = '';
    email.style.border = '';
}

function validateLogin() {

    if (userName.value.trim() === "") {
        userName.style.border = "solid 3px red";
    } else {
        userName.style.border = "solid 3px green";
    }

    if (password.value.trim() === "") {
        password.style.border = "solid 3px red";
    } else {
        password.style.border = "solid 3px green";
    }

    for (let i = 0; i < users.length; i++) {

        if (users[i].email === userName.value && users[i].password === password.value) {

            if (users[i].type == "customer") {
                console.log("user type is customer");

            } else if (users[i].type == "seller") {
                console.log("user type is seller");

            } else {
                console.log("user type is admin");
                
            }

            localStorage.setItem("user", JSON.stringify(users[i]));
            return true;
            break;
        } else {
            password.style.border = "solid 3px red";
            userName.style.border = "solid 3px red";
            invaild_email_pas.innerText = "invaild email or password";
        }
    }
    return false;

}

function validateSignup() {

    if (user_signup.value.trim() === "" || !nameRegex.test(user_signup.value)) {
        user_signup.style.border = "solid 3px red";
        return false;
    } else {
        user_signup.style.border = "solid 3px green";
    }

    if (password_signup.value.trim() === "" || password_signup.value.length < 8) {
        password_signup.style.border = "solid 3px red";
        invaild_pas.innerText = "password must be more than 8 char";
        return false;
    } else {
        password_signup.style.border = "solid 3px green";
        invaild_pas.innerText = "";
    }

    if (password_signup_val.value.trim() === "" || password_signup_val.value !== password_signup.value) {
        password_signup_val.style.border = "solid 3px red";
        return false;
    } else {
        password_signup_val.style.border = "solid 3px green";
    }

    if (email.value.trim() === "" || !emailRegex.test(email.value)) {
        email.style.border = "solid 3px red";
        return false;
    } else {
        for (let i = 0; i < users.length; i++) {
            if (users[i].email === email.value) {
                email.style.border = "solid 3px red";
                email_exist.innerText = "email is already exist";
                return false;
                break;
            } else {
                email.style.border = "solid 3px green";
                email_exist.innerText = "";
            }
        }
    }
    return true;
}



eye.addEventListener('click', function () {
    if (password.type == "password") {
        password.type = "text";
        eye.src = "images/showPass/eye-open.png";
    } else {
        password.type = "password";
        eye.src = "images/showPass/eye-close.png";
    }
});

eye_signup.addEventListener('click', function () {
    if (password_signup.type == "password") {
        password_signup.type = "text";
        eye_signup.src = "images/showPass/eye-open.png";
    } else {
        password_signup.type = "password";
        eye_signup.src = "images/showPass/eye-close.png";
    }
});

eye_signup_val.addEventListener('click', function () {
    if (password_signup_val.type == "password") {
        password_signup_val.type = "text";
        eye_signup_val.src = "images/showPass/eye-open.png";
    } else {
        password_signup_val.type = "password";
        eye_signup_val.src = "images/showPass/eye-close.png";
    }
});



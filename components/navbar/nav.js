
var body=document.getElementById("header")

let navbar=
`
<nav id="navBar" class="navbar navbar-expand-lg navbar-light bg-white py-3 fixed-top">
<div class="container ">
    <img src="images/logo1.png" alt="Logo Img">
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
        aria-label="Toggle navigation">
        <span><i id="bar" class="fa-solid fa-bars-staggered"></i></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto">
            <li class="nav-item">
                <a class="nav-link" href="index.html">Home</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="product.html">Products</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="../about_contact pages/about.html">About</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="../about_contact pages/contact.html">Contact Us</a>
            </li>
            <li class="nav-item">
               <a href="cart.html"><i class="fa-solid fa-shopping-cart"> </i>
               <span id="prod_count">0</span>
                </a> 
            </li>
            <li class="nav-item" id="login">
              <a  href="login.html"><i class="fa-solid fa-sign-in-alt"></i></a>  
            </li>
            <li class="nav-item">
             <a href="#"><i class="fa-solid fa-heart"></i></a>   
            </li>


            <i id="user" class="fa-solid fa-user-circle"></i> 

                 <!-- Profile Dropdown -->
                <li  class="nav-item dropdown">
                
                    <a id="Profile" class="nav-link dropdown-toggle" href="#" id="profileDropdown" role="button"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Profile
                    </a>
                    <div class="dropdown-menu" aria-labelledby="profileDropdown">
                        <a class="dropdown-item" href="#">My Account</a>
                        <a class="dropdown-item" href="#">Settings</a>
                        <div class="dropdown-divider"></div>
                        <a id="logout" class="dropdown-item" href="#">Logout</a>
                    </div>
                </li>
                <!-- End Profile Dropdown -->
        </ul>
    </div>
</div>
</nav>
`
body.innerHTML=navbar;

let userId;

// Check if localStorage has user data
if (localStorage.user != null) {
    userId = JSON.parse(localStorage.user);

    let numOfCart;
    let count=0;
    // Check if localStorage has cart data
    if (localStorage.cartData != null) {
        numOfCart = JSON.parse(localStorage.cartData);

        console.log(userId.id);

        for (let i = 0; i < numOfCart.length; i++) {
            if (userId.id == numOfCart[i].userId) {
                count+=Number(numOfCart[i].numOfItems);
                document.getElementById("prod_count").innerHTML = `<span>${count}</span>`;
                
            } 
        }
    }

    document.getElementById("login").style.display="none";
    document.getElementById("Profile").innerHTML =`<span>${userId.name}</span>`;


     // Logout functionality
     document.getElementById("logout").addEventListener("click", function () {
        // Remove user data from localStorage
        localStorage.removeItem("user");

        // Redirect to the index page
        window.location.href = "index.html";
    });
}else{
    document.getElementById("Profile").style.display="none";
    document.getElementById("user").style.display="none";
}

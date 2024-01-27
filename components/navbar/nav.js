
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
            <li class="nav-item">
              <a  href="login.html"><i class="fa-solid fa-sign-in-alt"></i></a>  
            </li>
            <li class="nav-item">
             <a href="#"><i class="fa-solid fa-heart"></i></a>   
            </li>
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
                // Assuming numOfItems is a property of each cart item
            } else {
                
            }
        }
    }
}

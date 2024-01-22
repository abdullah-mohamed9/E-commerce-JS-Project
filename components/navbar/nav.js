
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
                <a class="nav-link" href="about.html">About</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="contact.html">Contact Us</a>
            </li>
            <li class="nav-item">
              <a href="#"><i class="fa-solid fa-magnifying-glass"></i></a>  
            </li>
            <li class="nav-item">
               <a href="cart.html"><i class="fa-solid fa-shopping-cart"> </i></a> 
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
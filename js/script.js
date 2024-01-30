
var myproduct_container = document.getElementById("myproducts");
var p = JSON.parse(localStorage.getItem("products"));


for (var i in p) {
  var product = `<div class="pro ${p[i].category}">
<img onclick="location.href='productDetails.html' "src="${p[i].product_img}" alt="product img" />
<div class="des">
  <h5 class="product-name">${p[i].product_name}</h5>
  <div class="star">
    <i class="bi bi-star-fill"></i>
    <i class="bi bi-star-fill"></i>
    <i class="bi bi-star-fill"></i>
    <i class="bi bi-star-fill"></i>
    <i class="bi bi-star"></i>
  </div>
  <h4>${p[i].price}$</h4>
</div>
</div>`;
  myproduct_container.insertAdjacentHTML("beforeend", product);
}

//to retreive data from local storage//esraa
var numOfProducts = JSON.parse(localStorage.getItem("products")).length;
var ProductItem = JSON.parse(localStorage.getItem("products"));
window.addEventListener("load", function () {
  for (let i = 0; i < numOfProducts; i++) {
    //event listener
    document.getElementsByClassName("pro")[i].addEventListener("click", function () {
      let ID = 0;
      ID = (ProductItem[i].product_id);
      // Store the ID in localStorage
      localStorage.setItem('productID', ID);
      // Redirect to the productDetails.html page
      window.location.href = '../html/productDetails.html';
    });
  }
});
////////////////////////////////////

// filter categories by buttons
function filterProducts(category) {
  let buttons = document.querySelectorAll(".my-button");
  buttons.forEach((button) => {
    if (category.toLowerCase() == button.innerText.toLowerCase()) {
      button.classList.add("active-search");
    } else {
      button.classList.remove("active-search");
    }
  });

  let prods = document.querySelectorAll(".pro");
  prods.forEach((p) => {
    if (category == "all") {
      p.classList.remove("hide");
    } else if (p.classList.contains(category)) {
      // show the products of this category
      p.classList.remove("hide");
    } else {
      // hide other elements
      p.classList.add("hide");
    }
  });
}

var filter = document.getElementById("filter");
var buttons = document.getElementById("my-buttons");
// console.log(buttons.classList)
filter.onclick = function () {
  buttons.classList.toggle("hide")
}
//search button
let search = document.getElementById("search");
let mysearch_input = document.getElementById("search-input")
let mySearchFunction = () => {
  let searchInput = mysearch_input.value.toLowerCase();
  let category = document.querySelector(".active-search") ? document.querySelector(".active-search").innerText.toLowerCase() : "all";
  let prod_name = document.querySelectorAll(".product-name");
  let prod = document.querySelectorAll(".pro");

  prod_name.forEach((p, index) => {
    if ((p.innerText.toLowerCase().includes(searchInput) || searchInput === "") &&
      (category === "all" || prod[index].classList.contains(category))) {
      prod[index].classList.remove("hide");
    } else {
      prod[index].classList.add("hide");
    }
  });
};
search.addEventListener("click", mySearchFunction);
mysearch_input.addEventListener('input', mySearchFunction);

// to make it display all products when the page loaded
window.onload = () => {
  filterProducts("all");
};

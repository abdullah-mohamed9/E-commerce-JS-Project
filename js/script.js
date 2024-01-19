
var myproduct_container = document.getElementById("myproducts");


for (var i in products) {
  var product = `<div class="pro ${products[i].product_id}">
<img onclick="location.href='../html/productDetails.html?index=${i}' "src="${products[i].product_img}" alt="product img" />
<div class="des">
  <h5 class="product-name">${products[i].product_name}</h5>
  <div class="star">
    <i class="bi bi-star-fill"></i>
    <i class="bi bi-star-fill"></i>
    <i class="bi bi-star-fill"></i>
    <i class="bi bi-star-fill"></i>
    <i class="bi bi-star"></i>
  </div>
  <h4>${products[i].price}</h4>
</div>

</div>`;

  myproduct_container.insertAdjacentHTML("beforeend", product);
}

////////////////////////////////////////////////////////////////////////////////////////////
//search button
let search = document.getElementById("search");
let mysearch_input = document.getElementById("search-input")

mySearchFunction = () => {
  let search_input = document.getElementById("search-input").value;
  let prod_name = document.querySelectorAll(".product-name");
  let prod = document.querySelectorAll(".pro");

  prod_name.forEach((p, index) => {
    //check if text includes the search value
    if (p.innerText.toLowerCase().includes(search_input.toLowerCase())) {
      prod[index].classList.remove("hide");
    } else {
      // hide others
      prod[index].classList.add("hide");
    }
  });
}

search.addEventListener("click", mySearchFunction);
mysearch_input.addEventListener('input', mySearchFunction)

//////////////////////




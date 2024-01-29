function renderProduct() {                           //mohamed
  // Retrieve products from local storage
  const products = JSON.parse(localStorage.getItem("products"));

  // Get the element where you want to render the products
  const productsContainer = document.getElementById("products-container");
  ////console.log(productsContainer);


  const shoesContainer = document.getElementById("shoes-container");
  //console.log(shoesContainer);

  // Check if there are products in local storage
  if (products && products.length > 0) {
    // Clear existing content in the container
    let count = 0;
    for (let i = 0; i < products.length; i++) {
      let productHTML = `
        <div class="product text-center col-12 col-md-4 col-lg-3">
        <div class="Product_image">
        <img class="img-fluid mb-3" src="${products[i].product_img}" alt="product">
        </div>
        <div class="star">
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
        </div>
        <h5 class="p-name">${products[i].product_name}</h5>
        <h4 class="p-price">${products[i].price}$</h4>
        
       <a href=html/product.html  class="buy-btn id="">Buy Now</a>

    </div>
        `;
        
      if (products[i].category == "topwear" && count < 4) {
        count++;
        // Append the product HTML to the container
        productsContainer.innerHTML += productHTML;
      } else if (products[i].category == "shoes" && count < 8) {
        count++;
        shoesContainer.innerHTML += productHTML;
      }


    }

    // Loop through each product and generate HTML
  } else {
    // Handle the case when there are no products in local storage
    productsContainer.innerHTML = "<p>No products available</p>";
  }
}

renderProduct();
//to insure that user will not enter negative numbers or numbers gt 5
function validateInput(input) {
    // Parse the input value as a number
    var inputValue = parseInt(input.value, 10);
    // Check if the value is negative or greater than the max allowed value
    if (inputValue < 0 || inputValue > parseInt(input.max, 10) || isNaN(inputValue)) {
        // If negative, greater than max, or not a number, set the value to the minimum allowed value
        input.value = input.min;
    }
}
window.addEventListener("load", function () {
    //to get params from url
    let storedID = localStorage.getItem("productID");
    console.log(storedID);
    document.getElementById("h1").innerText = JSON.parse(
        localStorage.getItem("products")
    )[storedID]["product_name"];
    document.getElementById("price").innerText = JSON.parse(
        localStorage.getItem("products")
    )[storedID]["price"];
    document.getElementById("description").innerText = JSON.parse(
        localStorage.getItem("products")
    )[storedID]["description"];
    document.getElementById("i1").src = JSON.parse(
        localStorage.getItem("products")
    )[storedID]["product_img"];
    document.getElementById("smImg1").src = JSON.parse(
        localStorage.getItem("products")
    )[storedID]["product_img1"];
    document.getElementById("smImg2").src = JSON.parse(
        localStorage.getItem("products")
    )[storedID]["product_img2"];
    document.getElementById("smImg3").src = JSON.parse(
        localStorage.getItem("products")
    )[storedID]["product_img3"];
    let products = JSON.parse(window.localStorage.getItem("products"));
    const selectedProduct = products.find(
        (product) => storedID == product.product_id
    );
    //second part passing data to add to cart ==================================================================

    var selectedSize = document.getElementById("select");
    document
        .getElementById("AddToCart")
        .addEventListener("click", function () {
            if (selectedSize.value == 0) {
                document.getElementById(
                    "alertContainer"
                ).innerHTML = `<div class="alert alert-danger">
     Please Choose the size of your product!
  </div>`;
            } else {
                document.getElementById(
                    "alertContainer"
                ).innerHTML = "";
                let numOfItems = document.getElementById("number").value;
                var sizeSelect = document.getElementById("select");
                var sizeOfProduct =
                    sizeSelect.options[sizeSelect.selectedIndex].value;
                let currentUserId = JSON.parse(localStorage.getItem("user"))[
                    "id"
                ];
                let priceOfItem = JSON.parse(localStorage.getItem("products"))[storedID]["price"];
                let seller = JSON.parse(localStorage.getItem("products"))[storedID]["seller"];

                let cartData = JSON.parse(localStorage.getItem("cartData")) || [];

                let newCartItem = {
                    numOfItems: numOfItems,
                    sizeOfProduct: sizeOfProduct,
                    productId: storedID,
                    userId: currentUserId,
                    seller: seller,
                    priceOfItem: priceOfItem
                };
                cartData.push(newCartItem);
                localStorage.setItem("cartData", JSON.stringify(cartData));
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 1000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    },
                });
                Toast.fire({
                    icon: "success",
                    title: "Added to cart successfully",
                });
            }
        });
});

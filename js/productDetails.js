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
    let product_item = JSON.parse(localStorage.getItem("products"));
    console.log(storedID);
    let product = product_item.find(item => item.product_id == storedID);
    document.getElementById("h1").innerText = product.product_name;

    document.getElementById("price").innerText = product.price + "$";
    document.getElementById("description").innerText = product.description;
    document.getElementById("i1").src = product.product_img;
    //check if there are small images with the product if not display none
    if (product.product_img1) {
        document.getElementById("smImg1").src = product.product_img1;
        document.getElementById("smImg2").src = product.product_img2;
        document.getElementById("smImg3").src = product.product_img3;
    } else {
        for (var i = 1; i <= 3; i++) {
            var imgId = "smImg" + i;
            document.getElementById(imgId).style.display = "none";
        }
    }


    let products = JSON.parse(window.localStorage.getItem("products"));
    const selectedProduct = products.find(
        (product) => storedID == product.product_id
    );
    //second part passing data to add to cart ==================================================================

    var selectedSize = document.getElementById("select");
    document.getElementById("AddToCart").addEventListener("click", function () {
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
                var CheckTheExistenceOfUser = JSON.parse(localStorage.getItem("user"));
                var sizeOfProduct =
                    sizeSelect.options[sizeSelect.selectedIndex].value;
                //check if the user is logged in or not
                if (!CheckTheExistenceOfUser) {
                    console.log("nulllllll");
                    currentUserId = 123;
                    JSON.parse(sessionStorage.setItem("sessionToken", currentUserId));
                } else {
                    var currentUserId = JSON.parse(localStorage.getItem("user"))["id"];
                }
                let priceOfItem = product.price;
                let seller = product.seller;

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

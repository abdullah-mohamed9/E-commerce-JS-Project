document.addEventListener("DOMContentLoaded", function () {
 
    // Sample DetailedData array (replace this with your actual data)
    var DetailedData = [
        {
            p_Id:1,
            p_name: "T-shirt",
            image: "../images/1.jfif",
            p_Description: "T-shirt. With a Regular Fit, this classic piece effortlessly integrates comfort and style, making it a wardrobe essential",
            price: "300$",
            sizes: ["XXL", "XL", "L", "Medium", "small"],
            details: "Crew Neck Short Sleeve Combed Cotton Men's T-shirt From combed cotton fabric short-sleeved T-Shirt",
        },
        {
            p_Id: "product1",
            p_name: "Dress",
            image: "../images/2.jpg",
            p_Description: "Dress. With a Regular Fit, this classic piece effortlessly integrates comfort and style, making it a wardrobe essential",
            price: "500$",
            sizes: ["XXL", "XL", "L", "Medium", "small"],
            details: "Elegant Dress with floral patterns and comfortable fit",
        },
        {
            p_Id: 3,
            p_name: "Jacket",
            image: "../images/3.jpg",
            p_Description: "Jacket. With a Regular Fit, this classic piece effortlessly integrates comfort and style, making it a wardrobe essential",
            price: "700$",
            sizes: ["XXL", "XL", "L", "Medium", "small"],
            details: "Stylish Jacket with a modern design, suitable for all occasions",
        },
        {
            p_Id: 4,
            p_name: "Jeans",
            image: "../images/4.jpg",
            p_Description: "Jeans. With a Regular Fit, this classic piece effortlessly integrates comfort and style, making it a wardrobe essential",
            price: "400$",
            sizes: ["XXL", "XL", "L", "Medium", "small"],
            details: "Classic Jeans for a casual and comfortable look",
        },
    ];
    //strore data in local storage
    localStorage.setItem('DetailedData', JSON.stringify(DetailedData));
    // Get all anchor tags
    var productLinks = document.querySelectorAll("div");

    // Add click event listener to each link
    productLinks.forEach(function (link) {
        link.addEventListener("click", function (event) {
           
            // Get the clicked link's ID
            var linkId = this.id;
          
            // Find the corresponding DetailedData based on the clicked link's ID
            var selectedProduct = DetailedData.find(function (product) {
                return product.p_Id === parseInt(linkId);
            });
      
            // Check if a matching product is found
            if (selectedProduct) {
                // Update the content of the page based on the selected product
                updateProductDetails(selectedProduct);
            }
         event.preventDefault();
        });
    });

    // Function to update product details on the page
    function updateProductDetails(product) {
        // Update product name
        var productNameElement = document.getElementById('h1');
        if (productNameElement) {
            productNameElement.innerText = product.p_name;
        }

        // Update product image
        var productImageElement = document.getElementById('leftWrapper');
        if (productImageElement) {
            productImageElement.innerHTML = `<img src="${product.image}" alt="${product.p_name}">`;
        }

        // Update product price
        var productPriceElement = document.querySelector('#rightWrapper h3');
        if (productPriceElement) {
            productPriceElement.innerText = product.price;
        }

        // Update product details
        var productDetailsElement = document.querySelector('#rightWrapper h4');
        if (productDetailsElement) {
            productDetailsElement.innerText = "Product Details";
        }

        // Update product description
        var productDescriptionElement = document.querySelector('#rightWrapper .element');
        if (productDescriptionElement) {
            productDescriptionElement.innerText = product.details;
        }

        // Update product size options
        var sizeSelectElement = document.querySelector('#rightWrapper select');
        if (sizeSelectElement) {
            // Clear existing options
            sizeSelectElement.innerHTML = '<option selected>select size</option>';

            // Add size options
            product.sizes.forEach(function (size) {
                var option = document.createElement('option');
                option.text = size;
                sizeSelectElement.add(option);
            });
        }
    }
});

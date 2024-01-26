
window.addEventListener("load", function () {
  

    document.getElementById('submitButton').addEventListener('click', function (event) {
      
 
        let myData = {};
        let myAllData = [];
        var allValid = true;
        //check if cart is empty

        var form = document.getElementById('checkoutForm');
        var data = document.getElementsByTagName("input");
        var errormsg = document.getElementById("errorFnMsg");
        let inputField = document.getElementById("fn");
        let lnInputField = document.getElementById("ln");
        //to return field to the default style
        inputField.addEventListener('blur', function () {
            if (inputField.value.trim().length >= 3) {
                errormsg.innerText = "";
                inputField.style.border = "1px solid black";
            }
        });
        lnInputField.addEventListener("blur", function () {
            if (lnInputField.value.trim().length >= 3) {
                errormsg.innerText = "";
                lnInputField.style.border = "1px solid black";
            }

        });

        for (let i = 0; i < data.length; i++) {
            if (data[i].value.trim() === "") {
                event.preventDefault();

                form.classList.add('was-validated');
                data[i].style.border = "1px red solid";
                // Set the flag to false when a validation fails
                allValid = false;
            } else {
                data[i].style.border = "1px black solid";
            }
            //validation on all fields to check that data 
            if (data[i].id === "fn" && data[i].value.trim().length < 3) {
                event.preventDefault();
                data[i].style.border = "1px solid red";
                console.log("hello from fn");
                allValid = false;
                errormsg.style.color = "red";
                errormsg.style.fontSize = "12px";
                errormsg.style.marginBottom = "10px";
                errormsg.style.marginTop = "-12px";
                errormsg.innerText = "name must be at least 3 chars";
            } else if (data[i].id === "fn" && data[i].value.trim().length >= 3) {
                errormsg.innerText = "";
                errormsg.style.marginTop = "12px";
            }

            //store fields in array
            var c = document.getElementsByTagName("label")[i].innerText;
            myData[c] = data[i].value;

        }
        //radio buttons
        var radioButtons = document.querySelectorAll('input[type="radio"]');
        var radioSelected = false;
        for (let i = 0; i < radioButtons.length; i++) {
            if (radioButtons[i].checked) {
                radioSelected = true;

            }
        }
        document.getElementById('Expirtaion').addEventListener("input", function (event) {
            var expirationInput = document.getElementById('Expirtaion');
            var expirationDate = new Date(expirationInput.value + "T00:00:00");
            var currentDate = new Date();
            if (expirationDate < currentDate) {
                expirationInput.setCustomValidity('Invalid expiration date');
                expirationInput.classList.add('is-invalid');
                allValid = false;
                event.preventDefault();
                console.log(expirationDate);
            } else {
                expirationInput.setCustomValidity('');
                expirationInput.classList.remove('is-invalid');
            }
        });
        if (!radioSelected) {
            document.getElementById("alertContainer").innerHTML = `<div class="alert alert-danger">
            You must shoose the payment method
          </div>`;
            event.preventDefault();
            allValid = false;
        }
        //payment validation
        //  var nameOnCard = document.getElementById('fnCard').value;
        // var creditCardNumber = document.getElementById('creditCard').value;
        // var expiration = document.getElementById('Expirtaion').value;
        // var cvv = document.getElementById('CVV').value;
        // document.getElementById('CVV').addEventListener("blur", function () {
        //     if (cvv.length < 3) {
        //         document.getElementById('CVV').style.border = "3px solid red";
        //         console.log("noooooo");
        //     }
        // });
        // function luhnCheck(creditCardNumber) {
        //     // Luhn algorithm implementation
        //     var sum = 0;
        //     var isEven = false;

        //     for (var i = creditCardNumber.length - 1; i >= 0; i--) {
        //         var digit = parseInt(creditCardNumber[i]);

        //         if (isEven) {
        //             digit *= 2;
        //             if (digit > 9) {
        //                 digit -= 9;
        //             }
        //         }

        //         sum += digit;
        //         isEven = !isEven;
        //     }

        //     return (sum % 10 === 0);
        // }

        // function isValidExpiration(expiration) {
        //     var regex = /^(0[1-9]|1[0-2])\/[0-9]{4}$/;
        //     return regex.test(expiration);
        // }

        // function isValidCVV(cvv) {
        //     var regex = /^[0-9]{3,4}$/;
        //     return regex.test(cvv);
        // }
        // if (!luhnCheck(creditCardNumber)) {
        //     alert('Invalid credit card number');
        //     allValid = false;

        //     return;
        // }

        // if (!isValidExpiration(expiration)) {
        //     allValid = false;
        //     return;
        // }

        // if (!isValidCVV(cvv)) {
        //     allValid = false;
        //     return;
        // }

        ////
        //end of radio buttons
        var productId = [0];
        var numOfItems = [0];
        var sellers1 = [0];
        for (let i = 0; i < JSON.parse(localStorage.getItem("cartData")).length; i++) {
            productId[i] = JSON.parse(localStorage.getItem("cartData"))[i]['productId'];
            numOfItems[i] = JSON.parse(localStorage.getItem("cartData"))[i]['numOfItems'];
            sellers1[i] = JSON.parse(localStorage.getItem("cartData"))[i]['seller'];
        }
        //storing data in local storage
        //var numOfFirstCartItem=JSON.parse(localStorage.getItem('cartData'))[0]['numOfItems'];
        //var id=JSON.parse(localStorage.getItem('cartData'))[0]['productId'];
        //to generate random id for each product
        //  const newOrderId = generateOrderId();
        let myData1 = {
            "First name": document.getElementById('fn').value,
            "Last name": document.getElementById('ln').value,
            "Email address": document.getElementById('email').value,
            "Phone Number": document.getElementById('phone').value,
            "Street address": document.getElementById('street').value,
            "Town/City": document.getElementById('inputCity').value,
            "Country/Region": document.getElementById('country').value,
            "Zip Code": document.getElementById('inputZip').value,
            "Name On Card": document.getElementById('fnCard').value,
            "Credit Card": document.getElementById('credit').value,
            "Expirtaion": document.getElementById('Expirtaion').value,
            "CVV": document.getElementById('CVV').value,
            "Order notes (optional)": document.getElementById('orderNotes').value,
            "Shipping address is the same as my billing address": document.getElementById('check1').checked,
            "Save this information for next time": document.getElementById('check2').checked,
            "Date of Order": new Date(),
            "status of order": "pending",
            "products total price ": JSON.parse(localStorage.getItem('totalPrice')),
            "quantity": JSON.parse(localStorage.getItem('cartData')),
            "productId": productId,
            "numOfItems": numOfItems,
            "sellers": sellers1,
            "Order Id": Math.random(0, 1),
        };
        //

        var mCart = JSON.parse(localStorage.getItem("cartData"));
        if (!mCart || mCart.length === 0) {
            document.getElementById("alertContainer").innerHTML = `<div class="alert alert-danger">
            You Cart Is Empty Please add some items firstly!
          </div>`;
            allValid = false;
            console.log("sorry");
        }

        let existingData = localStorage.getItem("OrderData");
        if (existingData) {
            myAllData = JSON.parse(existingData);
        }
        myAllData.push(myData1)
        //finally all validation come true
        if (allValid) {
            function updateLocalStorageStock() {
                var myCart = JSON.parse(localStorage.getItem("cartData"));
                var mproducts = JSON.parse(localStorage.getItem("products"));
    
                for (let i = 0; i < myCart.length; i++) {
                    let efg = myCart[i]["productId"];
                    //cout of selled items
                    let selledones = myCart[i]['numOfItems'];
                    console.log("id in cart : " + efg);
                    console.log("selled items " + selledones);
                  
                    var productIdToFind = efg+1;
                    //corresponding id
                    var foundProduct = Object.values(mproducts).find(product => product.product_id == productIdToFind);
                      //  console.log(foundProduct);
                    //total count
                  //  console.log("count of product " + foundProduct['count']);
                     foundProduct['count'] -= selledones;
                  //  console.log("remain " + remaining);
                  
    
    
                }
        
                // Move this line outside the loop
                localStorage.setItem("products", JSON.stringify(mproducts));
            }
            updateLocalStorageStock();
            errormsg.innerText = "";
            //to store data in local storage
            localStorage.setItem("OrderData", JSON.stringify(myAllData));
            localStorage.removeItem("cartData");
            localStorage.removeItem("totalPrice");
            localStorage.removeItem("subTotal");
            Swal.fire({
                title: "succeeded!",
                text: "Your order has been successfully submitted, and we will stay in touch with you.",
                icon: "success",
                confirmButtonText: "OK"
            }).then((result) => {

                if (result.isConfirmed) {
                    console.log("User clicked OK!");
                    window.location.href = '../index.html';
                    window.history.replaceState(null, null, '/path/to/redirect/page.html');
                }
            });
        }
    });
});
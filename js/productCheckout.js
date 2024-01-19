window.addEventListener("load", function () {

    document.getElementById('submitButton').addEventListener('click', function (event) {
        let myData = {};
        let myAllData = [];
        //
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
        var allValid = true;
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
            if ( data[i].value.trim().length < 3) {
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
        let existingData = localStorage.getItem("OrderData");
        if (existingData) {
            myAllData = JSON.parse(existingData);
        }
        myAllData.push(myData)
        //finally all validation come true
        if (allValid) {
            errormsg.innerText = "";
            //to store data in local storage

            localStorage.setItem("OrderData", JSON.stringify(myAllData));

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
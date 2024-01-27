//name valid
document.getElementById("name").addEventListener("input", function(event) {
    var input = event.target.value;
    var regex = /^[a-zA-Z\s\-]+$/; 

    if (!regex.test(input)) {
        event.target.value = input.replace(/[^a-zA-Z\s\-]+$/, ''); 
    }
});
//end name valid
// start form valid
function validateForm() {
   
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var subject = document.getElementById('subject').value;
    var message = document.getElementById('message').value;

    // Basic validation
    if (name.trim() === '' || email.trim() === '' || subject.trim() === '' || message.trim() === '') {
        document.alert('All fields must be filled out');
        return false;
    }


    return true; // Submit the form if all validations pass
}
//end form valid

// start local storge
document.getElementById("myForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the form from submitting

    // Get form values
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var subject = document.getElementById("subject").value;
    var message = document.getElementById("message").value;

    // Create an object to hold form data
    var formData = {
        name: name,
        email: email,
        subject: subject,
        message: message
    };

    // Save data object to local storage
    localStorage.setItem("formData", JSON.stringify(formData));

    // Optionally, you can redirect to a success page or perform other actions here
    alert("Form data saved to local storage!");
});

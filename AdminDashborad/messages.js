let Messages;

// Retrieve data from localStorage
if (localStorage.formData !== null) {
    Messages = JSON.parse(localStorage.formData);
} else {
    Messages = [];
}

// Read data
function showMessages() {
    let table = '';

        table += `
            <tr>
                <td>${Messages.name}</td>
                <td>${Messages.email}</td>
                <td>${Messages.subject}</td>
                <td>${Messages.message}</td>
                <td><span onclick="deleteMessage()" class="status delete">Delete</span></td>
            </tr>`;
    

    // Check if no messages are found
    if (Messages.length <= 0) {
        
        table = "<p>No messages found</p>";
    }

    document.getElementById("tbody").innerHTML = table;
}

// Display data
showMessages();

// Delete message
function deleteMessage() {
    Messages = []; // Clear the array

    // Update data in local storage after removal
    localStorage.formData = JSON.stringify(Messages);

    // Display data after removal
    showMessages();
}

console.log(Messages);
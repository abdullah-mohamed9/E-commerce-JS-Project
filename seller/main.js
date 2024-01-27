const logedinUser = JSON.parse(localStorage.getItem('user'));
let title = document.getElementById("title");
let price = document.getElementById("price");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let imagePreview = document.getElementById('imgPreview');
let img = document.getElementById("img");

// validations div
let title_val = document.getElementById("title_val");
let price_val = document.getElementById("price_val");
let count_val = document.getElementById("count_val");
let category_val = document.getElementById("category_val");
let img_val = document.getElementById("img_val");

let signOut = document.getElementById("signOut");
signOut.addEventListener("click", function (event) {
    event.preventDefault();

    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });
    Swal.fire({
        title: "Are you sure?",
        text: "Do you want to sign out?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes,Sign out!"
    }).then((result) => {
        if (result.isConfirmed) {
            Toast.fire({
                title: "Sign out!",
                text: "You have signed out successfully.",
                icon: "success"
            }).then(() => {
                window.location.href = "../index.html";
                localStorage.removeItem("user");
            });
        } else {
            window.location.href = "index.html";
        }
    });
});

let mood = 'create';
let tmp;
let myData;

const titleRegex = /^[a-zA-Z ]{3,}$/;
const numberRegex = /^[0-9]{1,}$/;

if (localStorage.products != null) {
    myData = JSON.parse(localStorage.products);
} else {
    myData = [];
}

submit.onclick = function (event) {
    var flag = true;
    let newPro = {
        product_name: title.value,
        price: price.value,
        count: count.value,
        category: category.value,
        product_img: imagePreview.src,
        seller: logedinUser.name, // Use seller's name instead of ID
        id: generateProductId()
    };

    if (titleRegex.test(newPro.product_name) &&
        title.value.trim() !== '' &&
        numberRegex.test(newPro.price) &&
        numberRegex.test(newPro.count) &&
        newPro.count < 100 &&
        newPro.category !== '0' &&
        img.value !== ''
    ) {
        if (mood === 'create') {
            myData.push(newPro);
        } else {
            const indexToUpdate = myData.findIndex(product => product.id === myData[tmp].id);
            if (indexToUpdate !== -1) {
                myData[indexToUpdate] = newPro;
                mood = 'create';
                submit.innerHTML = "Create";
                count.style.display = 'block';
            }
        }
        clearData();
        localStorage.setItem('products', JSON.stringify(myData));
    } else {
        flag = false;
        validateInput('title', newPro.product_name);
        validateInput('price', newPro.price);
        validateInput('count', newPro.count, 1, 100);
        validateInput('category', newPro.category, '0');
        validateInput('img', img.value);

        event.preventDefault();
    }

    if (flag) {
        updateAndCloseModal();
        return false;
    } else {
        showData();
    }
};

function clearData() {
    title.value = '';
    price.value = '';
    count.value = '';
    category.value = '0';
    img.value = '';
    imagePreview.src = 'images/logo1.png';
    resetValidation(title, title_val);
    resetValidation(price, price_val);
    resetValidation(count, count_val);
    resetValidation(category, category_val);
    resetValidation(img, img_val);
}

function displayImage() {
    var input = document.getElementById('img');
    var file = input.files[0];
    if (file) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var imageData = e.target.result;
            imagePreview.src = imageData;
        };
        reader.readAsDataURL(file);
    }
}

function showData() {
    let table = '';
    for (let i = 0; i < myData.length; i++) {
        if (myData[i].seller === logedinUser.name) {
            table += `
                <tr data-product-id="${myData[i].id}">
                    <td>${i + 1}</td>
                    <td>${myData[i].product_name}</td>
                    <td>${myData[i].price}</td>
                    <td>${myData[i].count}</td>
                    <td>${myData[i].category}</td>
                    <td><img src="${myData[i].product_img}" width="50px" height="50px"></td>
                    <td><button onclick="updateData(${i})" class="btn-style" style="width:100%" id="update">update</button></td>
                    <td><button onclick="deleteData(${i})" class="btn-style" style="width:100%" id="delete">delete</button></td>
                </tr>
            `;
        }
    }
    document.getElementById('tbody').innerHTML = table;
}

img.addEventListener('change', displayImage);

function deleteData(i) {
    const productIdToDelete = myData[i].id;
    const indexToDelete = myData.findIndex(product => product.id === productIdToDelete);
    if (indexToDelete !== -1 && myData[indexToDelete].seller === logedinUser.name) {
        myData.splice(indexToDelete, 1);
        localStorage.setItem('products', JSON.stringify(myData));
        showData();
    }
}

var modal = document.getElementById("myModal");
var openModalBtn = document.getElementById("openModalBtn");
var closeModalBtn = document.getElementById("submit");

function openModal() {
    modal.style.display = "block";
}

function closeModal() {
    modal.style.display = "none";
}

function updateAndCloseModal() {
    let newPro = {
        product_name: title.value,
        price: price.value,
        count: count.value,
        category: category.value,
        product_img: imagePreview.src,
        seller: logedinUser.name,
        id: generateProductId()
    };

    if (titleRegex.test(newPro.product_name) &&
        title.value.trim() !== '' &&
        numberRegex.test(newPro.price) &&
        numberRegex.test(newPro.count) &&
        newPro.count < 100 &&
        newPro.category !== '0' &&
        img.value !== ''
    ) {
        const indexToUpdate = myData.findIndex(product => product.id === myData[tmp].id);
        if (indexToUpdate !== -1) {
            myData[indexToUpdate] = newPro;
            localStorage.setItem('products', JSON.stringify(myData));
            showData();
        }
        mood = 'create';
        submit.innerHTML = 'Create';
        count.style.display = 'block';
        clearData();
    }
    closeModal();
}

showData();

function updateData(i) {
    title.value = myData[i].product_name;
    price.value = myData[i].price;
    category.value = myData[i].category;
    count.value = myData[i].count;
    imagePreview.src = myData[i].product_img;
    submit.innerHTML = 'Update';
    mood = 'update';
    tmp = i;

    openModal();

    closeModalBtn.removeEventListener("click", closeModal);
    closeModalBtn.addEventListener("click", function () {
        // updateAndCloseModal();
    });

    scroll({
        top: 0,
        behavior: "smooth",
    });
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
        clearData();
    }
}

let searchMood = 'title';

function getSearchMood(id) {
    let search = document.getElementById('search');
    if (id == 'searchTitle') {
        searchMood = 'title';
    } else {
        searchMood = 'category';
    }
    search.placeholder = 'Search By ' + searchMood;

    search.focus();
    search.value = '';
    showData();
}

function searchData(value) {
    let table = '';
    for (let i = 0; i < myData.length; i++) {
        if (myData[i].seller === logedinUser.name) {
            if (searchMood == 'title' && myData[i].product_name.toLowerCase().includes(value.toLowerCase())) {
                table += `
            <tr data-product-id="${myData[i].id}">
                <td>${i + 1}</td>
                <td>${myData[i].product_name}</td>
                <td>${myData[i].price}</td>
                <td>${myData[i].count}</td>
                <td>${myData[i].category}</td>
                <td><img src="${myData[i].product_img}" id="imgPreview" width="50px" height="50px"></td>
                <td><button onclick="updateData(${i})" class="btn-style" style="width:100%" id="update">update</button></td>
                <td><button onclick="deleteData(${i})" class="btn-style" style="width:100%" id="delete">delete</button></td>
            </tr>
        `;
            } else if (searchMood == 'category' && myData[i].category.toLowerCase().includes(value.toLowerCase())) {
                table += `
            <tr data-product-id="${myData[i].id}">
                <td>${i + 1}</td>
                <td>${myData[i].product_name}</td>
                <td>${myData[i].price}</td>
                <td>${myData[i].count}</td>
                <td>${myData[i].category}</td>
                <td><img src="${myData[i].product_img}" id="imgPreview" width="50px" height="50px"></td>
                <td><button onclick="updateData(${i})" class="btn-style" style="width:100%" id="update">update</button></td>
                <td><button onclick="deleteData(${i})" class="btn-style" style="width:100%" id="delete">delete</button></td>
            </tr>
        `;
            }
        }
    }
    document.getElementById('tbody').innerHTML = table;
}

document.getElementById("submit").addEventListener("click", function () {
    console.log("submit btn");
});
<<<<<<< HEAD
//order Tab


=======

function generateProductId() {
    return Date.now().toString();
}

function validateInput(inputId, value, minValue, maxValue) {
    const inputElement = document.getElementById(inputId);
    const validationElement = document.getElementById(`${inputId}_val`);

    if (value.trim() === '') {
        markInputAsInvalid(inputElement, validationElement, `${inputId} must not be empty.`);
    } else if (minValue !== undefined && parseInt(value) < minValue) {
        markInputAsInvalid(inputElement, validationElement, `${inputId} must be greater than or equal to ${minValue}.`);
    } else if (maxValue !== undefined && parseInt(value) > maxValue) {
        markInputAsInvalid(inputElement, validationElement, `${inputId} must be less than or equal to ${maxValue}.`);
    } else {
        markInputAsValid(inputElement, validationElement);
    }
}

function markInputAsInvalid(inputElement, validationElement, message) {
    inputElement.style.border = "solid 3px red";
    validationElement.innerHTML = message;
}

function markInputAsValid(inputElement, validationElement) {
    inputElement.style.border = "solid 3px green";
    validationElement.innerHTML = '';
}

function resetValidation(inputElement, validationElement) {
    inputElement.style.border = "";
    validationElement.innerHTML = '';
}
>>>>>>> 7cdeba01040dbfb6b12eb704a5cfb38d40c213fc

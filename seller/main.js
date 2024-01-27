
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
    dataPro = JSON.parse(localStorage.products);

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
        seller: logedinUser.id,
        product_id: generateProductId() // Generate unique product ID
    };

    if (titleRegex.test(title.value) && title.value.trim() != '' && numberRegex.test(price.value) && numberRegex.test(count.value) && category.value != '0' && newPro.count < 100 && img.value != '') {

        if (mood === 'create') {
            myData.push(newPro);
        } else {
            // Find the index of the product to update based on its id
            const indexToUpdate = dataPro.findIndex(product => product.product_id === dataPro[tmp].product_id);

         //   const indexToUpdate = dataPro.findIndex(product => product.id === dataPro[tmp].id);
            if (indexToUpdate !== -1) {
                dataPro[indexToUpdate] = newPro;

                mood = 'create';
                submit.innerHTML = "Create";
                count.style.display = 'block';
            }
        }
        clearData();

        localStorage.setItem('products', JSON.stringify(dataPro)); // Store the updated dataPro array

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
    for (let i = 0; i < dataPro.length; i++) {
        if (dataPro[i].seller === logedinUser.id) {
            table += `
                <tr data-product-id="${dataPro[i].product_id}">
                    <td>${i + 1}</td>
                    <td>${dataPro[i].product_name}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].count}</td>
                    <td>${dataPro[i].category}</td>
                    <td><img src="${dataPro[i].product_img}" width="50px" height="50px"></td>

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
    console.log(i);
    const productIdToDelete = dataPro[i].product_id;
    console.log(i);
    const indexToDelete = dataPro.findIndex(products => products.product_id === productIdToDelete);
    console.log(indexToDelete);
    if (indexToDelete !== -1) {
        dataPro.splice(indexToDelete, 1); // Remove the item from the dataPro array
        localStorage.setItem('products', JSON.stringify(dataPro)); // Update the localStorage

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
        seller: logedinUser.id,
        product_id: generateProductId() // Generate unique product ID

    };

    if (titleRegex.test(newPro.product_name) &&
        title.value.trim() !== '' &&
        numberRegex.test(newPro.price) &&
        numberRegex.test(newPro.count) &&
        newPro.count < 100 &&
        newPro.category !== '0' &&
        img.value !== ''
    ) {
        // Find the index of the product to update based on its id
        const indexToUpdate = dataPro.findIndex(product => product.product_id === dataPro[tmp].product_id);

//const indexToUpdate = dataPro.findIndex(product => product.product_id === dataPro[tmp].product_id);
        if (indexToUpdate !== -1) {
            dataPro[indexToUpdate] = newPro; // Update the item in the dataPro array
            localStorage.setItem('products', JSON.stringify(dataPro)); // Update the localStorage

            showData();
        }
        mood = 'create';
        submit.innerHTML = 'Create';
        count.style.display = 'block';
        clearData();
    }
    showData();

    closeModal();
}

showData();

function updateData(i) {
    console.log("hello from update btn");
    title.value = dataPro[i].product_name;
    console.log(i);
    price.value = dataPro[i].price;
    category.value = dataPro[i].category;
    count.value = dataPro[i].count;
    imagePreview.src = dataPro[i].product_img;

    submit.innerHTML = 'Update';
    mood = 'update';
    tmp = i;

    openModal();

    closeModalBtn.removeEventListener("click", closeModal);
    closeModalBtn.addEventListener("click", function () {
        // Update data and close modal
     //   updateAndCloseModal();

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
    for (let i = 0; i < dataPro.length; i++) {
        if (dataPro[i].seller === logedinUser.id) {
            if (searchMood == 'title' && dataPro[i].product_name.toLowerCase().includes(value.toLowerCase())) {
                table += `
                 <tr data-product-id="${dataPro[i].product_id}">
                <td>${i + 1}</td>
                <td>${dataPro[i].product_name}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].count}</td>
                <td>${dataPro[i].category}</td>
                <td><img src="${dataPro[i].product_img}" id="imgPreview" width="50px" height="50px"></td>
                <td><button onclick="updateData(${i})" class="btn-style" style="width:100%" id="update">update</button></td>
                <td><button onclick="deleteData(${i})" class="btn-style" style="width:100%" id="delete">delete</button></td>
            </tr>
        `;
            } else if (searchMood == 'category' && dataPro[i].category.toLowerCase().includes(value.toLowerCase())) {
                table += `
            <tr data-product-id="${dataPro[i].id}">
                <td>${i + 1}</td>
                <td>${dataPro[i].product_name}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].count}</td>
                <td>${dataPro[i].category}</td>
                <td><img src="${dataPro[i].product_img}" id="imgPreview" width="50px" height="50px"></td>
                <td><button onclick="updateData(${i})" class="btn-style" style="width:100%" id="update">update</button></td>
                <td><button onclick="deleteData(${i})" class="btn-style" style="width:100%" id="delete">delete</button></td>
            </tr>
        `;
            }
        }
    }
    document.getElementById('tbody').innerHTML = table;
}

// document.getElementById("submit").addEventListener("click", function () {
//     console.log("submit btn");
// });

function generateProductId() {
    // Generate a unique product ID using timestamp
    return Date.now().toString();
}


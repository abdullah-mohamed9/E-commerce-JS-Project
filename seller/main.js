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

let mood = 'create';
let tmp;
let dataPro;

const titleRegex = /^[a-zA-Z ]{3,}$/;
const numberRegex = /^[0-9]{1,}$/;



if (localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product);
} else {
    dataPro = [];
}

submit.onclick = function (event) {
    var flag = true;
    let newPro = {
        title: title.value,
        price: price.value,
        count: count.value,
        category: category.value,
        img: imagePreview.src,
        seller: logedinUser.id
        
    }

    if (titleRegex.test(title.value) && title.value.trim() != '' && numberRegex.test(price.value) && numberRegex.test(count.value) && category.value != '0' && newPro.count < 100 && img.value != '') {
        if (mood === 'create') {
            dataPro.push(newPro);
        } else {
            dataPro[tmp] = newPro;
            mood = 'create';
            submit.innerHTML = "Create";
            count.style.display = 'block';
        }
        clearData();
    } else {
        flag = false;
        if (title.value.trim() == '' || titleRegex.test(title.value) == false) {
            title.style.border = "solid 3px red";
            title_val.innerHTML = 'Title must be more than 3 char';
        } else {
            title.style.border = "solid 3px green";
            title_val.innerHTML = '';
        }
        if (price.value.trim() == '' || numberRegex.test(price.value) == false) {
            price.style.border = "solid 3px red";
            price_val.innerHTML = 'Price must be a positive number';
        } else {
            price.style.border = "solid 3px green";
            price_val.innerHTML = '';
        }
        if (count.value.trim() == '' || numberRegex.test(count.value) == false || count.value > 100) {
            count.style.border = "solid 3px red";
            count_val.innerHTML = 'Count must be between 1 and 100';
        } else {
            count.style.border = "solid 3px green";
            count_val.innerHTML = '';
        }
        if (category.value == '0') {
            category.style.border = "solid 3px red";
            category_val.innerHTML = 'Choose category';
        } else {
            category.style.border = "solid 3px green";
            category_val.innerHTML = '';
        }
        if (img.value == '') {
            img.style.border = "solid 3px red";
            img_val.innerHTML = 'Choose image';
        } else {
            img.style.border = "solid 3px green";
            img_val.innerHTML = '';
        }

        // Do not close the modal if there are validation errors
        event.preventDefault();
    }

    if (flag) {
        updateAndCloseModal();
        return false;
    } else {
        localStorage.setItem('product', JSON.stringify(dataPro));
        showData();
    }
}


function clearData() {
    title.value = '';
    price.value = '';
    count.value = '';
    category.value = '0';
    img.value = '';
    imagePreview.src = 'images/logo1.png';
    title.style.border = "";
    price.style.border = "";
    count.style.border = "";
    category.style.border = "";
    img.style.border = "";
    title_val.innerHTML = '';
    price_val.innerHTML = '';
    count_val.innerHTML = '';
    category_val.innerHTML = '';
    img_val.innerHTML = '';
}

function displayImage() {
    var input = document.getElementById('img');
    var file = input.files[0];
    if (file) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var imageData = e.target.result;
            // Display the image
            imagePreview.src = imageData;
        };
        reader.readAsDataURL(file);
    }
}

function showData() {
    let table = '';
    for (let i = 0; i < dataPro.length; i++) {
        table += `
            <tr>
                <td>${i + 1}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].count}</td>
                <td>${dataPro[i].category}</td>
                <td><img src="${dataPro[i].img}" width="50px" height="50px id="imgPreview" "></td>
                <td><button onclick="updateData(${i})" class="btn-style" style="width:100%" id="update">update</button></td>
                <td><button onclick="deleteData(${i})" class="btn-style" style="width:100%" id="delete">delete</button></td>
            </tr>
        `;
    }
    document.getElementById('tbody').innerHTML = table;
}

img.addEventListener('change', displayImage);

function deleteData(i) {
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });

    Swal.fire({
        title: "Are you sure?",
        text: "Do you want to delete this item from your cart?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            dataPro.splice(i, 1);
            localStorage.product = JSON.stringify(dataPro);
            showData();
            Toast.fire({
                icon: "Deleted",
                title: "the item has been deleted.",
                icon: "success"
            });
        }
    });
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
        title: title.value,
        price: price.value,
        count: count.value,
        category: category.value,
        img: imagePreview.src,
        seller: logedinUser.id
    };

    if (
        titleRegex.test(title.value) &&
        title.value.trim() != '' &&
        numberRegex.test(price.value) &&
        numberRegex.test(count.value) &&
        category.value != '0' &&
        newPro.count < 100 &&
        img.value != ''
    ) {
        dataPro[tmp] = newPro;
        mood = 'create';
        submit.innerHTML = 'Create';
        count.style.display = 'block';
        clearData();
    }

    localStorage.setItem('product', JSON.stringify(dataPro));
    showData();
    closeModal();
}

showData();

function updateData(i) {
    console.log("hello from update btn");
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    category.value = dataPro[i].category;
    count.value = dataPro[i].count;
    imagePreview.src = dataPro[i].img;
    submit.innerHTML = 'Update';
    mood = 'update';
    tmp = i;

    openModal();

    // Add an event listener for the "Update" button
    closeModalBtn.removeEventListener("click", closeModal);
    closeModalBtn.addEventListener("click", function () {
        // Update data and close modal
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
    for (let i = 0; i < dataPro.length; i++) {
        if (searchMood == 'title') {

            if (dataPro[i].title.toLowerCase().includes(value.toLowerCase())) {
                table += `
            <tr>
                <td>${i + 1}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].count}</td>
                <td>${dataPro[i].category}</td>
                <td><img src="${dataPro[i].img}" id="imgPreview" width="50px" height="50px"></td>
                <td><button onclick="updateData(${i})" class="btn-style" style="width:100%" id="update">update</button></td>
                <td><button onclick="deleteData(${i})" class="btn-style" style="width:100%" id="delete">delete</button></td>
            </tr>
        `
            }
        } else {
            if (dataPro[i].category.toLowerCase().includes(value.toLowerCase())) {
                table += `
            <tr>
                <td>${i + 1}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].count}</td>
                <td>${dataPro[i].category}</td>
                <td><img src="${dataPro[i].img}" id="imgPreview" width="50px" height="50px"></td>
                <td><button onclick="updateData(${i})" class="btn-style" style="width:100%" id="update">update</button></td>
                <td><button onclick="deleteData(${i})" class="btn-style" style="width:100%" id="delete">delete</button></td>
            </tr>
        `
            }

        }
    }
    document.getElementById('tbody').innerHTML = table;

}
document.getElementById("submit").addEventListener("click",function(){
console.log("submit btn");


});
//order Tab

//get total
let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");

let search = document.getElementById("search");

let searchByTitle = document.getElementById("searchTitle");
let searchByCategory = document.getElementById("searchCategory");

let mood = 'create';
let temp;

// Get total
price.addEventListener("keyup", getTotal);
taxes.addEventListener("keyup", getTotal);
ads.addEventListener("keyup", getTotal);
discount.addEventListener("keyup", getTotal);

function getTotal() {
    if (price.value !== "") {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = 'lightgreen';
    } else {
        total.innerHTML = '';
        total.style.background = '#6b0808';
    }
}

// Create Product
let dataProduct;
if (localStorage.product !== null) {
    dataProduct = JSON.parse(localStorage.product);
} else {
    dataProduct = [];
}

submit.onclick = function () {
    let newProduct = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase()
    };

    if (title.value !== "" && price.value !== "" && category.value !== "" && newProduct.count <= 100) {
        if (mood === "create") {
            if (newProduct.count > 1) {
                for (let i = 0; i < newProduct.count; i++) {
                    dataProduct.push(newProduct);
                }
            } else {
                dataProduct.push(newProduct);
            }
        } else {
            dataProduct[temp] = newProduct;
            mood = "create";
            submit.innerHTML = "Create";
            count.style.display = "block";
        }
        claerData();
    } else {
        alert("Please enter data");
    }
    localStorage.setItem("product", JSON.stringify(dataProduct));
    showData();
};

// Clear inputs
function claerData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}

// Read data
function showData() {
    getTotal();
    let table = '';
    for (let i = 0; i < dataProduct.length; i++) {
        table += `
            <tr>
                <td>${i + 1}</td>
                <td>${dataProduct[i].title}</td>
                <td>${dataProduct[i].price}</td>
                <td>${dataProduct[i].taxes}</td>
                <td>${dataProduct[i].ads}</td>
                <td>${dataProduct[i].discount}</td>
                <td>${dataProduct[i].total}</td>
                <td>${dataProduct[i].category}</td>
                <td><button onclick="updateData(${i})" id="update">Update</button></td>
                <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
            </tr>`;
    }
    document.getElementById("tbody").innerHTML = table;

    let btnDeleteAll = document.getElementById("deleteAllData");
    if (dataProduct.length > 0) {
        btnDeleteAll.innerHTML = `<button onclick="deleteAll()">Delete All Data</button>`;
    } else {
        btnDeleteAll.innerHTML = '';
    }
}

// Show data
showData();

// Delete product
function deleteData(i) {
    dataProduct.splice(i, 1);
    localStorage.product = JSON.stringify(dataProduct);
    showData();
}

// Delete all data
function deleteAll() {
    localStorage.clear();
    dataProduct.splice(0);
    showData();
}

// Update products
function updateData(i) {
    title.value = dataProduct[i].title;
    price.value = dataProduct[i].price;
    taxes.value = dataProduct[i].taxes;
    ads.value = dataProduct[i].ads;
    discount.value = dataProduct[i].discount;
    getTotal();
    category.value = dataProduct[i].category;
    count.style.display = "none";
    submit.innerHTML = "Update";
    mood = "update";
    temp = i;
    scroll({
        top: 0,
        behavior: "smooth"
    });
}

// Search
let searchMood = "title";

searchByTitle.addEventListener("click", () => {
    getSearchMood(searchByTitle.id);
});

searchByCategory.addEventListener("click", () => {
    getSearchMood(searchByCategory.id);
});

function getSearchMood(id) {
    if (id === "searchTitle") {
        searchMood = "title";
        search.placeholder = "Search by title";
    } else {
        searchMood = "category";
        search.placeholder = "Search by category";
    }
    search.focus();
    search.value = '';
    showData();
}

search.addEventListener("keyup", () => {
    searchData(search.value);
});

function searchData(value) {
    let table = "";
    for (let i = 0; i < dataProduct.length; i++) {
        if (searchMood === "title") {
            if (dataProduct[i].title.includes(value.toLowerCase())) {
                table += `
                    <tr>
                        <td>${i + 1}</td>
                        <td>${dataProduct[i].title}</td>
                        <td>${dataProduct[i].price}</td>
                        <td>${dataProduct[i].taxes}</td>
                        <td>${dataProduct[i].ads}</td>
                        <td>${dataProduct[i].discount}</td>
                        <td>${dataProduct[i].total}</td>
                        <td>${dataProduct[i].category}</td>
                        <td><button onclick="updateData(${i})" id="update">Update</button></td>
                        <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
                    </tr>`;
            }
        } else {
            if (dataProduct[i].category.includes(value.toLowerCase())) {
                table += `
                    <tr>
                        <td>${i + 1}</td>
                        <td>${dataProduct[i].title}</td>
                        <td>${dataProduct[i].price}</td>
                        <td>${dataProduct[i].taxes}</td>
                        <td>${dataProduct[i].ads}</td>
                        <td>${dataProduct[i].discount}</td>
                        <td>${dataProduct[i].total}</td>
                        <td>${dataProduct[i].category}</td>
                        <td><button onclick="updateData(${i})" id="update">Update</button></td>
                        <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
                    </tr>`;
            }
        }
    }
    document.getElementById("tbody").innerHTML = table;
}

let search=document.getElementById("search");

let searchByTitle=document.getElementById("searchTitle");
let searchByCategory=document.getElementById("searchCatergoy");



let productData;
//localstorage has data
if(localStorage.products != null){
    productData=JSON.parse(localStorage.products);
}
//localstorage is empty
else{
    productData=[];
}

//console.log(productData);


let cartArr;
//localstorage has data
if(localStorage.cartData != null){
    cartArr=JSON.parse(localStorage.cartData);
}
//localstorage is empty
else{
    cartArr=[];
}

console.log(cartArr);


//read data
function showData(){

    let table='';
    for(let i=0;i<productData.length;i++){
      
      table += `
     <tr>
     <td>${productData[i].product_name}</td>
      <td>${productData[i].price}</td>
      <td>${productData[i].category}</td>
      <td>${productData[i].count}</td>
      <td><img src="${productData[i].product_img}"></td>
      <td><span onclick="deleteProduct(${i})" class="status delete" ${isProductInCart(productData[i].product_id) ? 'disabled' : ''}>Delete</span></td>
      </tr>`
      ;  
      }
      //console.log(table);

      if(productData.length<=0){
        table="<p>not found products</p>";
      }



    document.getElementById("tbody").innerHTML = table;

}


// Check if a product is in the cart
function isProductInCart(productId) {
    return cartArr.some(item => item.productId === productId);
}


    //display data
    showData();



    //delete products

    function deleteProduct(i) {
        if (isProductInCart(productData[i].product_id)) {
            alert("This product cannot be deleted because it is in the cart.");
        } else {
            productData.splice(i, 1);
            localStorage.products = JSON.stringify(productData);
            showData();
        }
    }



//search 
let s=document.getElementById("s");
s.onclick=()=>{
    search.focus();
   

}
//remove value in input
let x=document.getElementById("x");
x.onclick=()=>{
 search.value="";
    showData();

}

 
//search 

let searchMood="title";

//searchByTitle.addEventListener("click",getSearchMood(this.id));
//searchByCategory.addEventListener("click",getSearchMood(this.id));

searchByTitle.addEventListener("click", () => {
    getSearchMood(searchByTitle.id);
});

searchByCategory.addEventListener("click", () => {
    getSearchMood(searchByCategory.id);
});


//search mood
function getSearchMood(id){
console.log(id);

if(id=="searchTitle"){
    searchMood="title";
    search.placeholder="search by title";
}else{
    searchMood="category";
    search.placeholder="search by category";

}
search.focus();
search.value='';
showData();
}


search.addEventListener("keyup", () => {
    searchData(search.value);
});

//search data
function searchData(value){

    let table="";
    console.log(value);
    for(let i=0;i<productData.length;i++){
    if(searchMood=="title"){

        
            if(productData[i].product_name.includes(value.toLowerCase())){

                table +=`
                <tr>
                <td>${productData[i].product_name}</td>
                 <td>${productData[i].price}</td>
                 <td>${productData[i].category}</td>
                 <td>${productData[i].count}</td>
                 <td><img src="${productData[i].product_img}"></td>
                 <td><span onclick="deleteProduct(${i})" class="status delete">Delete</span></td>
                 </tr>
                 `
                 ;

            }
        
            
    } 
            else{
                
                    if(productData[i].category.includes(value.toLowerCase())){
                        console.log(productData[i].catergoy);
                        table+=`
                        <tr>
                        <td>${productData[i].product_name}</td>
                         <td>${productData[i].price}</td>
                         <td>${productData[i].category}</td>
                         <td>${productData[i].count}</td>
                         <td><img src="${productData[i].product_img}"></td>
                         <td><span onclick="deleteProduct(${i})" class="status delete">Delete</span></td>
                         </tr>
                         `
                         ; 
                       
                    }
                

            }
            

        }
        document.getElementById("tbody").innerHTML = table;

    }


    
    let lastSorted = "";
    let isAscending = true;
    
    function sortDataBy(column) {
        if (lastSorted === column) {
            productData.reverse();
            isAscending = false; // Toggle the sorting order
        } else {
            productData.sort(function (a, b) {
                // Check if the column is numeric
                const isNumeric = !isNaN(parseFloat(a[column])) && !isNaN(parseFloat(b[column]));
    
                // If numeric, use numeric comparison; otherwise, use string comparison
                if (isNumeric) {
                    return isAscending ? parseFloat(a[column]) - parseFloat(b[column]) : parseFloat(b[column]) - parseFloat(a[column]);
                } else {
                    return a[column].toLowerCase().localeCompare(b[column].toLowerCase());
                }
            });
            isAscending = true;
        }
    
        lastSorted = column;
        showData();
    }
    
    // Sort by name
    document.getElementById("title").addEventListener("click", function () {
        sortDataBy("product_name");
    });
    
    // Sort by category
    document.getElementById("category").addEventListener("click", function () {
        sortDataBy("category");
    });
    
    // Sort by price
    document.getElementById("price").addEventListener("click", function () {
        sortDataBy("price");
    });
    
    // Sort by count
    document.getElementById("count").addEventListener("click", function () {
        sortDataBy("count");
    });
    
    




    document.addEventListener("DOMContentLoaded", function () {
        let countProducts = 0;
    
        // Assuming productData is an array of products
        for (let i = 0; i < productData.length; i++) {
            // Example: Count only products with a certain condition (e.g., count products with price > 50)
                countProducts++;
            
        }
    
        console.log(countProducts);
    
        // Update HTML element content
        let numberOfProductElement = document.getElementById("numberOfProduct");
        numberOfProductElement.innerHTML = `<span>${countProducts}</span>`;
    });

let Name=document.getElementById("Name");
let email=document.getElementById("email");
let password=document.getElementById("password");
let type=document.getElementById("type");
let create=document.getElementById("createSeller");
let search=document.getElementById("searchData");

//console.log(search);
//global var
let temp;

let mood="create";

type.style.display="none"

//add seller
let sellerData;
//localstorage has data
if(localStorage.users != null){
    sellerData=JSON.parse(localStorage.users);
}
//localstorage is empty
else{
    sellerData=[];
}

create.onclick=function(){
        // Validate inputs
        if (validateInputs()) {
    let newSeller = {
       id: getRandomInt(10, 1000),
       name:Name.value.toLowerCase(),
       email:email.value,
       password:password.value,
       type:type.value
    }
    //add seller
    if(mood === "create"){
    sellerData.push(newSeller);
    //console.log(sellerData);
    }
    //update seller
    else{

        sellerData[temp] = newSeller;
        //after update
        mood="create";
        create.innerHTML="Create";
        create.style.background="#6b0808";
        type.style.display="none"



    }



    localStorage.setItem("users",JSON.stringify(sellerData));

    //clear data
    clearData();
    //display data
    showData();
}
}
//random ID
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

//clear inputs

function clearData(){
    Name.value="";
    email.value="";
    password.value="";
}


//read data
function showData(){

    let table='';
    for(let i=0;i<sellerData.length;i++){
      if(sellerData[i].type === "seller") { 
      table += `
     <tr>
     <td>
     <p>${sellerData[i].name}</p>
      </td>
      <td>${sellerData[i].email}</td>
      <td>${sellerData[i].password}</td>
      <td><span onclick="updateSeller(${i})" class="status update">Update</span></td>
      <td><span onclick="deleteSeller(${i})" class="status delete">Delete</span></td>
      </tr>`
      ;  

      }
      //console.log(table);
      //console.log(sellerData[i].type);

      if(sellerData.length<=0){
        table="<p>not found users</p>";
      }

}

    document.getElementById("tbody").innerHTML = table;

}

    //display data
    showData();


    
// Function to validate inputs
function validateInputs() {
    let nameRegex = /^[a-zA-Z\s]+$/; // Only letters and spaces allowed
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format
    let passwordRegex = /^.{6,}$/; // Minimum 6 characters

    // Validate Name
    if (!Name.value.match(nameRegex)) {
        alert("Please enter a valid name.");
        return false;
    }

    // Validate Email
    if (!email.value.match(emailRegex)) {
        alert("Please enter a valid email address.");
        return false;
    }

     // Check for duplicate email
     if (isEmailDuplicate(email.value)) {
        alert("Email address is already in use. Please use a different email.");
        return false;
    }

    // Validate Password
    if (!password.value.match(passwordRegex)) {
        alert("Please enter a valid password (at least 6 characters).");
        return false;
    }

    return true;
}


// Function to check for duplicate email
function isEmailDuplicate(newEmail) {
    for (let i = 0; i < sellerData.length; i++) {
        if(i==temp)continue;
        if (sellerData[i].email === newEmail && searchData[i] == "seller") {
            return true;
        }
    }
    return false;
}


//delete user

function deleteSeller(i){
   // console.log(i);
   sellerData.splice(i,1);

   //add data in local storage after remove
   localStorage.users = JSON.stringify(sellerData);
    //display data after remove
   showData();

}

//update data 

function updateSeller(i){
    //console.log(i);
    Name.value=sellerData[i].name;
    email.value=sellerData[i].email;
    password.value=sellerData[i].password;

   
    //change create to update
    create.innerHTML="Update";
    create.style.background="orange";
    type.style.display="inline-block"

    mood="update";
    
    temp = i;

    try {
        scroll({
            top: 0,
            behavior: "smooth"
        });
    } catch (error) {
        console.error("Error in smooth scrolling:", error);
    }

}

//search 
let s=document.getElementById("s");
s.onclick=()=>{
    search.focus();
   

}
let x=document.getElementById("x");
x.onclick=()=>{
 search.value="";
    showData();

}

search.addEventListener("keyup", () => {
    searchData(search.value);
});



//search by name
function searchData(value){

    //console.log(value);
    let table="";
    for(let i=0;i<sellerData.length;i++){
        if(sellerData[i].name.includes(value.toLowerCase()) && sellerData[i].type=="seller"){
            table += `
            <tr>
            <td>
            <p>${sellerData[i].name}</p>
             </td>
             <td>${sellerData[i].email}</td>
             <td>${sellerData[i].password}</td>
             <td><span onclick="updateSeller(${i})" class="status update">Update</span></td>
             <td><span onclick="deleteSeller(${i})" class="status delete">Delete</span></td>
             </tr>`
             ;  
             }
        }
        document.getElementById("tbody").innerHTML = table;

    }

let lastSorted = "";
let isAscending = true;

function sortDataBy(column) {
    if (lastSorted == column) {
        sellerData.reverse();
        isAscending = false;
    } else {
        sellerData.sort(function (a, b) {
            return a[column].toLowerCase().localeCompare(b[column].toLowerCase());
        });
        isAscending = true;
        lastSorted = column;
    }

    showData();
}
//sort by name
document.getElementById("sellerName").addEventListener("click", function () {
    sortDataBy("name");
});

//sort by email
document.getElementById("sellerEmail").addEventListener("click", function () {
    sortDataBy("email");
});




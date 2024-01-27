
let ordersData;
//localstorage has data
if(localStorage.OrderData != null){
    ordersData=JSON.parse(localStorage.OrderData);
}
//localstorage is empty
else{
  ordersData=[]; 
}

console.log(ordersData);


//read data
function showData(){

    let table='';
    for(let i=0;i<ordersData.length;i++){
      
        table += `
        <tr>
          <td>${(ordersData[i]['Order Id'] * 100).toFixed(0)}</td>
          <td>${ordersData[i]['productId']}</td>
          <td>${ordersData[i]['First name']} ${ordersData[i]['Last name']}</td>
          <td>${ordersData[i]['quantity'][0].numOfItems},${ordersData[i]['quantity'][1].numOfItems}</td>
          <td>${ordersData[i]['products total price ']}</td>
          <td>${ordersData[i]['Date of Order']}</td>
        </tr>`;
      }
      //console.log(table);

      if(ordersData.length<=0){
        table="<p>not found users</p>";
      }



    document.getElementById("tbody").innerHTML = table;

}

    //display data
    showData();


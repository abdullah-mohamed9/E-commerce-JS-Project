const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');

allSideMenu.forEach(item=> {
	const li = item.parentElement;

	item.addEventListener('click', function () {
		allSideMenu.forEach(i=> {
			i.parentElement.classList.remove('active');
		})
		li.classList.add('active');
	})
});




// TOGGLE SIDEBAR
const menuBar = document.querySelector('#content nav .bx.bx-menu');
const sidebar = document.getElementById('sidebar');

menuBar.addEventListener('click', function () {
	sidebar.classList.toggle('hide');
})



const searchButton = document.querySelector('#content nav form .form-input button');
const searchButtonIcon = document.querySelector('#content nav form .form-input button .bx');
const searchForm = document.querySelector('#content nav form');

searchButton.addEventListener('click', function (e) {
	if(window.innerWidth < 576) {
		e.preventDefault();
		searchForm.classList.toggle('show');
		if(searchForm.classList.contains('show')) {
			searchButtonIcon.classList.replace('bx-search', 'bx-x');
		} else {
			searchButtonIcon.classList.replace('bx-x', 'bx-search');
		}
	}
})





if(window.innerWidth < 768) {
	sidebar.classList.add('hide');
} else if(window.innerWidth > 576) {
	searchButtonIcon.classList.replace('bx-x', 'bx-search');
	searchForm.classList.remove('show');
}


window.addEventListener('resize', function () {
	if(this.innerWidth > 576) {
		searchButtonIcon.classList.replace('bx-x', 'bx-search');
		searchForm.classList.remove('show');
	}
})



const switchMode = document.getElementById('switch-mode');

switchMode.addEventListener('change', function () {
	if(this.checked) {
		document.body.classList.add('dark');
	} else {
		document.body.classList.remove('dark');
	}
})





document.addEventListener("DOMContentLoaded", function() {
	let countCustomer = 0;
	let countSeller=0;
	// Count the number of elements with type "customer"
	for (let i = 0; i < userData.length; i++) {
		if (userData[i].type === "customer") {
			countCustomer++;
		}else if(userData[i].type === "seller"){
			countSeller++;
		}
	}

	console.log(countCustomer);

	// Update HTML element content
	let numberOfCustomerElement = document.getElementById("numberOfCustomer");
	let numberOfSellerElement = document.getElementById("numberOfSeller");
	if (numberOfCustomerElement) {
		numberOfCustomerElement.innerHTML = `<span>${countCustomer}</span>`;
	} 
	if (numberOfSellerElement) {
		numberOfSellerElement.innerHTML = `<span>${countSeller}</span>`;
	} 

});


//logout

document.addEventListener("DOMContentLoaded", function () {
    // ... (Your existing code)

    // Get the logout button element
    const logoutBtn = document.getElementById("logoutBtn");

    // Add an event listener for the logout button
    logoutBtn.addEventListener("click", function (e) {
        e.preventDefault();

        // Perform logout logic here if needed (e.g., clearing session, etc.)

        // Redirect to the home page (replace 'home.html' with your actual home page URL)
        window.location.href = '../index.html';
    });
});

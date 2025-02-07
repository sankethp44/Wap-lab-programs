// Sample grocery items
const groceries = [
    { id: 1, name: "Apple", price: 215, image: "images/1.webp",stock: 10  },
    { id: 2, name: "Banana", price: 100, image: "images/2.webp",stock: 0 },
    { id: 3, name: "Custard apple", price: 70, image: "images/3.webp",stock: 10  },
    { id: 4, name: "Mango", price: 32, image: "images/4.webp",stock: 20  },
    { id: 5, name: "Watermelon", price:94 , image: "images/5.webp",stock: 30 },
    { id: 6, name: "Kiwi", price: 280, image: "images/6.webp",stock: 10 },

];

// Function to load grocery items dynamically
function loadGroceries() {
    const groceryList = document.getElementById("grocery-list");

    groceries.forEach(item => {
        const groceryItem = document.createElement("article");
        groceryItem.classList.add("col-md-6", "mb-4");

        groceryItem.innerHTML = `
            <div class="card">
                <img src="${item.image}" class="card-img-top" alt="${item.name}">
                <div class="card-body">
                    <h5 class="card-title">${item.name}</h5>
                    <p class="card-text">Price: Rs${item.price} per unit</p>
                    <label for="quantity-${item.id}" class="form-label">Enter Quantity:</label>
                    <input type="number" id="quantity-${item.id}" class="form-control" min="0" value="0">
                </div>
            </div>
        `;

        groceryList.appendChild(groceryItem);
     // Add event listener to the input field to trigger the proceedToInventory function on Enter key
        const quantityInput = document.getElementById(`quantity-${item.id}`);
        quantityInput.addEventListener('keypress', function (event) {
            if (event.key === 'Enter') {
                event.preventDefault();  // Prevent default action (form submission)
                proceedToInventory();    // Trigger proceedToInventory function
            }
        });
    });
}

// Function to store selected items and navigate to inventory page
function proceedToInventory() {
    const selectedItems = [];
    let errorOccurred = false;

    groceries.forEach(item => {
        const quantity = parseInt(document.getElementById(`quantity-${item.id}`).value);
        
        // Check if the entered quantity is greater than available stock
        if (quantity > item.stock) {
            // Show error message
            alert(`Error: Only ${item.stock} ${item.name}(s) are available in stock.`);
            errorOccurred = true;
        } else if (quantity > 0) {
            // Add item to the selectedItems if quantity is valid
            selectedItems.push({ ...item, quantity, totalPrice: item.price * quantity });
        }
    });

    // If error occurred, don't proceed to the next page
    if (errorOccurred) {
        return; // Stop execution if there's an error
    }

    // Store the selected items and proceed to the inventory page
    sessionStorage.setItem("selectedItems", JSON.stringify(selectedItems));
    window.location.href = "inventory.html";
}
function loadInventory() {
    const selectedItems = JSON.parse(sessionStorage.getItem("selectedItems")) || [];
    const table = document.getElementById("inventoryTable");

    selectedItems.forEach(item => {
        const row = document.createElement("tr");

        // Determine stock availability
        let stockStatus = item.stock > 0 ? item.stock : '<span style="color: red;">Not Available</span>';
        
        // Calculate total price only if stock is greater than 0
        let totalPrice = item.stock > 0 ? item.totalPrice : 'N/A';

        row.innerHTML = `
            <td><img src="${item.image}" width="50" height="50" alt="${item.name}"></td>
            <td>${item.name}</td>
            <td>${stockStatus}</td>
            <td>Rs${item.price}</td>
            <td>${totalPrice === 'N/A' ? totalPrice : `Rs${totalPrice}`}</td>
        `;

        table.appendChild(row);
    });
}

// Call functions when pages load
if (window.location.pathname.includes("index.html")) {
    window.onload = loadGroceries;
} else if (window.location.pathname.includes("inventory.html")) {
    window.onload = loadInventory;
}


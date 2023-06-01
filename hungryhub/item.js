// Fetch all items from the API
function fetchItems() {
    fetch("http://localhost:8088/items/all", {
      method: "GET",
      headers: {
        key: "D70S8M",
      },
    })
      .then(response => response.json())
      .then(data => {
        var itemTable = document.getElementById("itemTable");
        itemTable.innerHTML = "";
  
        data.forEach(item => {
          var row = document.createElement("tr");
          var itemIdCell = document.createElement("td");
          var itemNameCell = document.createElement("td");
          var categoryCell = document.createElement("td");
          var quantityCell = document.createElement("td");
          var costCell = document.createElement("td");
          var actionCell = document.createElement("td");
  
          itemIdCell.textContent = item.itemId;
          itemNameCell.textContent = item.itemName;
          categoryCell.textContent = item.category.categoryName;
          quantityCell.textContent = item.quantity;
          costCell.textContent = item.cost;
  
          var updateButton = document.createElement("button");
          updateButton.textContent = "Update";
          updateButton.onclick = function () {
            openUpdateForm(item);
          };
  
          var deleteButton = document.createElement("button");
          deleteButton.textContent = "Delete";
          deleteButton.onclick = function () {
            deleteItem(item.itemId);
          };
  
          actionCell.appendChild(updateButton);
          actionCell.appendChild(deleteButton);
  
          row.appendChild(itemIdCell);
          row.appendChild(itemNameCell);
          row.appendChild(categoryCell);
          row.appendChild(quantityCell);
          row.appendChild(costCell);
          row.appendChild(actionCell);
  
          itemTable.appendChild(row);
        });
      })
      .catch(error => {
        console.log("Error fetching items:", error);
      });
  }
  
// Add a new item
function addItem() {
  var itemName = document.getElementById("name").value;
  var categoryName = document.getElementById("category").value;
  var quantity = document.getElementById("quantity").value;
  var cost = document.getElementById("price").value;

  var item = {
    itemName,
    category: {
      categoryName,
    },
    quantity,
    cost,
  };

  fetch("http://localhost:8088/items/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      key: "D70S8M",
    },
    body: JSON.stringify(item),
  })
    .then((response) => response.json())
    .then(() => {
      // Clear the form inputs
      document.getElementById("name").value = "";
      document.getElementById("category").value = "";
      document.getElementById("quantity").value = "";
      document.getElementById("price").value = "";

      // Fetch items again to update the table
      fetchItems();
    })
    .catch((error) => console.error("Error adding item:", error));
}

// Delete an item
function deleteItem(itemId) {
  fetch(`http://localhost:8088/items/delete/${itemId}`, {
    method: "DELETE",
    headers:{
        key:"D70S8M",
    },
  })
    .then(() => {
      // Fetch items again to update the table
      fetchItems();
    })
    .catch((error) => console.error("Error deleting item:", error));
}

// Open the update form with item details
function openUpdateForm(item) {
//   var item = JSON.parse(itemString);
  document.getElementById("updateForm").style.display = "block";
  document.getElementById("updateName").value = item.itemName;
  document.getElementById("updateCategory").value = item.category.categoryName;
  document.getElementById("updateQuantity").value = item.quantity;
  document.getElementById("updatePrice").value = item.cost;

  document.getElementById("updateItemButton").onclick = function () {
    updateItem(item.itemId);
  };
}

function updateItem(itemId) {
    // alert(`The items id is ${itemId} inside the updateItem function`);
  var itemName = document.getElementById("updateName").value;
  var categoryName = document.getElementById("updateCategory").value;
  var quantity = document.getElementById("updateQuantity").value;
  var cost = document.getElementById("updatePrice").value;

  var updatedItem = { itemName, category: { categoryName }, quantity, cost };

  fetch(`http://localhost:8088/items/update/${itemId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      key: "D70S8M",
    },
    body: JSON.stringify(updatedItem),
  })
    .then((response) => response.json())
    .then(() => {
      fetchItems();
      closeUpdateForm();
    })
    .catch((error) => {
      console.log("Error updating item:", error);
    });
}

function closeUpdateForm() {
  document.getElementById("updateForm").style.display = "none";
}

// Fetch items when the page loads
fetchItems();

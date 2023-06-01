function displayRestaurants() {
    fetch("http://localhost:8088/restaurants/view", {
      method: "GET",
      headers: {
        "key": "D70S8M",
      },
    })
      .then(response => response.json())
      .then(data => {
        var restaurantTable = document.getElementById("restaurantTable");
        restaurantTable.innerHTML = "";

        data.forEach(restaurant => {
          var row = document.createElement("tr");
          var idCell = document.createElement("td");
          var nameCell = document.createElement("td");
          var addressCell = document.createElement("td");
          var managerCell = document.createElement("td");
          var contactCell = document.createElement("td");
          var actionCell = document.createElement("td");

          idCell.textContent = restaurant.restaurantId;
          nameCell.textContent = restaurant.restaurantName;
          addressCell.textContent = `${restaurant.address.buildingName}, ${restaurant.address.streetNo}, ${restaurant.address.area}, ${restaurant.address.city}, ${restaurant.address.state}, ${restaurant.address.country}, ${restaurant.address.pincode}`;
          managerCell.textContent = restaurant.managerName;
          contactCell.textContent = restaurant.contactNunber;

          var updateButton = document.createElement("button");
          updateButton.textContent = "Update";
          updateButton.onclick = function () {
            // alert(`The id is ${restaurant.restaurantId}`);
            openUpdateForm(restaurant);
            // alert("Function is riunning");
          };

          var deleteButton = document.createElement("button");
          deleteButton.textContent = "Delete";
          deleteButton.onclick = function () {
            deleteRestaurant(restaurant.restaurantId);
          };

          actionCell.appendChild(updateButton);
          actionCell.appendChild(deleteButton);

          row.appendChild(idCell);
          row.appendChild(nameCell);
          row.appendChild(addressCell);
          row.appendChild(managerCell);
          row.appendChild(contactCell);
          row.appendChild(actionCell);

          restaurantTable.appendChild(row);
        });
      })
      .catch(error => {
        console.log("Error fetching restaurants:", error);
      });
}


  function addRestaurant() {
    
    var restaurantName = document.getElementById("name").value;
    var buildingName = document.getElementById("building").value;
    var streetNo = document.getElementById("streetno").value;
    var area = document.getElementById("area").value;
    var city = document.getElementById("city").value;
    var state = document.getElementById("state").value;
    var country = document.getElementById("country").value;
    var pincode = document.getElementById("pincode").value;
    var managerName = document.getElementById("manager").value;
    var contactNunber = document.getElementById("contact").value;

    var data = {
      restaurantName: restaurantName,
      address: {
        buildingName: buildingName,
        streetNo: streetNo,
        area: area,
        city: city,
        state: state,
        country: country,
        pincode: pincode,
      },
      managerName:managerName,
      contactNunber:contactNunber
    };

    fetch("http://localhost:8088/restaurants/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "key": "D70S8M"
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(() => {
        displayRestaurants();
        document.getElementById("name").value = "";
        document.getElementById("building").value = "";
        document.getElementById("streetno").value = "";
        document.getElementById("area").value = "";
        document.getElementById("city").value = "";
        document.getElementById("state").value = "";
        document.getElementById("country").value = "";
        document.getElementById("pincode").value = "";
        document.getElementById("manager").value = "";
        document.getElementById("contact").value = "";
      })
      .catch(error => {
        console.log("Error adding restaurant:", error);
      });
  }

  function openUpdateForm(restaurant) {
    document.getElementById("updateForm").style.display = "block";
    document.getElementById("updateName").value = restaurant.restaurantName;
    document.getElementById("updateBuilding").value = restaurant.address.buildingName;
    document.getElementById("updateStreetNo").value = restaurant.address.streetNo;
    document.getElementById("updateArea").value = restaurant.address.area;
    document.getElementById("updateCity").value = restaurant.address.city;
    document.getElementById("updateState").value = restaurant.address.state;
    document.getElementById("updateCountry").value = restaurant.address.country;
    document.getElementById("updatePinCode").value = restaurant.address.pincode;
    document.getElementById("updateManager").value = restaurant.managerName;
    document.getElementById("updateContact").value = restaurant.contactNunber;

    document.getElementById("updateRestaurantButton").onclick = function () {
      // document.getElementById("addrestaurant").style.display = "none";
      updateRestaurant(restaurant.restaurantId);
    };
  }

  function closeUpdateForm() {
    document.getElementById("updateForm").style.display = "none";
  }

  function updateRestaurant(id) {
    // alert("Inside UpdateRestaurant function");
    var newId = document.getElementById("updateId").value;
    var newName = document.getElementById("updateName").value;
    var newBuildingName = document.getElementById("updateBuilding").value;
    var newStreetNo = document.getElementById("updateStreetNo").value;
    var newArea = document.getElementById("updateArea").value;
    var newCity = document.getElementById("updateCity").value;
    var newState = document.getElementById("updateState").value;
    var newCountry = document.getElementById("updateCountry").value;
    var newPinCode = document.getElementById("updatePinCode").value;
    var newManagerName = document.getElementById("updateManager").value;
    var newContactNumber = document.getElementById("updateContact").value;

    var data = {
      restaurantId:newId,
      restaurantName: newName,
      address: {
        buildingName: newBuildingName,
        streetNo: newStreetNo,
        area: newArea,
        city: newCity,
        state: newState,
        country: newCountry,
        pincode: newPinCode
      },
      managerName:newManagerName,
      contactNunber:newContactNumber
    };

    fetch(`http://localhost:8088/restaurants/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        key: "D70S8M"
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(() => {
        displayRestaurants();
        closeUpdateForm();
      })
      .catch(error => {
        console.log("Error updating restaurant:", error);
      });
  }

  function deleteRestaurant(restaurantId) {
    fetch(`http://localhost:8088/restaurants/delete/${restaurantId}`, {
      method: "DELETE",
      headers:{
        "key":"D70S8M"
      }
    })
      .then(response => response.json())
      .then(() => {
        displayRestaurants();
      })
      .catch(error => {
        console.log("Error deleting restaurant:", error);
      });
  }

  // Call the displayRestaurants function on page load
  window.onload = function () {
    displayRestaurants();
  };
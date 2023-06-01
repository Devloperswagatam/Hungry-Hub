function displayCustomers() {
  fetch("http://localhost:8088/customers/all",{
    method:"GET",
    headers:{
        key
    }
  })
    .then((response) => response.json())
    .then((data) => {
      var customerTable = document.getElementById("customerTable");
      customerTable.innerHTML = "";

      data.forEach((customer) => {
        var row = document.createElement("tr");
        var idCell = document.createElement("td");
        var firstNameCell = document.createElement("td");
        var lastNameCell = document.createElement("td");
        var ageCell = document.createElement("td");
        var genderCell = document.createElement("td");
        var contactNoCell = document.createElement("td");
        var emailCell = document.createElement("td");
        var passwordCell = document.createElement("td");
        var actionCell = document.createElement("td");

        idCell.textContent = customer.customerId;
        firstNameCell.textContent = customer.firstName;
        lastNameCell.textContent = customer.lastName;
        ageCell.textContent = customer.age;
        genderCell.textContent = customer.gender;
        contactNoCell.textContent = customer.mobileNumber;
        emailCell.textContent = customer.email;
        passwordCell.textContent = customer.password;

        var updateButton = document.createElement("button");
        updateButton.textContent = "Update";
        updateButton.onclick = function () {
          // alert(`The id is ${customer.customerId}`);
          openUpdateForm(customer);
          // alert("Function is running");
        };

        var deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.onclick = function () {
          deleteCustomer(customer.customerId);
        };

        actionCell.appendChild(updateButton);
        actionCell.appendChild(deleteButton);

        row.appendChild(idCell);
        row.appendChild(firstNameCell);
        row.appendChild(lastNameCell);
        row.appendChild(ageCell);
        row.appendChild(genderCell);
        row.appendChild(contactNoCell);
        row.appendChild(emailCell);
        row.appendChild(passwordCell);
        row.appendChild(actionCell);

        customerTable.appendChild(row);
      });
    })
    .catch((error) => {
      console.log("Error fetching customers:", error);
    });
}

function addCustomer() {
  var firstName = document.getElementById("fname").value;
  var lastName = document.getElementById("lname").value;
  var age = document.getElementById("age").value;
  var gender = document.getElementById("gender").value;
  var contactNo = document.getElementById("contact").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  var data = {
    firstName: firstName,
    lastName: lastName,
    age: age,
    gender: gender,
    mobileNumber: contactNo,
    email: email,
    password: password,
  };

  fetch("http://localhost:8088/customers/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then(() => {
      displayCustomers();
      document.getElementById("fname").value = "";
      document.getElementById("lname").value = "";
      document.getElementById("age").value = "";
      document.getElementById("gender").value = "";
      document.getElementById("contact").value = "";
      document.getElementById("email").value = "";
      document.getElementById("password").value = "";
    })
    .catch((error) => {
      console.log("Error adding customer:", error);
    });
}

function openUpdateForm(customer) {
  document.getElementById("updateForm").style.display = "block";
  document.getElementById("updateId").value = customer.customerId;
  document.getElementById("updatefName").value = customer.firstName;
  document.getElementById("updatelName").value = customer.lastName;
  document.getElementById("updateAge").value = customer.age;
  document.getElementById("updateGender").value = customer.gender;
  document.getElementById("updateContact").value = customer.mobileNumber;
  document.getElementById("updateEmail").value = customer.email;
  document.getElementById("updatePassword").value = customer.password;

  document.getElementById("updateCustomerButton").onclick = ()=>{
    updateCustomer(customer.customerId);
  }
}

function closeUpdateForm() {
  document.getElementById("updateForm").style.display = "none";
}

function updateCustomer() {
    // alert("Inside UpdateCustomer function");
  var id = document.getElementById("updateId").value;
  var firstName = document.getElementById("updatefName").value;
  var lastName = document.getElementById("updatelName").value;
  var age = document.getElementById("updateAge").value;
  var gender = document.getElementById("updateGender").value;
  var contactNo = document.getElementById("updateContact").value;
  var email = document.getElementById("updateEmail").value;
  var password = document.getElementById("updatePassword").value;

  var data = {
    customerId: id,
    firstName: firstName,
    lastName: lastName,
    age: age,
    gender: gender,
    mobileNumber: contactNo,
    email: email,
    password: password,
  };

  fetch("http://localhost:8088/customers/update", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      key:"D70S8M"
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then(() => {
      displayCustomers();
      closeUpdateForm();
    })
    .catch((error) => {
      console.log("Error updating customer:", error);
    });
}

function deleteCustomer(id) {
  fetch(`http://localhost:8088/customers/delete/${id}`, {
    method: "DELETE",
    headers:{
        key
    }
  })
    .then((response) => response.json())
    .then(() => {
      displayCustomers();
    })
    .catch((error) => {
      console.log("Error deleting customer:", error);
    });
}

window.onload = () => {
  displayCustomers();
};

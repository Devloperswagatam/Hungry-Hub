document.addEventListener("DOMContentLoaded", () => {
  const loginContainer = document.querySelector(".login-cont");
  const loginForm = document.getElementById("login-form");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const roleInput = document.getElementById("role");
  const loginButton = document.getElementById("login-btn");
  const logoutButton = document.getElementById("logout-btn");
  const errorMsg = document.getElementById("error-msg");
  const signupForm = document.getElementById("signup-form");
  const signupButton = document.getElementById("signup-btn");
  const signupContainer = document.querySelector(".signup-cont");
  const signupFormBtn = document.getElementById("sign-up-btn");
  const homeContainer = document.querySelector(".home-cont");
  const homeLink = document.getElementById("home-link");
  const menuLink = document.getElementById("menu-link");
  const menuContainer = document.querySelector(".menu-container");
  const foodContainer = document.querySelector(".foodcart-container");


  // let customerID = "";

  // SIGN UP JAVASCRIPT=========================
  signupContainer.style.display = "none";

  signupButton.addEventListener("click", (e) => {
    e.preventDefault();
    loginContainer.style.display = "none";
    signupContainer.style.display = "block";
  });

  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    var firstName = document.getElementById("firstname").value;
    var lastName = document.getElementById("lastname").value;
    var email = document.getElementById("signup-email").value;
    var password = document.getElementById("signup-password").value;
    var age = document.getElementById("age").value;
    var mobileNumber = document.getElementById("phone").value;
    var gender = document.getElementById("gender").value;
    var role = "customer";

    var customer = {
      firstName,
      lastName,
      email,
      password,
      age,
      mobileNumber,
      gender,
    };

    fetch("http://localhost:8088/customers/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customer),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert("Failed to add customer");
        }
      })
      .then((data) => {
        var customerID = data.customerId;
        loginContainer.style.display = "block";
        signupContainer.style.display = "none";
        alert(`Customer added successfully! customerID=${customerID}`);
      })
      .catch((error) => {
        alert("Check the fields");
        console.error("Error", error);
      });
  });

  // LOGIN JAVASCRIPT===========================
  let role = "customer";
  let key = "";
  var loginEmail = "";

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    loginEmail = emailInput.value;
    var password = passwordInput.value;
    role = "customer";

    var data = {
      email: loginEmail,
      password: password,
      role: role,
    };

    fetch("http://localhost:8088/app/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          loginContainer.style.display = "none";
          homeContainer.style.display = "block";
          errorMsg.textContent = "";
          key = response.headers.get("key");
          alert("Logged in successfully!!");
          return response.json();
        } else {
          errorMsg.textContent = "Invalid email or password or role";
          alert("Invalid email or password");
          throw new Error("Login Failed");
        }
      })
      // .then((data) => {
      //   console.log(data);
      //   alert("Logged in successfully!!");
      // })
      .catch((error) => {
        // alert("Some error occured");
        console.error("Error", error);
      });
  });

  logoutButton.addEventListener("click", () => {
    if (role && key) {
      fetch("http://localhost:8088/app/logout", {
        method: "POST",
        headers: {
          role: role,
          key: key,
        },
      })
        .then((response) => {
          if (response.ok) {
            loginContainer.style.display = "block";
            homeContainer.style.display = "none";
            errorMsg.textContent = "";
            emailInput.value = "";
            passwordInput.value = "";
            roleInput.value = "";
            role = "";
            key = "";
            alert("Logged out successfully");
          } else {
            errorMsg.textContent = "Logout failed";
            throw new Error("Logout Failed");
          }
        })
        .catch((error) => {
          console.error("Error", error);
        });
    } else {
      errorMsg.textContent = "Role or key is missing";
    }
  });

homeLink.addEventListener("click",()=>{
  // restaurantContainer.innerHTML = "";
  menuContainer.style.display = "none";
  itemContainer.style.display = "none";
  foodContainer.style.display = "none";
  restaurantContainer.style.display = "grid";
});
  

  //Fetching restaurants========================
  const restaurantContainer = document.querySelector(".restaurant-container");
  const itemContainer = document.querySelector(".restaurant-item-cont");

  console.log(key);
  // Fetch the API and create div containers for each restaurant
  fetch(`http://localhost:8088/restaurants/view`, {
    method: "GET",
    headers: {
      key: "D70S8M",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      data.forEach((restaurant) => {
        const restaurantDiv = document.createElement("div");
        restaurantDiv.classList.add("restaurant");
        restaurantDiv.innerHTML = `
          <h3>${restaurant.restaurantName}</h3>
          <p>Manager Name: ${restaurant.managerName}</p>
          <p>Contact Number: ${restaurant.contactNunber}</p>
          <p>Address: ${`${restaurant.address.buildingName}, ${restaurant.address.streetNo}, ${restaurant.address.area}, ${restaurant.address.city}, ${restaurant.address.state}, ${restaurant.address.country}, ${restaurant.address.pincode}`}</p>
        `;

        restaurantDiv.addEventListener("click", () => {
          showRestaurantItems(restaurant.restaurantId,restaurant.restaurantName);
        });
        restaurantContainer.appendChild(restaurantDiv);
      });
    })
    .catch((error) => {
      console.error("Error", error);
    });


  //FETCHING MENU ITEMS  FOR INDIVIDUAL RESTAURANT============================

  // Function to show restaurant items
  function showRestaurantItems(restaurantId,restaurantName) {
    itemContainer.innerHTML = ""; // Clear the item container

    // loginContainer.style.display = "none";
    restaurantContainer.style.display = "none";
    itemContainer.style.display = "grid";
    // alert(`Inside the individual restaurant function loginEmail is ${loginEmail}`);

    // document.createElement("h1").innerHTML = `${restaurantName}`;

    fetch(`http://localhost:8088/restaurants/${restaurantId}/items`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        data.forEach((item) => {
          const itemDiv = document.createElement("div");
          itemDiv.classList.add("item");
          itemDiv.innerHTML = `
            <h3>${item.itemName}</h3>
            <p>Price: ${item.cost}</p>
            <p>Category: ${item.category.categoryName}</p>
            <p>Quantity:</p>
            <button class="increase-btn" data-item-id="${item.itemId}">+</button>
            <p id="quantity-${item.itemId}">${item.quantity}</p>
            <button class="decrease-btn" data-item-id="${item.itemId}">-</button>
            <button class="addItem" data-item-id="${item.itemId}" onclick="addItemToCart(${item.itemId}, '${loginEmail}')">Add</button>
          `;
          itemContainer.appendChild(itemDiv);
        });

        // Add event listeners to increase and decrease buttons
        const increaseButtons = document.querySelectorAll(".increase-btn");
        const decreaseButtons = document.querySelectorAll(".decrease-btn");
        const addItemButtons = document.querySelectorAll(".addItem");

        increaseButtons.forEach((button) => {
          button.addEventListener("click", () => {
            const itemId = button.getAttribute("data-item-id");
            increaseItemQuantity(itemId);
          });
        });

        decreaseButtons.forEach((button) => {
          button.addEventListener("click", () => {
            const itemId = button.getAttribute("data-item-id");
            decreaseItemQuantity(itemId);
          });
        });
      })
      .catch((error) => {
        console.error("Error", error);
        alert("error in restaurant individual link");
      });
  }

  // Function to increase item quantity
  function increaseItemQuantity(itemId) {
    const quantitySpan = document.getElementById(`quantity-${itemId}`);
    let quantity = parseInt(quantitySpan.textContent);
    quantity++;
    quantitySpan.textContent = quantity;
  }

  // Function to decrease item quantity
  function decreaseItemQuantity(itemId) {
    const quantitySpan = document.getElementById(`quantity-${itemId}`);
    let quantity = parseInt(quantitySpan.textContent);
    if (quantity > 0) {
      quantity--;
      quantitySpan.textContent = quantity;
    }
  }

  // FETCHING ALL MENU ITEMS====================================

  

  menuLink.addEventListener("click", () => {
    menuContainer.innerHTML = ""; // Clear the menu container
    itemContainer.innerHTML = "";
    restaurantContainer.style.display = "none";
    foodContainer.innerHTML = "";
    menuContainer.style.display = "grid";
    // alert(`loginEmail Is ${loginEmail}  insid the munuLInk function`);

    fetch("http://localhost:8088/items/all", {
      method: "GET",
      headers: {
        key: "D70S8M",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        data.forEach((item) => {
          const itemDiv = document.createElement("div");
          itemDiv.classList.add("item");
          itemDiv.innerHTML = `
          <h3>${item.itemName}</h3>
          <p>Price: ${item.cost}</p>
          <p>Category: ${item.category.categoryName}</p>
          <p>Quantity:</p>
          <button class="increase-btn" data-item-id="${item.itemId}">+</button>
          <p id="quantity-${item.itemId}">${item.quantity}</p>
          <button class="decrease-btn" data-item-id="${item.itemId}">-</button>
          <button class="addItem" data-item-id="${item.itemId}" onclick="addItemToCart(${item.itemId},'${loginEmail}')">Add</button>
          `;
          menuContainer.appendChild(itemDiv);
        });

        // Add event listeners to increase and decrease buttons
        const increaseButtons = document.querySelectorAll(".increase-btn");
        const decreaseButtons = document.querySelectorAll(".decrease-btn");

        increaseButtons.forEach((button) => {
          button.addEventListener("click", () => {
            const itemId = button.getAttribute("data-item-id");
            increaseItemQuantity(itemId);
          });
        });

        decreaseButtons.forEach((button) => {
          button.addEventListener("click", () => {
            const itemId = button.getAttribute("data-item-id");
            decreaseItemQuantity(itemId);
          });
        });
      })
      .catch((error) => {
        console.error("Error", error);
        alert("error in menu link");
      });
  });


  //==============================Fetching cart items===================

  const cartLink = document.getElementById("cart-link");
  cartLink.addEventListener("click", ()=>{
    menuContainer.innerHTML = ""; // Clear the menu container
    itemContainer.innerHTML = "";
    restaurantContainer.style.display = "none";
    viewCart();
  });


});

// ======================================ADDING ITEMS TO FOODCARD===========================
async function addItemToCart(itemId,loginEmail) {
  try {
    var customerID = await getCustomerId(loginEmail);
    if (!customerID) {
      alert("customer ID is null");
      return;
    }
    
    const quantitySpan = document.getElementById(`quantity-${itemId}`);
    const quantity = parseInt(quantitySpan.textContent);
    
    // Make the API request to add the item to the cart
    fetch(`http://localhost:8088/foodcart/addtocart/${itemId}/${customerID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ itemId, quantity }),
    })
      .then((response) => {
        if (response.ok) {
          alert("Item added to cart successfully!");
          return response.json();
        } else {
          alert("Failed to add item to cart");
        }
      })
      .catch((error) => {
        console.error("Error", error);
        alert("Syntax error");
      });
  } catch (error) {
    console.error("Error", error);
    alert("Failed to retrieve customer ID");
  }
}

let cartId = 1;

async function getCustomerId(loginEmail) {
  try {
    let response = await fetch("http://localhost:8088/customers/all", {
      method: "GET",
      headers: {
        key: "D70S8M", // Replace with your actual key
      },
    });

    if (response.ok) {
      let data = await response.json();
      let filteredCustomers = data.filter((customer) => customer.email === loginEmail);

      if (filteredCustomers.length > 0) {
        cartId = filteredCustomers[0].cartId;
        return filteredCustomers[0].customerId; // Return the ID of the first matching customer
      } else {
        return null; // Return null if no matching customer found
      }
    } else {
      throw new Error("Error fetching customers");
    }
  } catch (error) {
    console.log("Error fetching customers:", error);
    throw error;
  }
}

// =======================================Food Cart View======================================

function viewCart() {
  const foodCartContainer = document.querySelector(".foodcart-container");
  // alert(`cart id is ${cartId}`);

  // Clear the food cart container before fetching and displaying the items
  foodCartContainer.innerHTML = "";
  
  // emptyCartMessage.style.display = "none";

  // Make the API request to fetch the cart items for the customer
  fetch(`http://localhost:8088/items/view/${cartId}`, {
    method: "GET",
    headers: {
      key: "D70S8M", // Replace with your actual key
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Failed to fetch cart items");
      }
    })
    .then((data) => {
      if (data.length > 0) {
        // If cart items are found, create div containers for each item
        data.forEach((item) => {
          const cartItemDiv = document.createElement("div");
          cartItemDiv.classList.add("cart-item");
          cartItemDiv.innerHTML = `
            <h3>${item.itemName}</h3>
            <p>${item.category.categoryName}</p>
            <p>Quantity: ${item.quantity}</p>
            <p>Price: ${item.cost}</p>
            <button class="remove-button" data-item-id="${item.itemId}">Remove</button>
          `;
          foodCartContainer.appendChild(cartItemDiv);
        });

        // Attach click event listeners to the remove buttons
        const removeButtons = document.querySelectorAll(".remove-button");
        removeButtons.forEach((button) => {
          button.addEventListener("click", () => {
            const itemId = button.dataset.itemId;
            removeItem(cartId,itemId);
          });
        });

      } else {
        // If no cart items are found, display a message
        const emptyCartMessage = document.createElement("p");
        emptyCartMessage.textContent = "Your cart is empty.";
        foodCartContainer.appendChild(emptyCartMessage);
      }

      // Display the food cart container
      foodCartContainer.style.display = "block";
    })
    .catch((error) => {
      console.error("Error fetching cart items:", error);
    });
}

function removeItem(cartId,itemId) {
  fetch(`http://localhost:8088/foodcart/${cartId}/${itemId}`, {
    method: "DELETE",
    headers: {
      key: "D70S8M", // Replace with your actual key
    },
  })
    .then((response) => {
      if (response.ok) {
        alert("Item removed from cart successfully!");
        // Refresh the cart view after removing the item
        viewCart();
      } else {
        alert("Failed to remove item from cart");
        throw new Error("Failed to remove item from cart");
      }
    })
    .catch((error) => {
      console.error("Error removing item from cart:", error);
    });
}




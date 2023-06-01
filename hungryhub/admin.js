function logout() {
    const logoutButton = document.getElementById("logoutbtn");
  
    logoutButton.addEventListener("click", () => {
      alert(`role and key is ${role} ${key}`);
      if (role && key) {
        fetch("http://localhost:8088/app/logout", {
          method: "POST",
          headers: {
            role: "admin",
            key: key
          },
        })
          .then((response) => {
            if (response.ok) {
              role = "";
              key = "";
              window.location.href = "login.html";
              // emailInput.value = "";
              // passwordInput.value = "";
              // roleInput.value = "";
  
              alert("Logged out successfully");
            } else {
            //   errorMsg.textContent = "Logout failed";
            alert("Logout failed");
              throw new Error("Logout Failed");
            }
          })
          .catch((error) => {
            console.error("Error", error);
          });
      } else {
        // errorMsg.textContent = "Role or key is missing";
        alert("Role or key is missing")
      }
    });
  }
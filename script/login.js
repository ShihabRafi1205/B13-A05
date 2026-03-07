document.getElementById("login-btn").addEventListener("click", (e) => {
  e.preventDefault;

  const userName = document.getElementById("user-name");
  const inputPassword = document.getElementById("password-input");

  if (userName.value == "admin" && inputPassword.value == "admin123") {
    window.location.assign("/home.html");
  } else {
    alert("Login failed");
    return;
  }
});

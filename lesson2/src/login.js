function Login() {
  const getUsernameLogin = document.getElementById("username").value;
  const getPasswordLogin = document.getElementById("password").value;

  alert(`${getUsernameLogin}, ${getPasswordLogin}`);
}

function Register() {
  const getUsername = document.getElementById("register-username").value;
  const getEmail = document.getElementById("register-email").value;
  const getPassword = document.getElementById("register-password").value;

  alert(`${getUsername}, ${getEmail}, ${getPassword}`);
}

function LoginSelectBtn() {
  const toggleLogin = document.getElementById("login");
  const toggleRegister = document.getElementById("register");
  const toggleLoginBtn = document.getElementById("login-select-1");
  const toggleRegisterBtn = document.getElementById("register-select-1");

  toggleRegisterBtn.style.cssText = "color: black; font-weight: 400;";
  toggleLoginBtn.style.cssText = "color: orange; font-weight: 700;";
  toggleRegister.style.display = "none";
  toggleLogin.style.display = "block";
}

function RegisterSelectBtn() {
  const toggleLogin = document.getElementById("login");
  const toggleRegister = document.getElementById("register");
  const toggleLoginBtn = document.getElementById("login-select-1");
  const toggleRegisterBtn = document.getElementById("register-select-1");

  toggleRegisterBtn.style.cssText = "color: orange; font-weight: 700;";
  toggleLoginBtn.style.cssText = "color: black; font-weight: 400;";
  toggleRegister.style.display = "block";
  toggleLogin.style.display = "none";
}

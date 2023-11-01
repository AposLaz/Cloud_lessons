const username = document.getElementById("username");
const password = document.getElementById("password");

document.addEventListener("change", () => {
  console.log(username.value);
  console.log(password.value);
});

function Login(e) {
  alert(`Username ${username.value}, Password ${password.value}`);
}

//Login User

const Login = async (e)=>{
  e.preventDefault();
  try {
  //get user username
  const getUsernameLogin = document.getElementById("username").value;
  //get user password
  const getPasswordLogin = document.getElementById("password").value;

  // set body
  const urlencoded = new URLSearchParams();
  urlencoded.append("username", getUsernameLogin);
  urlencoded.append("password", getPasswordLogin);
  urlencoded.append("client_id", "frontend-app");
  urlencoded.append("client_secret", "p7DvIPfPK7mLs3UUf9YTXjLda8vee6Tr");
  urlencoded.append("grant_type", "password");

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: urlencoded
  };
    const response = await fetch("http://localhost:8182/auth/realms/e-commerce/protocol/openid-connect/token", requestOptions)
    if(response.ok){
      const data = await response.json()
      console.log(data)
      const token = data.access_token
      console.log(token)

      // window.localStorage.setItem("userData",)
      // window.location.href('http://localhost:5500')
    }else{
      const err = await response.json()
      console.log(err)
    }
  } catch (error) {
    console.log('error', error)
  }
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

function decodeJwt(jwtToken) {
  const base64Url = jwtToken.split('.')[1]; // Get the payload part of the JWT
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Replace Base64 URL encoding characters
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join('')); // Decode Base64 and handle URI component encoding

  return JSON.parse(jsonPayload);
}

//Login User

async function Login(e){
  //prevent reload page onsubmit
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
  urlencoded.append("client_id", "test-client");
  urlencoded.append("client_secret", "h4rXdX83e3qB6C6S0RybiC4F20iniTro");
  urlencoded.append("grant_type", "password");

  const requestOptions_1 = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: urlencoded
  };
    const response = await fetch("http://localhost:8182/auth/realms/test-2/protocol/openid-connect/token", requestOptions_1)
    if(response.ok){
      const data = await response.json()
      //get token
      const access_token = data.access_token
      const refresh_token = data.refresh_token
      localStorage.setItem("refresh_token", refresh_token)

      //decode token
      const decodedPayload = decodeJwt(access_token);

      //store username, email and roles in localStorage
      console.log(data)
      //set username and email in a localStorage
      localStorage.setItem("username", decodedPayload.preferred_username)
      localStorage.setItem("email", decodedPayload.email)
      
      const role = decodedPayload.realm_access.roles.filter((el)=> el==='seller' || el==='customer')
      localStorage.setItem("role", role)

      //if user is customer redirect him to products page
      if(localStorage.getItem("role") === 'customer'){
        window.location.href = 'http://localhost:8000'
      }

      if(localStorage.getItem("role") === 'seller'){
        window.location.href = 'http://localhost:5500'
      }
      
    }else{
      const err = await response.json()
      console.log(err)
    }
  } catch (error) {
    console.log('error', error)
  }
}

async function Register(e) {
  
  //prevent reload page onsubmit
  e.preventDefault()

  //from register form get all data for register a user
  const getUsername = document.getElementById("register-username").value;
  const getEmail = document.getElementById("register-email").value;
  const getPassword = document.getElementById("register-password").value;
  const getRole = document.getElementById("select-role").value;

  //create an object with these data
  const registerData = {
    email: getEmail, 
    enabled:"true", //enabled always true 
    username: getUsername, 
    attributes: {
        client_id: "test-2"  //name of your client
    },
    groups: [ getRole ], //role users selected
    credentials: [{
      type:"password",
      value: getPassword,
      temporary: "false"
    }]
  }

  
  try {
    // Prepare Data for GET Token from Master Realm
    // set body
    const urlencoded = new URLSearchParams();
    urlencoded.append("grant_type", "client_credentials");
    urlencoded.append("client_id", "admin-cli");
    urlencoded.append("client_secret", "bXR2iWVogPUfM8KHx21aMKbr0FCNRlfp"); //secret from admin-cli in Master Realm

    const requestOptions_1 = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: urlencoded
    };

    const getTokenFromMasterRealm = await fetch('http://localhost:8182/auth/realms/master/protocol/openid-connect/token',requestOptions_1)
    
    if(getTokenFromMasterRealm.ok){
      //request is success
      const data = await getTokenFromMasterRealm.json()
      const access_token = data.access_token

      const requestOptions_2 = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+access_token
        },
        body: JSON.stringify(registerData)
      };
      //Prepare Data for Register User
      const registerUser = await fetch('http://localhost:8182/auth/admin/realms/test-2/users', requestOptions_2)

      if(registerUser.ok){
        //redirect user to Login Page and Appear a message Registration happens Ok
        alert('User Registered Succesfully')
        window.location.href('http://localhost:5500/login.html')
      }else{
        const err = await registerUser.json()
        //print error and try appear the error for user
        console.log(err)
      }

    }else{
      //request is fail for some reason
      const err = await getTokenFromMasterRealm.json()

      //print error
      console.log(err)
    }
  } catch (error) {
    
  }

  return false
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

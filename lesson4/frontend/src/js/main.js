//declare url where I want to send data
const url = "http://localhost:5000/products";

//when browser load run the fetch
window.addEventListener("load", async () => {
  //if user does not login then redirect him to login page
  if(!window.localStorage.getItem("role")){
    window.location.href = "http://localhost:8000/login.html"
  }

  try {
    //more about fetch https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    const response = await fetch(url, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
    });

    //communicate with server happens succesfully
    if (response.ok) {
      const products = await response.json();

      //Appear products in id with name cards
      const cardsDiv = document.getElementById("cards");

      products.forEach((data) => {
        console.log(data.img);
        const context = `
        <div class="card">
          <p>${data.title}</p>
          <img src=data:image/jpeg;base64,${data.img} />
          <p>${data.description}</p>
          <p>${data.price}</p>
        </div>
        `;
        cardsDiv.innerHTML += context;
      });
    }
  } catch (e) {
    console.log(e);
  }
});

async function Logout(){
  if(localStorage.getItem("refresh_token")){
    const refreshToken = localStorage.getItem("refresh_token")
    // set body
    const urlencoded = new URLSearchParams();
    urlencoded.append("refresh_token", refreshToken);
    urlencoded.append("client_id", "test-client");
    urlencoded.append("client_secret", "h4rXdX83e3qB6C6S0RybiC4F20iniTro"); //secret from admin-cli in Master Realm

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: urlencoded
    };

    const response = await fetch('http://localhost:8182/auth/realms/test-2/protocol/openid-connect/logout', requestOptions)
    if(response.ok){
      localStorage.clear()
      window.location.href = 'http://localhost:8000/login.html'
    }

  }
}

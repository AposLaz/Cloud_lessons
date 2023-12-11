//declare url where I want to send data
const url = "http://localhost:5000/products";

//when browser load run the fetch
window.addEventListener("load", async () => {
  //if user not login redirect to login page
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
  
}

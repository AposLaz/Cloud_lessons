/* Section 1 */
// 1) asychronous logic setTimeout in browser
// 2) document

const arr = [
  {
    title: "First element",
    img: "./assets/fruits.jpg",
    description: "test 1",
    price: 3,
  },
  {
    title: "Second element",
    img: "./assets/fruits.jpg",
    description: "test 2",
    price: 4,
  },
  {
    title: "Third element",
    img: "./assets/fruits.jpg",
    description: "test 3",
    price: 5,
  },
];

const cardsDiv = document.getElementById("cards");

arr.forEach((data) => {
  const context = `
    <div class="card">
      <p>${data.title}</p>
      <img src=${data.img} />
      <p>${data.description}</p>
      <p>${data.price}</p>
    </div>
    `;
  cardsDiv.innerHTML += context;
});

// 3) innerHTML
// 4) create div element -- createElement
// 5) give background color
// 6) give a className
// 7) append div in body
// 8) create a p element
// 9) innerHTML in text
// 10) append in div

/* Section 2 */
// 11) Array
// 12) Object (key,value)
// 13) Create array of objects with title and description
// 14) Loop forEach, or for loop console.log(results)
// 15) write a card in js with html (innerHTML += )

// const apiResult = [
//   {
//     title: "title1",
//     description: "desc1",
//     img: "./assets/fruits.jpg",
//   },
//   {
//     title: "title2",
//     description: "desc2",
//     img: "./assets/fruits.jpg",
//   },
//   {
//     title: "title3",
//     description: "desc3",
//     img: "./assets/fruits.jpg",
//   },
// ];

// const cardsDiv = document.getElementById("cards");
// apiResult.forEach(function (value, index) {
//   console.log(value);
//   console.log(index);

//   const cardContent = `
// <div id=${value.title} class="card-context">
//  <h1>${value.title}</h1>
//  <img src=${value.img} style="width: 200px;"/>
//  <p>${value.description}</p>
// </div>
// `;

//   cardsDiv.innerHTML += cardContent;
// });

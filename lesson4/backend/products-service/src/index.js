const express = require("express");
const cors = require("cors");
const fs = require("fs"); //read from files

/*
  Express.js is the most popular web framework for Node.js. It is designed for building web applications and APIs
  official website: https://expressjs.com/
*/
const app = express();

/* 
  We can have a port as environment. If we dont define 
  environment then application will run in port 5000
*/
const port = process.env.PORT || 5000;

/*
CORS stands for Cross-Origin Resource Sharing, 
and it is a security feature implemented by web browsers 
to control and restrict web page scripts from making requests 
to a different domain than the one that served the web 
page. In other words, CORS is a mechanism that allows 
or restricts web browsers from making requests to 
different origins (domains) for security reasons.
 */
app.use(cors());

/**
 * when you add app.use(express.json()); to your
 * Express application, you are telling Express to
 * use the express.json() middleware for every incoming HTTP
 * request, and if the request has a JSON payload in its body,
 * it will be automatically parsed and made
 * accessible as req.body for your route handlers to use.
 */
app.use(express.json());

/**
 * You can serve files using Express's express.static middleware.
 * Let's assume you have a directory called "images" containing
 * the files you want to serve:
 */
app.use(express.static("images"));

app.get("/health", (req, res) => {
  res.send("ok");
});
//get all data
app.get("/products", (req, res) => {
  //
  res.send(products);
});

//get data by id
app.get("/products/:id", (req, res) => {
  const id = Number(req.params.id); // req.params.id is in type string. Convert it to Number and get :id from url
  const product_with_id = products.find((element) => element.id === id); //find data with this id
  if (product_with_id) {
    res.send(product_with_id);
  } else {
    res.send({ error: `Product with id: ${id}  didn't find` });
  }
});

//store new data in a database
app.post("/products", (req, res) => {
  const data = req.body;
  products.push(data);
  res.send("Data stored succesfully");
});

//update data
app.put("/products/:id", (req, res) => {
  const id = Number(req.params.id); // req.params.id is in type string. Convert it to Number and get :id from url
  const query = req.query;
  console.log(query);
  const data_for_update = req.body;
  const product_with_id = products.find((element) => element.id === id);
  if (product_with_id) {
    product_with_id.price = data_for_update.price;
    res.send({
      success: `Product with id: ${id} updated succesfully`,
    });
  } else {
    res.send({ error: `Product with id: ${id}  didn't find` });
  }
});

//delete data
app.delete("/products/:id", (req, res) => {
  const id = Number(req.params.id); // req.params.id is in type string. Convert it to Number and get :id from url
  const product_with_id = products.findIndex((element) => element.id === id);
  console.log(product_with_id);
  if (product_with_id >= 0) {
    products.splice(product_with_id, 1);
    res.send({
      success: `Product with id: ${id} deleted succesfully`,
    });
  } else {
    res.send({ error: `Product with id: ${id}  didn't find` });
  }
});

app.listen(port, () => {
  console.log("Products service running in PORT " + port);
});

/*
    DONT USE THIS FILE. ALL DATA HAVE TO COMMUNICATE WITH A DATABASE 
*/

const products = [
  {
    id: 1,
    title: "First element",
    img: fs.readFileSync(`${__dirname}/images/fruits.jpg`, "base64"),
    description: "test 1",
    price: 3,
  },
  {
    id: 2,
    title: "Second element",
    img: fs.readFileSync(`${__dirname}/images/fruits.jpg`, "base64"), //read image from files
    description: "test 2",
    price: 4,
  },
  {
    id: 3,
    title: "Third element",
    img: fs.readFileSync(`${__dirname}/images/fruits.jpg`, "base64"), //read image from files
    description: "test 3",
    price: 5,
  },
];

const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());

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
  res.send(product_with_id);
});

//store new data in a database
app.post("/products", (req, res) => {
  const data = req.body;
  console.log(data);
  res.send("Data stored succesfully");
});

app.listen(port, () => {
  console.log("Products service running in PORT " + port);
});

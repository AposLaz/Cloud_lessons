const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 4000;
//init db
const db = require('./databaseConnect')
db.connectDB()

app.use(cors());
app.use(express.json());

//create an order
app.post("/orders", (req, res) => {
  const order = req.body;
  //store to database

  //send to kafka
  sendDataToProducts(req.body)
  res.send("Order created succesfully");
});

app.listen(port, () => {
  console.log("listening in port " + port);
});

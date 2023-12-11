const kafka = require('./kafka') //initialize kafka consumer

const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5000;

const { connection } = require("./databaseConnect");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health", (req, res) => {
  res.send("ok");
});

//get all data
app.get("/products", async (req, res) => {
  //
  try {
    //get db
    const db = await connection;
    const results = await db.execute("SELECT * FROM products");
    res.send(results[0]);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//get data by id
app.get("/products/:id", async (req, res) => {
  try {
    const id = req.params.id;
    //get db
    const db = await connection;

    const results = await db.query("SELECT * FROM products WHERE `id` = ?", [
      id,
    ]);
    res.send(results[0][0]);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//store new data in a database
app.post("/products", async (req, res) => {
  const product = req.body;
  try {
    const db = await connection;
    const results = await db.execute(
      "INSERT INTO products (title, img, price, quantity, user_product) VALUES (?, ?, ?, ?, ?)",
      [
        product.title,
        product.img,
        product.price,
        product.quantity,
        product.user_product,
      ]
    );

    res.send(results[0]);
  } catch (error) {
    console.error("Error insert products:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log("Products service running in PORT " + port);
});

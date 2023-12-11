const express = require("express");
const cors = require("cors");

const port = process.env.PORT || 8000;
//init db
const { connection } = require("./databaseConnect");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/orders", async (req, res) => {
  try {
    //get db
    const db = await connection;

    const results = await db.execute("SELECT * FROM orders");
    res.send(results[0]);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/orders/:id", async (req, res) => {
  try {
    const id = req.params.id;
    //get db
    const db = await connection;

    const results = await db.query("SELECT * FROM orders WHERE `id` = ?", [id]);
    res.send(results[0][0]);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const kafka = require('./kafka')

//create an order
app.post("/orders", async (req, res) => {
  const order = req.body;
  try {
    const db = await connection;

    //store to database
    // const jsonDataString = JSON.stringify(order);
    const results = await db.execute(
      "INSERT INTO orders (products, status, total_price) VALUES (?, ?, ?)",
      [order.products, order.status, order.total_price]
    );

    //send to kafka
      const msg = {
        id: results[0].insertId,
        products: order.products
      }

      await kafka.kafkaProducer(msg)

    res.send(results);
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log("listening in port " + port);
});

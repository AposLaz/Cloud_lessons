const { connection } = require("./databaseConnect");
const { kafkaProducer } = require("./kafka");

const handleProducts = async (orders) => {
  try {
    const db = await connection;
    //check if products amount is ok
    for await (const product of orders.products) {
      //fetch products by id for each product
      //and check if quantity is ok
      const data = await db.query("SELECT * FROM products WHERE `id`=?", [
        product.product_id,
      ]);
      const quantity = data[0][0].quantity;
      if (quantity < product.amount || quantity - product.amount < 0) {
        return false;
      }
    }

    //for each product update database and kafka producer Success
    for await (const product of orders.products) {
      const data = await db.query("SELECT * FROM products WHERE `id`=?", [
        product.product_id,
      ]);
      const newQuantity = data[0][0].quantity - product.amount;
      const update = await db.execute(
        "UPDATE products SET quantity = ? WHERE id = ?",
        [newQuantity, product.product_id]
      );
    }
    return true;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

module.exports = { handleProducts };

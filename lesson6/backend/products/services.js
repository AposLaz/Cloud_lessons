//update database for products amount
const { connection } = require('./databaseConnect')

const handleProducts = async (orders)=>{
    try {
        const db = await connection;

        //check if products amount is > 0
        for await (const obj of orders.products){
            const data = await db.query("SELECT * FROM products WHERE `id`=?",
                                        [obj.product_id])

            const quantity = data[0][0].quantity
            if(quantity && quantity < obj.amount){
                return false
            }
        }

        for await (const obj of orders.products){
            const data = await db.query("SELECT * FROM products WHERE `id`=?",
                                        [obj.product_id])

            const newQuantity = data[0][0].quantity - obj.amount
            const update = await db.execute("UPDATE products SET quantity = ? WHERE id = ?",
            [newQuantity, obj.product_id])
        }

        return true

    } catch (error) {
        console.log(error.message)
        throw new Error(error)
    }
}

module.exports = { handleProducts }
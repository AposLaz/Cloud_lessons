const { Kafka, Partitioners } = require('kafkajs')
const { handleProducts } = require('./services')

const kafka = new Kafka({
  clientId: 'products-app',
  brokers: ['localhost:8097'],
  retry: {
    initialRetryTime: 2000,
    retries: 5
  }
})

const producer = kafka.producer({
    allowAutoTopicCreation: true,
    createPartitioner: Partitioners.LegacyPartitioner
})

const sendOrders = async (msg)=>{
 await producer.connect()
 await producer.send({
    topic: 'productsProducer',
    messages: [{
        value: JSON.stringify(msg)
    }]
 })

 await producer.disconnect()
}

const consumer = kafka.consumer({
    groupId: "products-group",
    allowAutoTopicCreation: true,
})

const fetchProductsFromOrderTopic = async ()=>{
  try {
    await consumer.connect()
    await consumer.subscribe({topics: ["ordersProducer"]})

    await consumer.run({
      eachMessage: async ({message}) => {
        const jsonMsg = JSON.parse(message.value)
        const result = await handleProducts(jsonMsg)
        
        if(result){
          //return order id and Success
        }

        if(!result){
          //return order id and Reject
        }

      }
    })
  } catch (error) {               
    await consumer.disconnect()
    console.log(error.message)
  }
}

setTimeout(async ()=>{
  try {
    await fetchProductsFromOrderTopic()
  } catch (error) {
    console.log(error.message)
  }
},2000)

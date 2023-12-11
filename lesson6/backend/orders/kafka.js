const { Kafka, Partitioners } = require('kafkajs')

const kafka = new Kafka({
  clientId: 'order-app',
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
    topic: 'ordersProducer',
    messages: [{
        value: JSON.stringify(msg)
    }]
 })

 await producer.disconnect()
}

module.exports = {
    kafkaProducer: sendOrders
}


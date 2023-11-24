const { Kafka } = require('kafkajs');

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['kafka:19092'],
    retry: {
        initialRetryTime: 2000,
        retries: 20
      } 
});

//create default partitioner
const producer = kafka.producer({ 
    allowAutoTopicCreation: true,
})


const sendDataToProducts = async (msg)=>{

    await producer.connect()
    await producer.send({
        topic: 'ordersProducer',
        messages: [{
            value: JSON.stringify(msg),
        }],
      })
      
      await producer.disconnect()
}

module.exports = {
    kafkaProducer: sendDataToProducts(msg)
};
const { Kafka } = require("kafkajs");
const { Partitioners } = require("kafkajs");

const kafka = new Kafka({
  clientId: "order-app",
  brokers: ["localhost:8097"],
  retry: {
    initialRetryTime: 2000,
    retries: 20,
  },
});

//create default partitioner
const producer = kafka.producer({
  allowAutoTopicCreation: true,
  createPartitioner: Partitioners.LegacyPartitioner,
});

const sendDataToProducts = async (msg) => {
  await producer.connect();
  await producer.send({
    topic: "ordersProducer",
    messages: [
      {
        value: JSON.stringify(msg),
      },
    ],
  });

  await producer.disconnect();
};

module.exports = {
  kafkaProducer: sendDataToProducts,
};

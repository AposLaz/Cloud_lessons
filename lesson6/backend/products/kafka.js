const { Kafka } = require("kafkajs");
const { Partitioners } = require("kafkajs");

const kafka = new Kafka({
  clientId: "producer-app",
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

const sendDataToOrders = async (msg) => {
  await producer.connect();
  await producer.send({
    topic: "productsProducer",
    messages: [
      {
        value: JSON.stringify(msg),
      },
    ],
  });

  await producer.disconnect();
};

const consumer = kafka.consumer({
  groupId: "products-group",
  allowAutoTopicCreation: true,
});

const { handleProducts } = require("./services");
const fetchDataFromProducts = async () => {
  try {
    await consumer.connect();
    await consumer.subscribe({ topics: ["ordersProducer"] });

    await consumer.run({
      eachMessage: async ({ message }) => {
        const ordersMsg = JSON.parse(message.value);

        const data = await handleProducts(ordersMsg);

        let returnMsg = {
          id: ordersMsg.id, //id of order
          status: "Success",
        };

        if (!data) {
          returnMsg.status = "Reject";
        }
        await sendDataToOrders(returnMsg);
      },
    });
  } catch (error) {
    await consumer.disconnect();
    process.exit(0);
  }
};

setTimeout(async () => {
  try {
    await fetchDataFromProducts();
  } catch (error) {
    console.error(`[example/consumer] ${error.message}`, error);
  }
}, 20000);

module.exports = {
  kafkaProducer: sendDataToOrders,
};

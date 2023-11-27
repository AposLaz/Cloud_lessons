const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "post-orders",
  brokers: "kafka:19092",
  retry: {
    initialRetryTime: 30000,
    retries: 20,
  },
});

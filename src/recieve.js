const amqp = require("amqplib/callback_api");
const { storePoll, connectToMongoDb } = require("./dbConfig");

// const opt = {
//   credentials: require("amqplib").credentials.plain("user", "password"),
// };
// const urlCredentials = "amqp://feedapp.username:feedapp.password@localhost";

amqp.connect("amqp://localhost", (error0, connection) => {
  if (error0) {
    throw error0;
  }
  connection.createChannel((error1, channel) => {
    if (error1) {
      throw error1;
    }

    const queueName = "polls";

    channel.assertQueue(queueName, {
      durable: false,
    });

    connectToMongoDb();
    console.log(`Polls queue ('${queueName}') ready!`);

    channel.consume(
      queueName,
      async function (msg) {
        const pollsObj = JSON.parse(msg.content.toString());
        await storePoll(pollsObj);
        console.log("Recieved poll: ", pollsObj);
      },
      {
        noAck: true,
      }
    );
  });
});

var amqp = require("amqplib/callback_api");

// const opt = {
//   credentials: require("amqplib").credentials.plain("user", "password"),
// };
amqp.connect("amqp://localhost", function (error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function (error1, channel) {
    if (error1) {
      throw error1;
    }

    var queue = "polls";
    var msgJson = {
      pollId: "abc1234",
      question: "Spørsmål?",
      optionOne: "Alternativ 1",
      optionTwo: "Alternativ 2",
      counts: {
        optionOneCount: 12,
        optionTwoCount: 14,
      },
      started: new Date(),
      ended: new Date(),
      owner: {
        id: "cba321",
        name: "Lars",
      },
    };
    const msgString = JSON.stringify(msgJson);

    channel.assertQueue(queue, {
      durable: false,
    });
    channel.sendToQueue(queue, Buffer.from(msgString));

    console.log(" [x] Sent %s", msgJson);
  });
  setTimeout(function () {
    connection.close();
    process.exit(0);
  }, 500);
});

const mongoose = require("mongoose");

const connectToMongoDb = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/polls")
    .then(() => console.log("Connected to MongoDB!"))
    .catch(() => console.log("Error connecting to MongoDB!"));
};

const Poll = mongoose.model("Poll", {
  pollId: String,
  question: String,
  optionOne: String,
  optionTwo: String,
  counts: {
    optionOneCount: Number,
    optionTwoCount: Number,
  },
  started: Date,
  ended: Date,
  owner: {
    id: String,
    name: String,
  },
});

const storePoll = async (poll) => {
  const createdPoll = await Poll.create(poll);
  return createdPoll;
};

const getAllPolls = async () => {
  return await Poll.find({});
};

module.exports = {
  connectToMongoDb,
  storePoll,
  getAllPolls,
};

// storePoll({
//   id: "abc123",
//   question: "Spørsmål?",
//   optionOne: "Alternativ 1",
//   optionTwo: "Alternativ 2",
//   counts: {
//     optionOneCount: 12,
//     optionTwoCount: 14,
//   },
//   started: new Date(),
//   ended: new Date(),
//   owner: {
//     id: "cba321",
//     name: "Lars",
//   },
// });

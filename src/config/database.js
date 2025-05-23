const mongoose = require("mongoose");
const config = require("./index");

const connect = async () => {
  try {
    await mongoose.connect(config.mongoose.url, config.mongoose.options);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    process.exit(1);
  }
};

module.exports = connect;

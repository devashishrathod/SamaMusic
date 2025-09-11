const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

exports.mongoDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDb database connection established");
  } catch (error) {
    console.log("Error connecting to mongoDB:", error.message);
  }
};

require("dotenv").config();
const mongoose = require("mongoose");

const SensorData = require("../src/models/SensorData");

mongoose.connect(process.env.MONGO_URI).then(async () => {
  await SensorData.collection.createIndex({ timestamp: 1 });
  await SensorData.collection.createIndex({ temperature: 1 });
  await SensorData.collection.createIndex({ humidity: 1 });
  await SensorData.collection.createIndex({ airQuality: 1 });
  process.exit();
});

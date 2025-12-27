require("dotenv").config();
const mongoose = require("mongoose");

const Rule = require("../src/models/Rule");

mongoose.connect(process.env.MONGO_URI).then(async () => {
  await Rule.deleteMany({});
  await Rule.create({
    temperatureMax: 50,
    humidityMax: 70,
    airQualityMax: 150,
  });
  process.exit();
});

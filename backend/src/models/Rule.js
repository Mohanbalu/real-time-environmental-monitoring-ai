const mongoose = require("mongoose");

const ruleSchema = new mongoose.Schema(
  {
    temperatureMax: {
      type: Number,
      required: true,
    },
    humidityMax: {
      type: Number,
      required: true,
    },
    airQualityMax: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Rule", ruleSchema);

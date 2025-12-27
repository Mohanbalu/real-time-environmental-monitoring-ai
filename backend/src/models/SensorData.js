const mongoose = require("mongoose");

const sensorDataSchema = new mongoose.Schema(
  {
    sensorId: String,
    temperature: Number,
    humidity: Number,
    airQuality: Number,
    timestamp: Date,

    isAnomaly: {
      type: Boolean,
      default: false,
    },
    anomalyReasons: [String],
    aiExplanation: {
      type: String,
    },
    aiGeneratedAt: {
      type: Date,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("SensorData", sensorDataSchema);

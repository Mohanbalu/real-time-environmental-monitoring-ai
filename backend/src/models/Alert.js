const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema(
  {
    sensorId: String,
    message: String,
    severity: String,
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Alert", alertSchema);

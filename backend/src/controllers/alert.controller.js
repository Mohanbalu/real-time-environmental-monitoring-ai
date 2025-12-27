const Alert = require("../models/Alert");
const Rule = require("../models/Rule");
const { sendSMS } = require("../services/alert.service");

const getAlerts = async (req, res) => {
  const alerts = await Alert.find().sort({ createdAt: -1 }).limit(50);
  res.json(alerts);
};

const checkAndTriggerAlert = async (sensorData) => {
  const rule = await Rule.findOne();
  if (!rule) return;

  const reasons = [];

  if (sensorData.temperature > rule.temperatureMax)
    reasons.push("Temperature threshold exceeded");

  if (sensorData.humidity > rule.humidityMax)
    reasons.push("Humidity threshold exceeded");

  if (sensorData.airQuality > rule.airQualityMax)
    reasons.push("Air quality threshold exceeded");

  if (reasons.length === 0) return;

  const alert = await Alert.create({
    reasons,
    data: sensorData,
  });

  await sendSMS(reasons.join(", "));
  return alert;
};

module.exports = {
  getAlerts,
  checkAndTriggerAlert,
};

const SensorData = require("../models/SensorData");

const getRecentData = async (req, res) => {
  try {
    const data = await SensorData.find()
      .sort({ timestamp: -1 })
      .limit(50);

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAnomalies = async (req, res) => {
  try {
    const anomalies = await SensorData.find({ isAnomaly: true })
      .sort({ timestamp: -1 })
      .limit(50);

    res.json(anomalies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getRecentData,
  getAnomalies,
};

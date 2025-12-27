const SensorData = require("../models/SensorData");

const getAIInsights = async (req, res) => {
  const data = await SensorData.find({
    aiExplanation: { $exists: true },
  })
    .sort({ aiGeneratedAt: -1 })
    .limit(5);

  res.json(data);
};

module.exports = { getAIInsights };

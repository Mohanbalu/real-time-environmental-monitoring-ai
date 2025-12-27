const SensorData = require("../models/SensorData");
const { detectAnomaly } = require("./anomaly.service");
const { triggerAlert } = require("./alert.service");
const { generateAIExplanation } = require("./ai.service");

const saveSensorData = async (data) => {
  try {
    // 1️⃣ Detect anomaly
    const anomalyResult = detectAnomaly(data);

    // 2️⃣ Create sensor document
    const sensorData = new SensorData({
      sensorId: data.sensorId,
      temperature: data.temperature,
      humidity: data.humidity,
      airQuality: data.airQuality,
      timestamp: data.timestamp,
      isAnomaly: anomalyResult.isAnomaly,
      anomalyReasons: anomalyResult.reasons,
    });

    // 3️⃣ Save base sensor data
    await sensorData.save();

    // 4️⃣ If anomaly → trigger alert + AI explanation
    if (anomalyResult.isAnomaly) {
      console.log("🚨 ALERT TRIGGERED");

      // 🔔 Send SMS alert
      await triggerAlert({
        sensorId: data.sensorId,
        reasons: anomalyResult.reasons,
      });

      // 🤖 AI EXPLANATION WITH COOLDOWN
      const lastAI = await SensorData.findOne({
        sensorId: data.sensorId,
        aiExplanation: { $exists: true },
      }).sort({ aiGeneratedAt: -1 });

      const now = Date.now();
      const cooldown = 10 * 60 * 1000; // 10 minutes

      if (
        !lastAI ||
        !lastAI.aiGeneratedAt ||
        now - new Date(lastAI.aiGeneratedAt).getTime() > cooldown
      ) {
        const explanation = await generateAIExplanation(data.sensorId);

        sensorData.aiExplanation = explanation;
        sensorData.aiGeneratedAt = new Date();

        await sensorData.save();

        console.log("🤖 AI Explanation Generated");
      }
    }
  } catch (error) {
    console.error("Sensor save error:", error.message);
  }
};

module.exports = { saveSensorData };

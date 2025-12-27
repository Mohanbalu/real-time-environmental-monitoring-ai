const axios = require("axios");
const SensorData = require("../models/SensorData");

const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent";

let lastAICallTime = 0;
let aiInProgress = false;

const AI_COOLDOWN_MS = 5 * 60 * 1000; // 5 minutes

const generateAIExplanation = async (sensorId) => {
  const now = Date.now();

  // 1️⃣ Prevent parallel calls
  if (aiInProgress) {
    return "AI explanation skipped (already in progress).";
  }

  // 2️⃣ Cooldown check
  if (now - lastAICallTime < AI_COOLDOWN_MS) {
    return "AI explanation skipped due to cooldown.";
  }

  aiInProgress = true;
  lastAICallTime = now;

  try {
    const records = await SensorData.find({ sensorId })
      .sort({ timestamp: -1 })
      .limit(10);

    const prompt = `
You are an environmental monitoring expert.

Recent sensor readings:
${records
  .map(
    (r) =>
      `Temperature: ${r.temperature}, Humidity: ${r.humidity}, AQI: ${r.airQuality}`
  )
  .join("\n")}

Explain briefly why this environmental pattern is abnormal.
`;

    const response = await axios.post(
      `${GEMINI_URL}?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }],
      },
      { headers: { "Content-Type": "application/json" } }
    );

    return response.data.candidates[0].content.parts[0].text;
  } catch (err) {
    console.error("⚠️ Gemini REST API failed, using fallback");
    return "Anomaly detected due to environmental values exceeding safe thresholds.";
  } finally {
    aiInProgress = false; // 3️⃣ Release lock
  }
};

module.exports = { generateAIExplanation };

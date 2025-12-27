import axios from "axios";

const BASE_URL =
  "https://real-time-environmental-monitoring-ai.onrender.com";

export const fetchAIInsights = async () => {
  const res = await axios.get(`${BASE_URL}/api/ai/insights`);
  return res.data;
};

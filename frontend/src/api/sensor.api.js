import axios from "axios";

const API_URL =
  "https://real-time-environmental-monitoring-ai.onrender.com/api/sensors";

export const fetchRecentData = async () => {
  const res = await axios.get(`${API_URL}/recent`);
  return res.data;
};

export const fetchAnomalies = async () => {
  const res = await axios.get(`${API_URL}/anomalies`);
  return res.data;
};

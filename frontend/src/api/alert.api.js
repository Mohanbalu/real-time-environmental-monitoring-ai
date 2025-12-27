import axios from "axios";

const API_URL = "https://real-time-environmental-monitoring-ai.onrender.com/alerts";

export const fetchAlerts = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};


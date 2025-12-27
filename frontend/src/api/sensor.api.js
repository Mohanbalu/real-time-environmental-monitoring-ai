import axios from "axios";

const API_URL = "http://localhost:5000/api/sensors";

export const fetchRecentData = async () => {
  const res = await axios.get(`${API_URL}/recent`);
  return res.data;
};

export const fetchAnomalies = async () => {
  const res = await axios.get(`${API_URL}/anomalies`);
  return res.data;
};

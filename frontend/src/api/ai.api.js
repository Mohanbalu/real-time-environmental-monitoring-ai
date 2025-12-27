import axios from "axios";

export const fetchAIInsights = async () => {
  const res = await axios.get("http://localhost:5000/api/ai/insights");
  return res.data;
};

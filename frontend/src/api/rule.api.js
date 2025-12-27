import axios from "axios";

const API_URL = "http://localhost:5000/api/rules";

export const fetchRule = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const saveRule = async (rule) => {
  const res = await axios.post(API_URL, rule);
  return res.data;
};

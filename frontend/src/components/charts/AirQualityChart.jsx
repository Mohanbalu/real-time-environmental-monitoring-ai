import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const AirQualityChart = ({ data }) => {
  return (
    <LineChart width={700} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="timestamp" hide />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="airQuality" stroke="#2ecc71" />
    </LineChart>
  );
};

export default AirQualityChart;

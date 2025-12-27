import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const HumidityChart = ({ data }) => {
  return (
    <LineChart width={700} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="timestamp" hide />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="humidity" stroke="#1e90ff" />
    </LineChart>
  );
};

export default HumidityChart;

import {
  CartesianGrid,
  Line,
  LineChart,
  Scatter,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const TemperatureChart = ({ data }) => {
  const anomalyPoints = data.filter((d) => d.isAnomaly);

  return (
    <LineChart width={700} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="timestamp" hide />
      <YAxis />
      <Tooltip />

      {/* Temperature line */}
      <Line
        type="monotone"
        dataKey="temperature"
        stroke="#ff5733"
        dot={false}
      />

      {/* Anomaly markers */}
      <Scatter
        data={anomalyPoints}
        fill="red"
        shape="circle"
      />
    </LineChart>
  );
};

export default TemperatureChart;

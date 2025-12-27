import { useEffect, useState } from "react";
import { fetchRecentData } from "../api/sensor.api";
import TemperatureChart from "../components/charts/TemperatureChart";
import HumidityChart from "../components/charts/HumidityChart";
import AirQualityChart from "../components/charts/AirQualityChart";
import useSocket from "../hooks/useSocket";

const cardStyle = {
  padding: "10px 20px",
  background: "#f5f5f5",
  borderRadius: "6px",
  minWidth: "120px",
  textAlign: "center",
};

const Dashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchRecentData().then((res) => {
      setData(res.reverse());
    });
  }, []);

  useSocket("sensor-data", (newData) => {
    setData((prev) => [...prev.slice(-49), newData]);
  });

  const latest = data[data.length - 1];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Environmental Monitoring Dashboard</h2>

      {latest && (
        <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
          <div style={cardStyle}>
            <strong>Temperature</strong>
            <div>{latest.temperature} °C</div>
          </div>
          <div style={cardStyle}>
            <strong>Humidity</strong>
            <div>{latest.humidity} %</div>
          </div>
          <div style={cardStyle}>
            <strong>AQI</strong>
            <div>{latest.airQuality}</div>
          </div>
        </div>
      )}

      {data.length > 0 ? (
        <>
          <TemperatureChart data={data} />
          <HumidityChart data={data} />
          <AirQualityChart data={data} />
        </>
      ) : (
        <p>Loading sensor data...</p>
      )}

      {latest?.aiExplanation && (
        <div
          style={{
            marginTop: "20px",
            background: "#f8f8f8",
            padding: "15px",
            borderRadius: "6px",
          }}
        >
          <strong>AI Explanation</strong>
          <p>{latest.aiExplanation}</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

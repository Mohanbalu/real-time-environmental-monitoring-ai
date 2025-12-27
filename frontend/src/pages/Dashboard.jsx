import { useEffect, useState } from "react";
import { fetchRecentData } from "../api/sensor.api";
import TemperatureChart from "../components/charts/TemperatureChart";
import HumidityChart from "../components/charts/HumidityChart";
import AirQualityChart from "../components/charts/AirQualityChart";
import useSocket from "../hooks/useSocket";

const container = {
  padding: "24px",
  fontFamily: "Arial, sans-serif",
};

const header = {
  marginBottom: "24px",
};

const cardsRow = {
  display: "flex",
  gap: "20px",
  marginBottom: "30px",
};

const card = {
  flex: 1,
  padding: "16px",
  background: "#f4f6f8",
  borderRadius: "8px",
  textAlign: "center",
};

const section = {
  marginBottom: "40px",
};

const sectionTitle = {
  marginBottom: "12px",
};

const aiBox = {
  background: "#fff8e1",
  padding: "16px",
  borderRadius: "8px",
  border: "1px solid #ffe082",
};

const Dashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchRecentData().then((res) => setData(res.reverse()));
  }, []);

  useSocket("sensor-data", (newData) => {
    setData((prev) => [...prev.slice(-49), newData]);
  });

  const latest = data[data.length - 1];

  return (
    <div style={container}>
      <div style={header}>
        <h1>Environmental Monitoring Dashboard</h1>
        <p>Live IoT sensor data with AI-based anomaly detection</p>
      </div>

      {latest && (
        <div style={cardsRow}>
          <div style={card}>
            <h3>Temperature</h3>
            <h2>{latest.temperature} °C</h2>
          </div>
          <div style={card}>
            <h3>Humidity</h3>
            <h2>{latest.humidity} %</h2>
          </div>
          <div style={card}>
            <h3>Air Quality Index</h3>
            <h2>{latest.airQuality}</h2>
          </div>
        </div>
      )}

      {data.length > 0 ? (
        <>
          <div style={section}>
            <h3 style={sectionTitle}>Temperature Trend</h3>
            <TemperatureChart data={data} />
          </div>

          <div style={section}>
            <h3 style={sectionTitle}>Humidity Trend</h3>
            <HumidityChart data={data} />
          </div>

          <div style={section}>
            <h3 style={sectionTitle}>Air Quality Trend</h3>
            <AirQualityChart data={data} />
          </div>
        </>
      ) : (
        <p>Loading sensor data...</p>
      )}

      {latest?.aiExplanation && (
        <div style={section}>
          <h3>AI Insight</h3>
          <div style={aiBox}>{latest.aiExplanation}</div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

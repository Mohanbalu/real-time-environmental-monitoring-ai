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
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "20px",
  marginBottom: "32px",
};

const cardBase = {
  padding: "16px",
  borderRadius: "8px",
  textAlign: "center",
  border: "1px solid #ddd",
};

const section = {
  marginBottom: "40px",
};

const aiBox = {
  background: "#fff8e1",
  padding: "16px",
  borderRadius: "8px",
  border: "1px solid #ffe082",
};

const rules = {
  temperatureMax: 50,
  humidityMax: 70,
  airQualityMax: 150,
};

const getCardColor = (value, limit) => {
  return value > limit ? "#fee2e2" : "#ecfeff";
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
        <p>Real-time IoT sensor monitoring with AI-based anomaly detection</p>
      </div>

      {latest && (
        <div style={cardsRow}>
          <div
            style={{
              ...cardBase,
              background: getCardColor(
                latest.temperature,
                rules.temperatureMax
              ),
            }}
          >
            <h3>Temperature</h3>
            <h2>{latest.temperature} °C</h2>
          </div>

          <div
            style={{
              ...cardBase,
              background: getCardColor(
                latest.humidity,
                rules.humidityMax
              ),
            }}
          >
            <h3>Humidity</h3>
            <h2>{latest.humidity} %</h2>
          </div>

          <div
            style={{
              ...cardBase,
              background: getCardColor(
                latest.airQuality,
                rules.airQualityMax
              ),
            }}
          >
            <h3>Air Quality Index</h3>
            <h2>{latest.airQuality}</h2>
          </div>
        </div>
      )}

      {data.length > 0 ? (
        <>
          <div style={section}>
            <h3>Temperature Trend</h3>
            <TemperatureChart data={data} />
          </div>

          <div style={section}>
            <h3>Humidity Trend</h3>
            <HumidityChart data={data} />
          </div>

          <div style={section}>
            <h3>Air Quality Trend</h3>
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

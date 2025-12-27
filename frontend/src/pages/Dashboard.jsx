import { useEffect, useState } from "react";
import { fetchRecentData } from "../api/sensor.api";
import TemperatureChart from "../components/charts/TemperatureChart";
import socket from "../sockets/socket";

/* 🔧 Card style */
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
    // 1️⃣ Load existing data first
    fetchRecentData().then((res) => {
      setData(res.reverse());
    });

    // 2️⃣ Attach socket AFTER render
    socket.on("sensor-data", (newData) => {
      setData((prev) => [...prev.slice(-49), newData]);
    });

    return () => {
      socket.off("sensor-data");
    };
  }, []);

  // 🔧 Latest sensor reading
  const latest = data[data.length - 1];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Environmental Monitoring Dashboard</h2>

      {/* 🔹 Live metric cards */}
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

      {/* 🔹 Chart */}
      {data.length > 0 ? (
        <TemperatureChart data={data} />
      ) : (
        <p>Loading sensor data...</p>
      )}

      {/* 🔹 AI Explanation */}
      {latest?.aiExplanation && (
        <div
          style={{
            marginTop: "20px",
            background: "#f8f8f8",
            padding: "15px",
            borderRadius: "6px",
          }}
        >
          <strong>AI Explanation:</strong>
          <p>{latest.aiExplanation}</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

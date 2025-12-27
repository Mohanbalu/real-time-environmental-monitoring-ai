const express = require("express");
const cors = require("cors");

const sensorRoutes = require("./routes/sensor.routes");
const aiRoutes = require("./routes/ai.routes");

const app = express(); // ✅ app MUST be created first

app.use(cors());
app.use(express.json());

// ✅ Routes AFTER app initialization
app.use("/api/sensors", sensorRoutes);
app.use("/api/ai", aiRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "Backend running" });
});

module.exports = app;

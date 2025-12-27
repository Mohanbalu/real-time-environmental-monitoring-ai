const express = require("express");
const cors = require("cors");

const sensorRoutes = require("./routes/sensor.routes");
const aiRoutes = require("./routes/ai.routes");
const alertRoutes = require("./routes/alert.routes");
const ruleRoutes = require("./routes/rule.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/sensors", sensorRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/alerts", alertRoutes);
app.use("/api/rules", ruleRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "Backend running" });
});

module.exports = app;

const io = require("socket.io-client");
const config = require("./config");

const socket = io(config.SERVER_URL);

socket.on("connect", () => {
  console.log("Simulator connected to backend");

  setInterval(() => {
    const data = {
      sensorId: "S1",
      temperature: Math.random() > 0.95 ? 55 : 28,
      humidity: (50 + Math.random() * 20).toFixed(2),
      airQuality: Math.floor(80 + Math.random() * 60),
      timestamp: new Date(),
    };

    socket.emit("sensor-data", data);
  }, config.INTERVAL);
});

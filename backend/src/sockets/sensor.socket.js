const { saveSensorData } = require("../services/sensor.service");

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    socket.on("sensor-data", async (data) => {
      await saveSensorData(data);

      // 🔴 REQUIRED FOR FRONTEND
      io.emit("sensor-data", data);
    });
  });
};

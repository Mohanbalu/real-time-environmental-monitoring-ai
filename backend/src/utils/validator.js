const validateSensorData = (data) => {
  return (
    typeof data.temperature === "number" &&
    typeof data.humidity === "number" &&
    typeof data.airQuality === "number"
  );
};

module.exports = {
  validateSensorData,
};

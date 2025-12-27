const detectAnomaly = (data) => {
  const anomalies = [];

  if (data.temperature > 40 || data.temperature < 0) {
    anomalies.push("Temperature anomaly");
  }

  if (data.humidity > 90 || data.humidity < 20) {
    anomalies.push("Humidity anomaly");
  }

  if (data.airQuality > 150) {
    anomalies.push("Air quality anomaly");
  }

  return {
    isAnomaly: anomalies.length > 0,
    reasons: anomalies,
  };
};

module.exports = { detectAnomaly };

export const formatTimestamp = (ts) => {
  return new Date(ts).toLocaleString();
};

export const isAnomaly = (data, rule) => {
  if (!rule) return false;

  return (
    data.temperature > rule.temperatureMax ||
    data.humidity > rule.humidityMax ||
    data.airQuality > rule.airQualityMax
  );
};

import { useEffect, useState } from "react";
import { fetchRule } from "../../api/rule.api";

const RuleList = () => {
  const [rule, setRule] = useState(null);

  useEffect(() => {
    fetchRule().then(setRule);
  }, []);

  if (!rule) return null;

  return (
    <div>
      <div>Temperature Max: {rule.temperatureMax}</div>
      <div>Humidity Max: {rule.humidityMax}</div>
      <div>Air Quality Max: {rule.airQualityMax}</div>
    </div>
  );
};

export default RuleList;

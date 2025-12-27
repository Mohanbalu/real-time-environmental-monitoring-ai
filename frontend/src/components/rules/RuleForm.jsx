import { useEffect, useState } from "react";
import { fetchRule, saveRule } from "../../api/rule.api";

const RuleForm = () => {
  const [rule, setRule] = useState({
    temperatureMax: "",
    humidityMax: "",
    airQualityMax: "",
  });

  useEffect(() => {
    fetchRule().then((data) => {
      if (data) setRule(data);
    });
  }, []);

  const handleChange = (e) => {
    setRule({ ...rule, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await saveRule({
      temperatureMax: Number(rule.temperatureMax),
      humidityMax: Number(rule.humidityMax),
      airQualityMax: Number(rule.airQualityMax),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="temperatureMax"
        placeholder="Temperature Max"
        value={rule.temperatureMax}
        onChange={handleChange}
      />
      <input
        name="humidityMax"
        placeholder="Humidity Max"
        value={rule.humidityMax}
        onChange={handleChange}
      />
      <input
        name="airQualityMax"
        placeholder="Air Quality Max"
        value={rule.airQualityMax}
        onChange={handleChange}
      />
      <button type="submit">Save</button>
    </form>
  );
};

export default RuleForm;

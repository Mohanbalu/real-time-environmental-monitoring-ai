const Rule = require("../models/Rule");

const getRule = async (req, res) => {
  const rule = await Rule.findOne();
  res.json(rule);
};

const createOrUpdateRule = async (req, res) => {
  const { temperatureMax, humidityMax, airQualityMax } = req.body;

  let rule = await Rule.findOne();

  if (rule) {
    rule.temperatureMax = temperatureMax;
    rule.humidityMax = humidityMax;
    rule.airQualityMax = airQualityMax;
    await rule.save();
  } else {
    rule = await Rule.create({
      temperatureMax,
      humidityMax,
      airQualityMax,
    });
  }

  res.json(rule);
};

module.exports = {
  getRule,
  createOrUpdateRule,
};

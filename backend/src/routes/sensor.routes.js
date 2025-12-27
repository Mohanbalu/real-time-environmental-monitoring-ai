const express = require("express");
const router = express.Router();

const {
  getRecentData,
  getAnomalies,
} = require("../controllers/sensor.controller");

router.get("/recent", getRecentData);
router.get("/anomalies", getAnomalies);

module.exports = router;

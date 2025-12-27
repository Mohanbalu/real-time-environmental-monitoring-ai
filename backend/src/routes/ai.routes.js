const express = require("express");
const router = express.Router();
const { getAIInsights } = require("../controllers/ai.controller");

router.get("/insights", getAIInsights);

module.exports = router;

const express = require("express");
const {
  getRule,
  createOrUpdateRule,
} = require("../controllers/rule.controller");

const router = express.Router();

router.get("/", getRule);
router.post("/", createOrUpdateRule);

module.exports = router;

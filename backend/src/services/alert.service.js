const Alert = require("../models/Alert");
const { sendSMS } = require("../config/twilio");

// ✅ Declare globally (module-level)
let lastSmsAt = 0;

const triggerAlert = async ({ sensorId, reasons }) => {
  const now = Date.now();

  // ✅ Cooldown: 1 hour (adjust if needed)
  const COOLDOWN = 60 * 60 * 1000;

  if (now - lastSmsAt < COOLDOWN) {
    console.log("⏳ SMS cooldown active, skipping SMS");
    return;
  }

  lastSmsAt = now;

  const message = `🚨 ALERT!
Sensor: ${sensorId}
Issues: ${reasons.join(", ")}`;

  await Alert.create({
    sensorId,
    message,
    severity: "HIGH",
  });

  await sendSMS(message);

  console.log("📨 SMS sent");
};

module.exports = { triggerAlert };

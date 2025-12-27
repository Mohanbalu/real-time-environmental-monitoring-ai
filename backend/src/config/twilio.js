const twilio = require("twilio");

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const sendSMS = async (message) => {
  try {
    await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE,
      to: process.env.ALERT_PHONE,
    });
    console.log("📨 SMS sent");
  } catch (err) {
    console.error("Twilio error:", err.message);
  }
};

module.exports = { sendSMS };

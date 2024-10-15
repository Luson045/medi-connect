const twilio = require("twilio");

const sendSMS = (body, toNumber) => {
  const twilioClient = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );

  try {
    const sms = twilioClient.messages.create({
      body,
      from: process.env.TWILIO_NUMBER,
      to: toNumber,
    });

    console.info({
      message: "Confirmation message sent successfully!",
      sid: sms.sid,
    });
  } catch (error) {
    console.error({
      error: "Failed to send message",
      details: error.message,
    });
  }
};

module.exports = sendSMS;

const nodemailer = require("nodemailer");

const sendMail = (htmlContent, receiverEmail) => {
  const port = process.env.SMTP_PORT;
  const host = process.env.SMTP_HOST;
  const senderEmail = process.env.SMTP_EMAIL;
  const password = process.env.SMTP_PASSWORD;
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: port,
    secure: true,
    auth: {
      user: senderEmail,
      pass: password,
    },
  });

  let mailOptions = {
    from: `"Admin" <${senderEmail}>`,
    to: receiverEmail,
    subject: "Appointment confirmation",
    text: htmlContent,
    html: htmlContent,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log("Error while sending email:", error);
    }
    console.log("Email sent successfully:", info.response);
  });
};

module.exports = sendMail;

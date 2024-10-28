const nodemailer = require("nodemailer");
const Newsletter = require("../../models/newsletter");

// Set up the transporter for sending emails
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_EMAIL,   // Use environment variables for security
    pass: process.env.SMTP_PASSWORD,
  },
});

const subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if the email is already subscribed
    const existingSubscriber = await Newsletter.findOne({ email });
    if (existingSubscriber) {
      return res.status(400).json({ message: "Email is already subscribed" });
    }

    // Save the subscriber email to the database
    const newSubscriber = new Newsletter({ email });
    await newSubscriber.save();

    // Log the subscribed email
    console.log(`New subscriber: ${email}`);

    // Send confirmation email
    await transporter.sendMail({
      from: process.env.SMTP_HOST,
      to: email,
      subject: "Thank you for Subscribing to Our Newsletter",
      html: `
        <div style="font-family: Arial, sans-serif; text-align: center;">
          <h2>Thank You for Subscribing!</h2>
          <p>Dear Subscriber,</p>
          <p>We are thrilled to have you with us. Stay tuned for our latest updates and offers!</p>
          <a href="https://med-space.vercel.app/" style="display: inline-block; padding: 10px 20px; margin-top: 20px; color: white; background-color: #007BFF; text-decoration: none; border-radius: 5px;">
            Explore More
          </a>
          <p style="margin-top: 30px;">Best Regards,<br>Med-space</p>
        </div>
      `,
    });

    res.status(200).json({ message: "Subscription successful, confirmation email sent" });
  } catch (error) {
    console.error("Error in subscribing to newsletter:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};


// Controller for sending updates to all subscribers
const sendNewsletterUpdate = async (req, res) => {
  try {
    // Extract subject and message from the request body
    const { subject, message } = req.body;
    if (!subject || !message) {
      return res.status(400).json({ message: "Subject and message are required." });
    }

    // Fetch all subscriber emails
    const subscribers = await Newsletter.find({}, "email");
    const emailAddresses = subscribers.map(subscriber => subscriber.email);

    // Email sending promises for all subscribers
    const emailPromises = emailAddresses.map(email =>
      transporter.sendMail({
        from: process.env.SMTP_HOST,
        to: email,
        subject: subject,
        html: `
          <div style="font-family: Arial, sans-serif;">
            <h2>${subject}</h2>
            <p>${message}</p>
            <p style="margin-top: 30px;">Best Regards,<br>Med-space Team</p>
          </div>
        `,
      })
    );

    // Send all emails and await completion
    await Promise.all(emailPromises);

    res.status(200).json({ message: "Update sent to all subscribers." });
  } catch (error) {
    console.error("Error in sending newsletter update:", error.message);
    res.status(500).json({ message: "Server error while sending updates." });
  }
};


module.exports = { subscribeNewsletter, sendNewsletterUpdate};
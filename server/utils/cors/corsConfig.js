const cors = require("cors");

function corsConfig(app) {
  const corsOptions = {
    origin: [
      "https://learnstocks.netlify.app",
      "https://console.cron-job.org/",
      "https://prodez-ai.netlify.app",
      "https://medi-connect-in.netlify.app",
      "https://med-space.vercel.app",
      "http://localhost:3000",
      "http://localhost:3001",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "x-auth-token"],
    credentials: true,
  };

  app.use(cors(corsOptions));
}

module.exports = corsConfig;

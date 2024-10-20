const cors = require("cors");

function corsConfig(app) {
  const allowedOrigins = [
    "https://learnstocks.netlify.app",
    "https://console.cron-job.org",
    "https://prodez-ai.netlify.app",
    "https://medi-connect-in.netlify.app",
    "https://med-space.vercel.app",
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:8080", // Add localhost:8080 as it may be used in dev
  ];

  const corsOptions = {
    origin: (origin, callback) => {
      // Allow requests with no 'Origin' (e.g., Postman or internal requests)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "x-auth-token"],
    credentials: true, // Allow credentials (cookies, tokens, etc.)
  };

  app.use(cors(corsOptions));
}

module.exports = corsConfig;

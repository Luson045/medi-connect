// server/index.js

const express = require("express");
const bodyParser = require("body-parser");
// const authRoutes = require("./modules/dashboard/authRoute");  ⭕ ***Deprecated***
const authRouter = require("./routes/auth/auth");
const profileRouter = require("./routes/user/profile");
const hospitalRouter = require("./routes/hospital/hospital");
const appointmentRouter = require("./routes/appointments/appointment");
// const hospitalroute = require("./modules/hospital/index");   ⭕ ***Deprecated***
const client = require("prom-client");
const { connectDB, corsConfig } = require("./utils");
require("dotenv").config();

// Database Connection
const uri = process.env.MONGO_URI;
connectDB(uri); // Connects to MongoDB using the provided URI

// Metrics Collection (Prometheus)
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ register: client.register }); // Collects default metrics and registers them with Prometheus

// Setting Up Express Server
const app = express();
const port = process.env.PORT || 8081; // Use environment-specified port or fallback to 8080

// Enable CORS
corsConfig(app); // Apply CORS configurations from the utils file

// Body Parser Middleware
app.use(bodyParser.json()); // Parse incoming JSON request bodies

// Other Middleware
app.use(express.static("public")); // Serve static files from the "public" directory
app.use(express.json()); // Parse incoming JSON payloads

// Health Check Endpoint
app.get("/ping", async (_, res) => {
  res.status(200).json({ message: "pong" }); // Return a simple ping response
});

// Metrics Endpoint for Prometheus
app.get("/metrics", async (_, res) => {
  res.setHeader("Content-Type", client.register.contentType); // Set the appropriate content type for Prometheus metrics
  const metrics = await client.register.metrics(); // Fetch all registered metrics
  res.send(metrics); // Send the metrics back to the requester
});

// Authentication Routes
app.use("/auth", authRouter);
app.use("/auth", profileRouter);

// Hospital Routes
app.use("/hospitalapi", hospitalRouter);

// Appointment Routes
app.use("/hospitalapi", appointmentRouter);

// Start the Server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`); // Log the server's running status
});

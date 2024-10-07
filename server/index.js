// server/index.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./modules/dashboard/authRoute");
const hospitalroute = require("./modules/hospital/index");

const client = require("prom-client");

const collectDefaultMetrics = client.collectDefaultMetrics;

collectDefaultMetrics({ register: client.register });

const { z } = require("zod");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8080; // not using 3000 because our grafana runs on localhost:3000
const corsOptions = {
  origin: [
    "https://learnstocks.netlify.app",
    "https://console.cron-job.org/",
    "https://prodez-ai.netlify.app",
    "https://medi-connect-in.netlify.app",
    "https://med-space.vercel.app",
    "http://localhost:3000",
    "http://localhost:3001",
  ], // Replace with your frontend's URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "x-auth-token"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use(express.static("public"));
app.use(express.json());
// mNXMrz3yBrdzw2hq,yuria4489
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection failed:", error));

const userSchema = z.object({
  name: z.string().min(2, "Name should be at least 2 characters long"),
  email: z.string().email("Invalid email format"),
  age: z.number().min(18, "Age must be at least 18"),

  gender: z.enum(["male", "female", "other"], "Invalid gender"),
  contact: z.string().regex(/^\d{10}$/, "Contact must be a 10-digit number"),
  address: z.string().min(1, "Address is required"),
  department: z.string().min(1, "Department is required"),
  symptoms: z.array(z.string()).min(1, "At least one symptom is required"),
});
//ping
app.get("/ping", async (_, res) => {
  res.status(200).json({ message: "pong" });
});

app.get("/metrics", async (_, res) => {
  res.setHeader("Content-Type", client.register.contentType);
  const metrics = await client.register.metrics();
  res.send(metrics);
});

// Get all todos for a specific user
app.post("/register", async (req, res) => {
  try {
    const validatedData = userSchema.parse(req.body.data); // Validate incoming data
    console.log("User registered:", validatedData.name);

    // Registration logic goes here

    return res.status(200).json({ message: "Registration successful" });
  } catch (error) {
    // If validation fails, send back Zod error
    return res.status(400).json({ message: error.errors });
  }
});

app.use("/auth", authRoutes);
app.use("/hospitalapi", hospitalroute);
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const session = require("express-session");
const authRoutes = require("./modules/dashboard/authRoute");
const hospitalroute = require("./modules/hospital/index");
const client = require("prom-client");
const { connectDB, corsConfig } = require("./utils");
const User = require("./modules/dashboard/models/user");

require("dotenv").config();

// Database Connection
const uri = process.env.MONGO_URI;
connectDB(uri); // Connects to MongoDB using the provided URI

// Metrics Collection (Prometheus)
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ register: client.register }); // Collects default metrics and registers them with Prometheus

// Setting Up Express Server
const app = express();
const port = process.env.PORT || 8081; // Use environment-specified port or fallback to 8081

// Enable CORS
corsConfig(app); // Apply CORS configurations from the utils file

// Body Parser Middleware
app.use(bodyParser.json()); // Parse incoming JSON request bodies
app.use(express.static("public")); // Serve static files from the "public" directory
app.use(express.json()); // Parse incoming JSON payloads

// Session Management (for OAuth)
app.use(session({
  secret: 'your-session-secret',
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

// Passport Google OAuth Strategy Configuration
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: `${process.env.BASE_URL}/auth/google/callback`,
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // Handle user profile info and save to database or session
    const user = await User.findOrCreate({ googleId: profile.id });
    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

// Serialize user to store in session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

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

// Google Sign-In Routes
// Initiate Google OAuth
app.get("/auth/google",
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Google OAuth callback route
app.get("/auth/google/callback",
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // On successful authentication, redirect to the home page or dashboard
    res.redirect('/');
  }
);

// Logout route
app.get("/logout", (req, res) => {
  req.logout(err => {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

// Authentication Routes
app.use("/auth", authRoutes); // Authentication-related routes

// Hospital Routes
app.use("/hospitalapi", hospitalroute); // Hospital-related routes

// Start the Server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`); // Log the server's running status
});

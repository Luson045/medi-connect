const express = require("express");
const User = require("./models/user");

const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const jwt = require("jsonwebtoken");
const authRouter = require("./routes/auth/auth");
const profileRouter = require("./routes/user/profile");
const hospitalRouter = require("./routes/hospital/hospital");
const appointmentRouter = require("./routes/appointments/appointment");
const otherroutes = require("./routes/otherroutes/otherroutes");
// const hospitalroute = require("./modules/hospital/index");   ⭕ ***Deprecated***
const client = require("prom-client");
const { connectDB, corsConfig } = require("./utils");
const Hospital = require("./models/hospital");
const {
  createUserFromGoogleSignIn,
} = require("./controllers/auth/authController");
require("dotenv").config();

// JWT Secret Key
const jwtSecret = process.env.JWT_SECRET;

// Database Connection
const uri = process.env.MONGO_URI;
connectDB(uri);

// Metrics Collection (Prometheus)
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ register: client.register });

// Setting Up Express Server
const app = express();
const port = process.env.PORT || 8081;

// Enable CORS
corsConfig(app);

// Body Parser Middleware
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(express.json());

// Session Middleware (Required for Passport)
app.use(
  session({ secret: "your_secret_key", resave: false, saveUninitialized: true })
);

// Initialize Passport and Sessions
app.use(passport.initialize());
app.use(passport.session());

// Passport Configuration
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);

// Serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

// Google OAuth2.0 Routes
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  async (req, res) => {
    try {
      console.log("check");
      const { id, displayName, emails } = req.user;
      const email = emails[0].value;
      console.log("check 1");
      let userOrHospital =
        (await User.findOne({ email })) || (await Hospital.findOne({ email }));
      console.log("check 2");
      let token;
      if (!userOrHospital) {
        const { user, token: newToken } = await createUserFromGoogleSignIn({
          id,
          displayName,
          emails,
        });
        token = newToken;
        console.log(user, token);
      } else {
        const payload = { user: { id: userOrHospital.id } };
        token = jwt.sign(payload, jwtSecret, { expiresIn: "3d" });
        console.log(token);
      }

      // Use window.opener.postMessage to send token to parent window and close the OAuth window
      res.send(`
        <script>
          window.opener.postMessage({ token: '${token}' }, 'http://localhost:3000');
          window.close();
        </script>
      `);
    } catch (error) {
      console.error("Google sign-in error:", error);
      res.status(500).json({ message: "Error signing in with Google", error });
    }
  }
);

// JWT Authentication Middleware
const authenticateToken = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token)
    return res.status(401).json({ msg: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid", err });
  }
};

// Logout Route
app.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("https://med-space.vercel.app/"); // Redirect to home page after logout
  });
});

// Protected Route Example (Requires JWT Authentication)
app.get("/profile", authenticateToken, (req, res) => {
  res.json({ msg: `Hello, ${req.user.name}. Your email is ${req.user.email}` });
});

// Health Check Endpoint
app.get("/ping", async (_, res) => {
  res.status(200).json({ message: "pong" });
});

// Metrics Endpoint for Prometheus
app.get("/metrics", async (_, res) => {
  res.setHeader("Content-Type", client.register.contentType);
  const metrics = await client.register.metrics();
  res.send(metrics);
});

// Authentication Routes
app.use("/auth", authRouter);
app.use("/auth", profileRouter);

// Hospital Routes
app.use("/hospitalapi", hospitalRouter);

// Appointment Routes
app.use("/hospitalapi", appointmentRouter);

// other routes
app.use("/otherroutes", otherroutes)
// Start the Server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

const express = require("express");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const helmet = require("helmet");

const app = express();
app.use(express.json());

/* ==============================
   🔒 1. SECURITY HEADERS (Helmet)
============================== */
app.use(helmet());

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  })
);

app.use(
  helmet.hsts({
    maxAge: 31536000,
    includeSubDomains: true,
  })
);

/* ==============================
   🚫 2. RATE LIMITING
============================== */
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 requests
  message: {
    status: 429,
    message: "Too many requests, try again later.",
  },
});

app.use(limiter);

/* ==============================
   🌐 3. CORS CONFIGURATION
============================== */
app.use(
  cors({
    origin: "http://localhost:3000", // allow only your frontend
    methods: ["GET", "POST"],
  })
);

/* ==============================
   🔑 4. API KEY AUTHENTICATION
============================== */
const API_KEY = "mysecurekey123";

app.use((req, res, next) => {
  const key = req.headers["x-api-key"];

  if (!key || key !== API_KEY) {
    return res.status(403).json({
      status: 403,
      message: "Forbidden: Invalid API Key",
    });
  }

  next();
});

/* ==============================
   📦 TEST ROUTES
============================== */

// Public test (will still require API key because middleware is global)
app.get("/", (req, res) => {
  res.json({ message: "Secure API is running 🚀" });
});

// Protected route
app.get("/api/data", (req, res) => {
  res.json({
    data: "This is protected data 🔐",
  });
});

// Login simulation (for testing rate limit)
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "1234") {
    return res.json({ message: "Login successful" });
  }

  return res.status(401).json({ message: "Invalid credentials" });
});

/* ==============================
   🚀 SERVER START
============================== */
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
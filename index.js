const express = require("express");
const connectDB = require("./src/config/db");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./src/routes/auth"));
app.use("/api/users", require("./src/routes/user"));
app.use("/api/appointments", require("./src/routes/appointments"));
app.use("/api/posts", require("./src/routes/post"));
app.use("/api/timeline", require("./src/routes/timeline"));
app.use("/api/facilities", require("./src/routes/facility"));
app.use("/api/pregnancy", require("./src/routes/pregnancyTimeline"));

// Root routes
app.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});

app.get("/api", (req, res) => {
  res.json({ message: "API is working" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

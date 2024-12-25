const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Root routes
app.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});

app.get("/api", (req, res) => {
  res.json({ message: "API is working" });
});

// Routes
app.use("/api/users", require("./routes/user"));
app.use("/api/appointments", require("./routes/appointments"));
app.use("/api/posts", require("./routes/post"));
app.use("/api/timeline", require("./routes/timeline"));
app.use("/api/facilities", require("./routes/facility"));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

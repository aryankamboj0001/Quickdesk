const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin"); // ✅ this must exist

dotenv.config();

const app = express(); // ✅ app must be before .use

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes); // ✅ this must match

// Connect DB and Start Server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(5000, () => {
      console.log("🚀 Server running on http://localhost:5000");
    });
  })
  .catch(err => console.error("❌ MongoDB connection error:", err));

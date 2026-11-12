require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes"); 
const app = express();

// middlewares
app.use(cors());
app.use(express.json());

app.use(express.static("public"));

// simple health check route
app.get("/", (req, res) => {
  res.send("Auth service is running");
});

// routes
app.use("/api/auth", authRoutes);
app.use("/api", userRoutes);
app.use("/api/tasks", taskRoutes); 
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT || 5000;

connectDB().then(async () => {

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
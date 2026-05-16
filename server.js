require('dotenv').config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const connectDB = require("./config/db");
const studentRoutes = require("./routes/studentRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/students', studentRoutes);

// Home route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Internal Server Error',
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
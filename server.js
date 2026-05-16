require('dotenv').config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const connectDB = require("./config/db");
const studentRoutes = require("./routes/studentRoutes");
const Student = require("./models/user");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

// Connect to MongoDB
connectDB();

// API Route - Get all students
app.get("/api/students", async (req, res) => {
  try {
    const { search, department } = req.query;
    
    let filter = {};
    
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phoneNumber: { $regex: search, $options: 'i' } },
      ];
    }
    
    if (department) {
      filter.department = { $regex: department, $options: 'i' };
    }
    
    const students = await Student.find(filter).sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: students.length,
      data: students,
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
});

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
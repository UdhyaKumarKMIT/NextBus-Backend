// index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/auth_demo")
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error(err));

// Import routes
const authRoutes = require('./auth_api'); // Make sure path is correct
const bookRoutes = require('./book_api'); // Make sure path is correct
// Use routes
app.use('/auth', authRoutes);
app.use('/book', bookRoutes);
// Test route
app.get('/', (req, res) => {
  res.send("Server is running");
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

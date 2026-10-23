require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const studentRoutes = require('./routes/studentRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Body parser for JSON data

// Routes
app.use('/api/students', studentRoutes);

// Basic route
app.get('/', (req, res) => {
    res.send('Welcome to the Student Management System API!');
});

// >>> IMPORTANT: Export the UNSTARTED app instance for testing
module.exports = app;

// >>> START SERVER ONLY IF RUN DIRECTLY (not imported by Jest)
if (require.main === module) {
    connectDB(); // Connect to DB only for live server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}


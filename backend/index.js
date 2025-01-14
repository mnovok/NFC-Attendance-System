const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db'); // Database connection
const attendanceRoutes = require('./routes/attendance'); // Attendance routes

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
connectDB();

// Routes
app.use('/api/attendance', attendanceRoutes);

// Default Route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Start Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

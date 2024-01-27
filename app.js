const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/connectDB');
const dotenv = require('dotenv');
const peopleRoutes = require('./routes/peopleRoutes');
const authRoutes = require('./routes/auth');
const protectedRoute = require('./routes/protectedRoute');

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// MongoDB connection setup
connectDB();

// Middleware to parse JSON
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/protected', protectedRoute);

// Mount people routes
app.use('/people', peopleRoutes);

// Start the server
app.listen(port, (err) => {
    if (err) {
        console.error('Error starting the server:', err);
    } else {
        console.log(`Server is running on http://localhost:${port}`);
    }
});

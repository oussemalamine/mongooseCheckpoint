const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/connectDB');
const dotenv = require('dotenv');
const peopleRoutes = require('./routes/peopleRoutes');

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// MongoDB connection setup
connectDB();

// Middleware to parse JSON
app.use(express.json());

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

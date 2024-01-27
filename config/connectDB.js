const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            // Remove the useNewUrlParser and useUnifiedTopology options
            // They are no longer needed in recent versions of the MongoDB driver
        });
        console.log('Connected to the database');
    } catch (error) {
        console.error('Error connecting to the database:', error);
        process.exit(1); // Exit the process if unable to connect
    }
};

module.exports = connectDB;

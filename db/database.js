const mongoose = require('mongoose');
require('dotenv').config()

// Connecting to the database 

const db_URL = process.env.MONGO_URI

const connectDB = () => {
    db_URL
    const options = {
        useNewURLParser: true, useUnifiedTopology: true,
    }
    return mongoose.connect(db_URL, options)
}

module.exports = connectDB
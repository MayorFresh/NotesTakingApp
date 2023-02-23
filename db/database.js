const mongoose = require('mongoose');
require('dotenv').config()

// Connecting to the database 

const db_URL = process.env.MONGO_URI


mongoose.connect(db_URL, {
    useNewURLParser: true, useUnifiedTopology: true,
}, (error, connect) => {
    if(error){
        console.log(`Could not connect to the database`)
        console.log(error)
    }
    else {
        console.log(`Successfully Connected to the database`)
    }
    
})

connectDB = mongoose.connection
const mongoose = require('mongoose');
// const chalk = require('chalk')

// Connecting to the database 
const db_URL = 'mongodb://127.0.0.1:27017/NotesTakingApp'

mongoose.connect(db_URL, {
    useNewURLParser: true, useUnifiedTopology: true, useUnifiedTopology: true
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
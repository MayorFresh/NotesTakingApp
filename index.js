const express = require('express');
const app = express();
require('dotenv').config();
const user = require('./routes/user')

//to run the mongoose directly from the database
require('./db/database')

//built-in middleware to parse requests
app.use(express.json())

// default api 
app.use('/api/v1/notesapp', user);


// Server port
const port = process.env.PORT;
app.listen (port, () => {
    console.log("Server is listening on Port " + port);
});
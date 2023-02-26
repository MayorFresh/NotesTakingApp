const express = require('express');
const app = express();
require('dotenv').config();
const user = require('./routes/user');
const connectDB = require('./db/database') //to run the mongoose directly from the database
const rateLimiter = require('express-rate-limit');
const helmet = require('helmet')
const cors = require('cors');
// const session = require('express-session');

// Rate limiter for the api requests
const limiter = rateLimiter({
    windowMs: 60 * 1000, // 1 minute
    max: 10, // limit each IP to 10 requests per windowMs
    message: "you have exceeded 10 requests in 1 minute",
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

// apply helmet middleware for security
app.use(helmet());
app.use(limiter)
app.use(cors());




const swaggerUI = require('swagger-ui-express')
const swaggerjsDoc = require('swagger-jsdoc')
const swaggerOption =  require('./swaggerUI')
const jsDoc = swaggerjsDoc(swaggerOption)

app.use('/swagger', swaggerUI.serve, swaggerUI.setup(jsDoc))

//built-in middleware to parse requests
app.use(express.json())

// default api 
app.use('/api/v1/notesapp', user);

// To serve the landing page with swaggerUI
app.get('/', (req, res) => {
    res.redirect('/swagger')
})

// Server Connection
const port = process.env.PORT;

const start = async () => {
    try {
        await connectDB()
        console.log(`Successfully Connected to the database`)
        app.listen (port, () => {
            console.log(`Server is listening on Port ${port}`);
        });
    }
    catch (e) {
        console.log('Could not connect to the database\n', e)
    }
}

start();
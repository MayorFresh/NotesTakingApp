const express = require('express')
const router = express.Router();

// importing the controllers 
const {signup} = require('../controller/user')

//asigning endpoints
router.route('/').post(signup)


module.exports = router
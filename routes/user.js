const express = require('express')
const router = express.Router();

// importing the controllers 
const {signup, getuser} = require('../controller/user')

//asigning endpoints
router.route('/').post(signup).get(getuser)


module.exports = router
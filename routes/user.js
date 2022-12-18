const express = require('express')
const router = express.Router();

// importing the controllers 
const {signup, getuser, signin} = require('../controller/user')

//asigning endpoints
router.route('/').post(signup).get(getuser)
router.route('/signin').post(signin)


module.exports = router
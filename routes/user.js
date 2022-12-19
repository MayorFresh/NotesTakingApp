const express = require('express')
const router = express.Router();

// importing the controllers 
const {signup, getuser, signin, verifyUser} = require('../controller/user')

//asigning endpoints
router.route('/').post(signup).get(getuser)
router.route('/signin').post(signin)
//for email confirmation
router.route('/confirm/:confirmationCode').get(verifyUser)


module.exports = router
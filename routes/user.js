const express = require('express')
const router = express.Router();

// importing the controllers 
const {signup, getuser, signin, verifyUser, forgotpass, resetpass} = require('../controller/user')

//asigning endpoints
router.route('/').post(signup).get(getuser)
router.route('/signin').post(signin)
//for email confirmation
router.route('/confirm/:confirmationCode').get(verifyUser)
//for forgot passwprd
router.route('/forgotpass').post(forgotpass)
//for reseting the password
router.route('/resetpass').post(resetpass)


module.exports = router
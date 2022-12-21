const express = require('express')
const router = express.Router();

// importing the controllers 
const {signup, getuser, signin, verifyUser, forgotpass, resetpass, 
    newnote, editnote
} = require('../controller/user')

//asigning endpoints
router.route('/').post(signup).get(getuser)
router.route('/signin').post(signin)
//for email confirmation
router.route('/confirm/:confirmationCode').get(verifyUser)
//for forgot passwprd
router.route('/forgotpass').post(forgotpass)
//for reseting the password
router.route('/resetpass').post(resetpass)
//for creating new note
router.route('/newnote').post(newnote)
//for editing a note
router.route('/editnote/:id').patch(editnote)


module.exports = router
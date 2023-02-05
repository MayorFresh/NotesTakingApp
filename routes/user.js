const express = require('express')
const router = express.Router();
const auth = require('../middleware/auth')
// importing the controllers 
const {signUp, getUser, signIn, verifyUser, forgotPass, resetPass, 
    newNote, editNote, getAllNotes, getSingleNote
} = require('../controller/user')

//asigning endpoints
router.route('/').post(signUp).get(getUser)
router.route('/signin').post(signIn)
//for email confirmation
router.route('/confirm/:confirmationCode').get(verifyUser)
//for forgot passwprd
router.route('/forgotpass').post(forgotPass)
//for reseting the password
router.route('/resetpass').post(resetPass)
//for creating new note
router.route('/newnote').post(auth, newNote)
//for editing a note
router.route('/editnote/:id').patch(editNote)
router.route('/getallnotes').get(getAllNotes)

module.exports = router
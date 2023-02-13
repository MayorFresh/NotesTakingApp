const express = require('express')
const router = express.Router();
const auth = require('../middleware/auth')


// importing the controllers 
const {signUp, getUser, signIn, verifyUser, forgotPass, resetPass, 
    newNote, editNote, getAllNotes, deleteNote
} = require('../controller/user')


//To get all the users that has created an account

/**
* @swagger
* /api/v1/notesapp/signup:
*   post:
*     tags:
*       - user
*     summary: Create a new user
*     description: this endpoint is to create a new user
*     parameters:
*       - in: body
*         name: User
*         description: firstname
*         schema: 
*           type: object
*           required: 
*             - firstname
*             - lastname
*             - email
*             - password
*           properties:
*             firstname: 
*               type: string
*               example: John
*             lastname: 
*               type: string
*               example: Doe
*             email: 
*               type: string
*               example: johndoe@email.com
*             password: 
*               type: string
*               example: 12345678
*     responses:
*       201:
*         description: created successfully
*       403:
*         description: unauthorised
*       500:
*         description: any other error
*/


router.route('/signup').post(signUp)

//To get all the users that has created an account

/**
* @swagger
* /api/v1/notesapp/getAllUsers:
*   get:
*     tags:
*       - user
*     summary: get all users
*     description: this endpoint uses get request to retrieve all users
*     responses:
*       200:
*         description: success
*/

router.route('/getAllUsers').get(getUser)
router.route('/signin').post(signIn)
//for email confirmation
router.route('/confirm/:confirmationCode').get(verifyUser)
//for forgot password
router.route('/forgotpass').post(forgotPass)
//for reseting the password
router.route('/resetpass/:id').post(resetPass)
//for creating new note
router.route('/newnote').post(auth, newNote)
//for editing a note
router.route('/editnote/:id').patch(auth, editNote)
//to get all notes created by a user
router.route('/getallnotes').get(auth, getAllNotes)
//to delete a single note created by a user
router.route('/deletenote/:id').delete(auth, deleteNote)


module.exports = router
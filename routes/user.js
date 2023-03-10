const express = require('express')
const router = express.Router();
const auth = require('../middleware/auth')


// importing the controllers 
const {signUp, getUser, signIn, verifyUser, forgotPass, resetPass, 
    newNote, editNote, getAllNotes, deleteNote
} = require('../controller/user')


//To create a new account

/**
* @swagger
* /api/v1/user/signup:
*   post:
*     tags:
*       - user
*     summary: Create a new user
*     description: this endpoint is to create a new user
*     parameters:
*       - in: body
*         name: User
*         description: User details
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
*               example: johndoe@gmail.com
*             password: 
*               type: string
*               example: 12345678
*     responses:
*       201:
*         description: User created
*       400:
*         description: All input is required
*       409:
*         description: User already exists
*       500:
*         description: Server Error
*/

router.route('/user/signup').post(signUp)

//To get all the users that has created an account

/**
* @swagger
* /api/v1/user/getallusers:
*   get:
*     tags:
*       - user
*     summary: get all users
*     description: this endpoint uses get request to retrieve all users
*     responses:
*       200:
*         description: Ok. successful
*       404:
*         description: Not found. No user(s) found.
*       500:
*         description: Server Error
*/

router.route('/user/getallusers').get(getUser)

//User signin route 

/**
* @swagger
* /api/v1/user/signin:
*   post:
*     tags:
*       - user
*     summary: User signin
*     description: A user should sign in with the right details
*     parameters:
*       - in: body
*         name: User
*         description: User sigin details
*         schema: 
*           type: object
*           required: 
*             - email
*             - password
*           properties:
*             email: 
*               type: string
*               example: johndoe@gmail.com
*             password: 
*               type: string
*               example: 12345678
*     responses:
*       201:
*         description: login successful
*       400:
*         description: All input is required
*       401:
*         description: Unauthorized
*       403:
*         description: Forbidden. Pending Account. Please Verify Your Email!
*       404:
*         description: Not found. Invalid email
*       500:
*         description: Server Error
*/

router.route('/user/signin').post(signIn)

//for email confirmation

/**
* @swagger
* /api/v1/confirm/{confirmationCode}:
*   get:
*     tags:
*       - user
*     summary: Verify a new user
*     description: to verify a new user with the confirmation code sent to the user's mail
*     parameters:
*       - in: path
*         name: confirmationCode
*         description: User's confirmation code
*         type: string
*         required: true
*     responses:
*       200:
*         description: Account Activated
*       404:
*         description: Not found. Invalid email
*       500:
*         description: Server Error
*/

router.route('/confirm/:confirmationCode').get(verifyUser)

//for forgot password

/**
* @swagger
* /api/v1/user/forgotpass:
*   post:
*     tags:
*       - user
*     summary: Forget Password 
*     description: It sends a reset password link to the user's email inputed
*     parameters:
*       - in: body
*         name: email
*         description: User's registered email
*         schema: 
*           type: object
*           required: 
*             - email
*           properties:
*             email: 
*               type: string
*               example: johndoe@gmail.com
*     responses:
*       200:
*         description: Success. Reset Password Link sent
*       400:
*         description: All input is required
*       404:
*         description: Not found. Invalid email
*       500:
*         description: Server Error
*/

router.route('/user/forgotpass').post(forgotPass)

//for reseting the password

/**
* @swagger
* /api/v1/resetpass/{id}:
*   post:
*     tags:
*       - user
*     summary: Reset password
*     description: to change the user's password to a new one that is being provided.
*     parameters:
*       - in: path
*         name: id
*         description: User's reset password id
*         type: string
*         required: true
*       - in: body
*         name: Password Reset
*         description: A user's new password details
*         schema: 
*           type: object
*           required: 
*             - password
*             - confirmpassword
*           properties:
*             password: 
*               type: string
*               example: password
*             confirmpassword: 
*               type: string
*               example: confirmpassword
*     responses:
*       200:
*         description: Success. Password Changed
*       400:
*         description: All input is required
*       404:
*         description: password does not match
*       500:
*         description: Server Error
*/

router.route('/resetpass/:id').post(resetPass)

//for creating new note

/**
* @swagger
* /api/v1/notes/newnote:
*   post:
*     tags:
*       - notes
*     summary: Create a new note
*     description: this endpoint is to create a new note
*     parameters:
*       - in: body
*         name: Notes
*         description: New note details
*         schema: 
*           type: object
*           properties:
*             title: 
*               type: string
*               example: My Todo
*             description: 
*               type: string
*               example: Things i want to do
*     security: 
*       - bearerAuth: []
*     responses:
*       201:
*         description: User created
*       400:
*         description: All input is required
*       409:
*         description: User already exists
*       500:
*         description: Server Error
*/

router.route('/notes/newnote').post(auth, newNote)


//for editing a note

/**
* @swagger
* /api/v1/notes/editnote/{id}:
*   patch:
*     tags:
*       - notes
*     summary: Edit a note
*     description: this endpoint is to edit a note
*     parameters:
*       - in: path
*         name: id
*         description: id of the note to be edited
*         type: string
*         required: true
*       - in: body
*         name: Notes
*         description: Edit note details
*         schema: 
*           type: object
*           properties:
*             title: 
*               type: string
*               example: My Todo
*             description: 
*               type: string
*               example: Things i want to do
*     security: 
*       - bearerAuth: []
*     responses:
*       200:
*         description: Note Edited Successfully
*       400:
*         description: All input is required
*       500:
*         description: Server Error
*/

router.route('/notes/editnote/:id').patch(auth, editNote)


//to get all notes created by a user

/**
* @swagger
* /api/v1/notes/getallnotes:
*   get:
*     tags:
*       - notes
*     summary: get all notes
*     description: this endpoint uses get request to retrieve all notes created by a user
*     security: 
*       - bearerAuth: []
*     responses:
*       200:
*         description: Ok. successful
*       404:
*         description: Not found. No user(s) found.
*       500:
*         description: Server Error
*/

router.route('/notes/getallnotes').get(auth, getAllNotes)

//to delete a single note created by a user

/**
* @swagger
* /api/v1/notes/deletenote/{id}:
*   delete:
*     tags:
*       - notes
*     summary: Delete a note
*     description: this endpoint is to delete a note
*     parameters:
*       - in: path
*         name: id
*         description: id of the note to be deleted
*         type: string
*         required: true
*     security: 
*       - bearerAuth: []
*     responses:
*       200:
*         description: Note Edited Successfully
*       400:
*         description: All input is required
*       500:
*         description: Server Error
*/

router.route('/notes/deletenote/:id').delete(auth, deleteNote)


module.exports = router
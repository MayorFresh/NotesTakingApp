const User = require('../model/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config();
const nodemailer = require('../config/nodemailer.config')

//Register Endpoint
const signup = async(req, res) => {
    try {
        // accessing all the schema objects
        const {firstname, lastname, email, password} = req.body

        // validating the user's input
        if (!(firstname && lastname && email && password)) {
            res.status(400).send("All Input Is Required")
        }

        //to check if the user is already registered
        const registeredUser = await User.findOne({email})

        if (registeredUser) {
            res.status(409).send("User already exists. Please Login")
        }

        //to encrypt the user's password
        const encryptedpassword = await bcrypt.hash(password, 10)

        //to generate confirmation code that will be sent to the user's email
        const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let email_token = '';
        for (let i = 0; i < 25; i++) {
            email_token += characters[Math.floor(Math.random() * characters.length )];
        }

        // to store the user details into a variable
        const user = new User({
            firstname, lastname, email,
            password: encryptedpassword,
            confirmationCode: email_token
        })

        //to save the new user data to the database
        user.save()

        //to send the confrimation mail
        nodemailer.sendConfirmationEmail(
            user.firstname,
            user.email,
            user.confirmationCode
        );

        //to generate token when the user signs up
        const token = jwt.sign({user_id: user._id, email},
            process.env.TOKEN_KEY,
            {expiresIn: "7200"} //expires in 2 hours
        )

        //to add the token the user data at signup
        user.token= token;

        //to display the user data after registration
        // res.status(201).json(user)
        res.status(201).send({Success: "User Registered Successfully! Please check your email", user})
        console.log(user.email + " Registered Successfully")
    
    }
    catch(e) {
        res.status(500).send("User not created")
        console.log(e)
    }
}


//Verify user endpoint
const verifyUser = async (req, res, next) => {
    //accessing the user's confirmation code
    const confirmationCode = req.params.confirmationCode
    try {
       const user = await User.findOne({confirmationCode})
       if (!user) {
        res.status(404).send({ message: "User Not found."});
      }else {
        user.status = "Active"
        user.save()
        res.status(200).send("Account Activated")
        console.log(user.email + " is Active")
      }
      
    }
    catch(e) {
        console.log("error", e)
    }
    
}

//signin endpoint
const signin = async (req, res) => {
    try {
        //to get the user's login info
        const {email, password} = req.body

        //to validate the user's input
        if (!(email && password)) {
            res.status(400).send("All input is required")
        }

        //to check the user's details in the database
        const user = await User.findOne({email})
        if (!user) {
            res.status(401).send("invalid email")
        } 

        //decrypting the user's password
        const userpassword = await bcrypt.compare(password, user.password)
        if (user && userpassword) {

            //create login token
            const token = jwt.sign({user_id: user._id, email}, 
                process.env.TOKEN_KEY,
                {expiresIn: "7200"} //expires in 2 hours
            )

            //to save the token 
            user.token = token

            //to check if the user's accout has been activated
            if (user.status != "Active") {
                return res.status(401).send({
                  message: "Pending Account. Please Verify Your Email!"}) 
            } else {
                //to display the info of the logged in user
                res.status(200).json(user)
                console.log(user.email + " login successful")
            }

        } else {
            res.status(400).send("Incorrect password")
        }

    }
    catch(e) {
        console.log(e)
    }
}

//get all users
const getuser = async (req, res) => {
    try {
        const allusers = await User.find({})
        if(!allusers){
            res.status(404).send({empty: "no user(s) found"})
        }else if(allusers == 0){
            res.status(202).send({Empty: "No user found, database is empty"})
        }
        else{
            res.status(200).send({allusers})
            console.log("Successfully Fetched all users")
        }
    } catch(e) {
        res.status(500).send("connot fetch all users due to bad request")
        console.log(e)
    }
}

//forgot password endpoint
const forgotpass = async (req, res) => {
    try {
        //to get the user's input
        const {email} = req.body

        //to validate the user's input
        if (!(email)) {
            res.status(400).send("All input is required")
        }

        //to verify if it's a registered email
        const user = await User.findOne({email})
        if (!user) {
            res.status(401).send("invalid email")
        } else {
            res.status(200).send("A reset link has been sent to your email")
        }


    }
    catch (e) {
        console.log(e)
    }


}



module.exports = {signup, getuser, signin, verifyUser, forgotpass}
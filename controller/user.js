const User = require('../model/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config();

//Register Endpoint
const signup = async(req, res) => {
    try {
        // accessing all the schema objects
        const {firstname, lastname, email, password} = User(req.body)

        // validating the user's input
        if (!(firstname && lastname && email && password)) {
            res.status(400).send("All Input Is Required")
            console.log("All input is required")
        }

        //to check if the user is already registered
        const registeredUser = await User.findOne({email})

        if (registeredUser) {
            return res.status(409).send("User already exists. Please Login")
        }

        //to encrypt the user's password
        const encryptedpassword = await bcrypt.hash(password, 8)

        //to save the new user data to the database
        const user = await User.create({
            firstname, lastname, email,
            password: encryptedpassword
        })

        //to generate token when the user signs up
        const token = jwt.sign({user_id: user._id, email},
            process.env.TOKEN_KEY,
            {expiresIn: "7200"} //expires in 2 hours
        )

        //to add the token the user data at signup
        user.token = token;

        //to display the user data after registration
        res.status(201).json(user)
        console.log(user.email + " Registered Successfully")
    
    }
    catch(e) {
        res.status(500).send({registrationFailed: "User not created"})
        console.log(e)
    }
}




module.exports = {signup}
const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        // trim: true,
        // lowercase: true
    },
    lastname: {
        type: String,
        // trim: true,
        // lowercase: true
    },
    email: {
        type: String,
        // trim: true,
        // unique: true,
        // lowercase: true,
        // validate(email) {
        //     if(!validator.isEmail(email)){
        //         throw new Error ("Enter a Valid Email Address")
        //     }
        // }
    },
    password: {
        type: String,
        // length: {min: 8},
        // validate(value){
        //     if(value.length === 0){
        //         throw new Error("Enter a password to proceed")
        //     }
        // }
    },
    token: {
        type: String
    }
}, {timestamps: true})

// creating a collection called users in the database where it stores new users
const User = mongoose.model("users", userSchema)


module.exports = User
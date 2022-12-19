const nodemailer = require("nodemailer");
const SMTPPool = require("nodemailer/lib/smtp-pool");
require('dotenv').config()
const User = require('../model/user')

const user = process.env.USER
const pass = process.env.PASS

const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: user,
        pass: pass,
    },
});



const sendConfirmationEmail = async (req, res) => {
    try {
        // const {firstname, email, confirmationCode} = User(req.body)
        // const email = User.email
        // const firstname = User.firstname
        // const confirmationCode = User.confirmationCode
        transport.sendMail({
            from: user,
            to: "dav33d88joh66nn99@gmail.com",
            subject: "Please confirm your account",
            html: `<h1>Email Confirmation</h1>
              <h2>Hello ${User.firstname}</h2>
              <p>Welcome to NotesTakingApp. Please confirm your email by clicking on the following link</p>
              <a href=http://localhost:4000/confirm/${User.confirmationCode}> Click here</a>
              </div>`
            })
    }
    catch (e) {
        console.log(e)
    }
}

// transport.sendMail(sendConfirmationEmail, (e, info) => {
//     if(e) {
//         console.log(e)
//     } else {
//         console.log("Email sent " + info.response)
//     }
// })




  module.exports = {sendConfirmationEmail}
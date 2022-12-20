const nodemailer = require("nodemailer");
const SMTPPool = require("nodemailer/lib/smtp-pool");
require('dotenv').config()

const user = process.env.USER
const pass = process.env.PASS

const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: user,
        pass: pass,
    },
});

//to send confirmation mail when a user sign up
const sendConfirmationEmail = async (name, email, confirmationCode) => {
    try {
        transport.sendMail({
            from: user,
            to: email,
            subject: "Please confirm your account",
            html: `<h1>Email Confirmation</h1>
              <h2>Hello ${name}</h2>
              <p>Welcome to NotesTakingApp. Please confirm your email by clicking on the following link</p>
              <a href=http://localhost:4000/confirm/${confirmationCode}> Click here</a>
              </div>`
        })
        console.log("email sent successfully")
    }
    catch (e) {
        console.log(e)
    }
}

//to send a reset link when a user forgets password
const sendResetLink = async (name, email, confirmationCode) => {
    try {
        transport.sendMail({
            from: user,
            to: email,
            subject: "Reset Password",
            html: `<h1>Reset your Password</h1>
              <h2>Hello ${name}</h2>
              <p>Reset your password by clicking on the link below</p>
              <a href=http://localhost:4000/resetpass/> Click here</a>
              </div>`
        })
        console.log("email sent successfully")
    }
    catch (e) {
        console.log(e)
    }
}



  module.exports = {sendConfirmationEmail, sendResetLink}

  
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

const sendConfirmationEmail = async (firstname, email, confirmationCode) => {
    try {
        // const signup = test
        // const {firstname, email, confirmationCode} = signup.req.body

        // const email = req.body.users.email
        // const username = details.firstname
        const firstname = require('../model/user')
        // const confirmationCode = details.confirmationCode

        console.log(firstname.users.firstname)
        console.log(email)
        console.log(confirmationCode)
        transport.sendMail({
            from: user,
            to: email,
            subject: "Please confirm your account",
            html: `<h1>Email Confirmation</h1>
              <h2>Hello ${firstname}</h2>
              <p>Welcome to NotesTakingApp. Please confirm your email by clicking on the following link</p>
              <a href=http://localhost:4000/confirm/${confirmationCode}> Click here</a>
              </div>`
        })
        console.log("email sent")
    }
    catch (e) {
        console.log(e)
    }
}



  module.exports = {sendConfirmationEmail}

  
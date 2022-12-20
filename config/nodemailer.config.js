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



  module.exports = {sendConfirmationEmail}

  
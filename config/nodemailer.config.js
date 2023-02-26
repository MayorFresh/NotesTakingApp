const nodemailer = require("nodemailer");
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
            subject: "Email Confirmation",
            html: `
              <h2>Hi ${name}</h2>
              <p>Welcome to NotesTakingApp. Please confirm your email by clicking on the following link</p>
              <a href=http://localhost:4000/confirm/${confirmationCode}> Click here</a>
              <p>or copy the code below</p>
              <h3>${confirmationCode}</h3>
              </div>`
        })
        console.log("email sent successfully")
    }
    catch (e) {
        console.log(e)
    }
}

//to send a reset link when a user forgets password
const sendResetLink = async (name, email, id) => {
    try {
        transport.sendMail({
            from: user,
            to: email,
            subject: "Password Reset",
            html: `
              <h2>Hi ${name}</h2>
              <p>Reset your password by clicking on the link below. If this waas not requested by you, kindly ignore.</p>
              <a href=http://localhost:4000/resetpass/${id}> Click here</a>
              <h4>${id}</h4>
              </div>`
        })
        console.log("email sent successfully")
    }
    catch (e) {
        console.log(e)
    }
}



module.exports = {sendConfirmationEmail, sendResetLink}

  
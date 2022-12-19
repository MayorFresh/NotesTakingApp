const nodemailer = require("nodemailer");
require('dotenv').config()

const user = process.env.USER
const pass = process.env.PASS

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: user,
    pass: pass,
  },
});


const sendConfirmationEmail = (firstname, email, confirmationCode) => {
    try{
        // console.log("Check");
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
    }
    catch(e) {
        console.log(e);
    } 
  };


  module.exports = {sendConfirmationEmail}
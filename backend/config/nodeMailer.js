const nodemailer = require('nodemailer')
require("dotenv").config();


module.exports = {
    passMailer: nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.nodemailerEmail,
            pass: process.env.nodemailerPass
        }
    })
}
const nodemailer = require('nodemailer');
require('dotenv').config()

const credentials = {
    service: 'gmail',
    // port: 465,
    // secure: true,
    auth: {
        // type: 'OAuth2',
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
        // clientId: "123970737518-nbd3h60ej40n9mp3713nsp7pune3dsn8.apps.googleusercontent.com",
        // clientSecret: "3ne9PIIyVs-NwYR1N1pEGI02",
        // refreshToken: "1//042latMzFHwG5CgYIARAAGAQSNwF-L9IrXKSqLl8fH_wsCtcmFn8BnC0d3vOtKxHmM8oAaSnBtiEgiIXjA2Shupxfz53Ahyn9GbE" 
    },
    tls:{
        rejectUnauthorized:false 
     }
}

const transporter = nodemailer.createTransport(credentials);

module.exports = async (to, content) => {
    const contacts = {
        from: process.env.MAIL_USER,
        to
    }

    const email = Object.assign({}, content, contacts);

    await transporter.sendMail(email);
}
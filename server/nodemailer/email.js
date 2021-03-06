const nodemailer = require('nodemailer')
require('dotenv').config()

const credentials = {
  service: 'gmail',
  // port: 465,
  // secure: true,
  auth: {
    type: 'OAuth2',
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
    clientId:
      '615263835064-jen0pbc6480cs03vlaah0nbulju1pah8.apps.googleusercontent.com',
    clientSecret: 'zUalanmyojx17vecaOC2VM0O',
    refreshToken:
      '1//04l6HTY5bb1fvCgYIARAAGAQSNwF-L9IricARJzFVxNPja3Pkq5QV-jMeMCVfHVr-jtuihPmk3EeCG1rXE65w5DsI1gRC9EeXnbc',
  },
  tls: {
    rejectUnauthorized: false,
  },
}

const transporter = nodemailer.createTransport(credentials)

const confirmEmail = async (to, content) => {
  const contacts = {
    from: process.env.MAIL_USER,
    to,
  }
  const email = Object.assign({}, content, contacts)
  await transporter.sendMail(email)
}

const contactEmail = async (name, sname, email, subject, message) => {
  const contact = {
    from: `${name} ${sname} <${email}>`,
    to: process.env.MAIL_USER,
    subject: subject,
    html: `<p>Name: ${name} ${sname}</p><p>Email(from): ${email}</p><p>Message: ${message}</p>`,
  }

  const send = Object.assign({}, contact)
  await transporter.sendMail(send)
}

module.exports = {
  confirmEmail,
  contactEmail,
}

// let express = require('express')
// let nodemailer = require('nodemailer')
// const router = express.Router()

// let app = express()
// const path = require('path')

// // Static folder
// app.use(
//   '../../nos-tech/src/screens/contact/',
//   express.static(
//     path.join(__dirname, '../../nos-tech/src/screens/contact/', 'Contact.js')
//   )
// )

// const smtpTransporter = nodemailer.createTransport({
//   service: 'smtp.gmail.com',
//   port: 587, //465
//   secure: true,
//   auth: {
//     user: 'ismailinarent@gmail.com',
//     pass: 'windowS88****',
//   },
// })

// // verifying the connection configuration
// smtpTransporter.verify(function (error, success) {
//   if (error) {
//     console.log(error)
//   } else {
//     console.log('Server is ready to take our messages!')
//   }
// })

// router.post('/access', (req, res, next) => {
//   var fname = req.body.fname
//   var lname = req.body.lname
//   var subject = req.body.subject
//   var email = req.body.email
//   var message = req.body.message
//   var content = `fname: ${fname} \n lname: ${lname} \n subject: ${subject}email: ${email} \n message: ${message}`

//   var mail = {
//     from: name,
//     to: 'ismailinarent@gmail.com',
//     message: subject,
//     text: content,
//   }

//   smtpTransporter.sendMail(mail, (err, data) => {
//     if (err) {
//       res.json({
//         status: 'fail',
//       })
//     } else {
//       res.json({
//         status: 'success',
//       })
//     }
//   })
// })

// // serve PORT running here
// const PORT = process.env.PORT || 8080
// app.listen(PORT, () => console.info(`server has started on ${PORT}`))

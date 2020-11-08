const {CLIENT_ORIGIN} = require('./config');

module.exports = {

    confirm: id => ({
       
        subject: 'nosTech Verify Email!',
        html: `
        Hi there,<br/>
         We're happy you signed up for nosTech.<br/>
         To start
         exploring the nosTech app, please verify your email by <br/>
         clicking on the link below:<br/>
         <a href='${CLIENT_ORIGIN}/confirm/${id}'>  
         Verify your email!
         </a>`,
        text: `Copy and paste this link ${CLIENT_ORIGIN}/confirm/${id}`
    })
}
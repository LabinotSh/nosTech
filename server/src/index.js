const express = require('express');
const morgan = require('morgan');//Logger that automatically logs all the incoming requests
const helmet = require('helmet');//Adds/Removes certain headers to secure the app
const cors = require('cors');//Cross-origin
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser'); 
const connectDB = require('./config/db');
const userRoutes = require('./api/user');
const courseRoutes = require('./api/course');
const orderRoutes = require('./api/order');
const categoryRoutes = require('./api/category');
const orderTest = require('./api/test');
const emailRoutes = require('./api/email');
const path = require('path');
require('dotenv').config();//Configure .env variables


connectDB() //initializes connection with the database

const app = express();
//multer static files
app.use(express.static('./public'));
app.use('/uploads', express.static('uploads'));

//Middleware packages
app.use(morgan('common'));
app.use(helmet());
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use('/api/user', userRoutes);
app.use('/api/course', courseRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/test', orderTest);
app.use('/api/email/confirm', emailRoutes);
app.use('/api/category', categoryRoutes);

//Throws when a non-existent route is visited
app.use((req, res, next) => {
    const error = new Error(`Not found - ${req.originalUrl}`)
    res.status(404)
    next(error)
})


//Throws when a bad paramater is given (e.g non-existent ID)
app.use((err, req, res, next) => {
    const statusCode = res.statusCode ===  200 ? 500 : res.statusCode
    res.status(statusCode);
    res.json({
        message: err.message,  
    })
}
)

// var nodemailer = require('nodemailer');

// var transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'sherifilabinot@gmail.com',
//     pass: '********'
//   }
// });

// var mailOptions = {
//   from: 'sherifilabinot@gmail.com',
//   to: 'sherifilabinot@gmail.com',
//   subject: 'Sending Email using Node.js',
//   text: 'That was easy!'
// };

// transporter.sendMail(mailOptions, function(error, info){
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// });


const port = process.env.PORT || 3001;

//Listen to the port
app.listen(port, () => {
    console.log(`Listening to http:localhost:${port}`);
});
const express = require('express');
const morgan = require('morgan');//Logger that automatically logs all the incoming requests
const helmet = require('helmet');//Adds/Removes certain headers to secure the app
const cors = require('cors');//Cross-origin 
const connectDB = require('./config/db');
const userRoutes = require('./api/user');
const courseRoutes = require('./api/course');
const orderRoutes = require('./api/order');
require('dotenv').config();//Configure .env variables


connectDB() //initializes connection with the database

const app = express();

//Middleware packages
app.use(morgan('common'));
app.use(helmet());
app.use(express.json());
app.use('/api/user', userRoutes);
app.use('/api/course', courseRoutes);
app.use('/api/order', orderRoutes);

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

const port = process.env.PORT || 3001;

//Listen to the port
app.listen(port, () => {
    console.log(`Listening to http:localhost:${port}`);
});
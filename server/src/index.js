const express = require('express');
const morgan = require('morgan');//Logger that automatically logs all the incoming requests
const helmet = require('helmet');//Adds/Removes certain headers to secure the app
const cors = require('cors');//Cross-origin 

require('dotenv').config();//Configure .env variables

const app = express();

//Middleware packages
app.use(morgan('common'));
app.use(helmet());
app.use(express.json());

const port = process.env.PORT || 3001;

//Listen to the port
app.listen(port, () => {
    console.log(`Listening to http:localhost:${port}`);
});
const mongoose = require('mongoose');
const doteenv = require('dotenv');
const users = require ('../data/users.js');
const User = require('../models/User.js');
const connectDB =  require('../config/db.js');

doteenv.config()
connectDB()

const importData = async () => {
    try{
        await User.deleteMany()

        await User.insertMany(users)

        console.log('Data imported')
        process.exit()
    } catch(error) {
        console.error(`${error}`)
        process.exit(1)
    }
}

const destroyData = async () => {
    try{
        await User.deleteMany()


        console.log('Data Destroyed')
        process.exit()
    } catch(error) {
        console.error(`${error}`)
        process.exit(1)
    }
}

if (process.argv[2] === '-d') {
    destroyData()
}else{
    importData()
}

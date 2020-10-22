const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
    name: String,
    image: String,
},{
   timestamps: true 
}
)

const Test = mongoose.model('Test', testSchema)
module.exports = Test;
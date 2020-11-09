const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        index: true,
        maxlength: 30,
        trim: true,
        uniqueCaseInsensitive: true
        },
    },  
    {
        timestamps: true
    }   
)

categorySchema.plugin(uniqueValidator, {
    message: 'Error, expected name to be unique.'
  });

const Category = mongoose.model('Category', categorySchema)

module.exports = Category
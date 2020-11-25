const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const tagsSchema = new mongoose.Schema({
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

tagsSchema.plugin(uniqueValidator, {
    message: 'Error, expected name to be unique.'
  });

const Tags = mongoose.model('Tags', tagsSchema)

module.exports = Tags
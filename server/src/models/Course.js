const moongose = require('mongoose');


const courseSchema = new moongose.Schema({
    name: {
        type: String,
        lowercase: true,
        required: true
    },
    description: {
        type: String,
        lowercase: true,
    },
    price: {
        type: Number,
        lowercase: true,
        required: true       
    },
    image: {
        type: String,
        required: false
    },
    _instructor: {
        type: moongose.Schema.Types.ObjectId,
        required:false,
        ref: 'User'
    },
    users: [{
        type: moongose.Schema.Types.ObjectId,
        required:false,
        ref: 'User'
    }],
    category: {
        type: String,
        required: false
    },
    videos: [{
        type: String,
        required: false
    }]
},{
    timestamps: true
})

const Course = moongose.model('Course', courseSchema);

module.exports = Course;
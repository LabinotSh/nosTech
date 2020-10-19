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
        
        
    },
    image: {
        type: String,
        required: true
    },
    instructor: {
        type: moongose.Schema.Types.ObjectId,
        required:false,
        ref: 'Instructor'
    },

    students: [{
        type: moongose.Schema.Types.ObjectId,
        required:false,
        ref: 'User'
    }],

    category: [{
        type: String,
        required: false
    }],
    videos: [{
        type: String,
        required: false
    }]

},{
    timestamps: true
})

const Course = moongose.model('Course', courseSchema);
module.exports = Course;
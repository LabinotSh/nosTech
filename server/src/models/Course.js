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
        required: true
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
    }],
    feedback: [{
        user: {
            type: moongose.Schema.Types.ObjectId,
            required:false,
            ref: 'User'
        },
        comment: String
    }]
},{
    timestamps: true
})

const Course = moongose.model('Course', courseSchema);

module.exports = Course;
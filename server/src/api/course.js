const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const Course = require('../models/Course');
const User = require('../models/User');
const {verify} = require('../middleware/authToken');
const {authorize} = require('../middleware/authorize');


// find all courses
// router.get('/', asyncHandler(async (req, res) => {
//     const courses = await Course.find().populate('users');
//     res.header('Content-Range', `course 0-2/${courses.length}`)
//     res.json(courses);
// }));

//Authenticate before you get all the courses
router.get('/', asyncHandler(async (req, res) => {
    const courses = await Course.find().populate('users');
    res.header('Content-Range', `course 0-2/${courses.length}`)
    res.json(courses);
}));

//find all users of the course
router.get('/:courseId/users', async (req,res) => {
    //const id = req.params.courseId;
    const users = await Course.findOne({
        _id:req.params.courseId
    }).populate('users');
    res.header('Content-Range', `course 0-10/${users.length}`);

    console.log('USss'+ users.image);
    
    res.json(users.users);
});


//find course by id
router.get('/:courseId', asyncHandler(async(req,res) => {
    const id = req.params.courseId;
    const course = await Course.findById(id)
    if(course) {
        res.json(course);
    }else {
        res.status(404)
        throw new Error('Course not found');
    }
}));

//find course by category
router.get('/cat/:category', asyncHandler(async(req,res) => {
    const category = req.params.category;
    const courses = await Course.find({
        category :  {
            "$in" : [category]
        }
    });
    if(courses) {
        res.json(courses);
    }else {
        res.status(404);
        throw new Error('No course with such category found')
    }
}));

//find courses by user

//Create a new course
router.post('/newCourse', asyncHandler(async(req, res) => {
    const newCourse = new Course(req.body);
    const course = await newCourse.save();
    res.send('Course added');
}))

//Update a course by id
router.patch('/:courseId', asyncHandler(async (req,res) => {
    const id = req.params.courseId;
    const updated = await Course.findByIdAndUpdate(id, req.body)
    res.json(updated);
}));



//Delete by id
router.delete('/:courseId', asyncHandler(async (req,res) => {
    const id = req.params.courseId;
    
        const deletedUser = await Course.findByIdAndDelete(id);
        res.send(deletedUser);
    
}));

module.exports = router;
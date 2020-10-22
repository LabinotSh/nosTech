const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const Course = require('../models/Course');


// find all courses
router.get('/', asyncHandler(async (req, res) => {
    const courses = await Course.find();
    res.header('Content-Range', `course 0-2/${courses.length}`)
    res.json(courses);
}));



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
router.post('/', asyncHandler(async(req, res) => {
    const newCourse = new Course(req.body);
    const course = await newCourse.save();
    res.send('Course added');
}))

//Update a course by id
// router.patch('/:courseId', asyncHandler(async (req,res) => {
//     const id = req.params.courseId;
//     const updated = await Course.findByIdAndUpdate(id, req.body)
//     res.json(updated);
// }));

//Update a course by id
router.put('/:courseId', asyncHandler(async (req,res) => {
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
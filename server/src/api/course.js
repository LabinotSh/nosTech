const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const Course = require('../models/Course');
const User = require('../models/User');
const {verify} = require('../middleware/authToken');
const {authorize} = require('../middleware/authorize');
const uploadMulter = require('../middleware/upload.js')
const uploadvalidation = require('../middleware/Uploadvalidation.js')

// find all courses
// router.get('/', asyncHandler(async (req, res) => {
//     const courses = await Course.find().populate('users');
//     res.header('Content-Range', `course 0-2/${courses.length}`)
//     res.json(courses);
// }));

//Authenticate before you get all the courses
router.get('/', asyncHandler(async (req, res) => {
    const courses = await Course.find().populate('users');
    //res.header('Content-Range', course 0-2/${courses.length})
    res.send(courses);
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
router.get('/:id', asyncHandler(async(req,res) => {
    const { id } = req.params;
    const course = await Course.findById(id);
    if(course) {
        res.send(course);
    }else {
        res.status(404)
        throw new Error('Course not found');
    }
}));

//Added to favorites
router.put('/fav/add/:id', async(req,res) => {
    const {id} = req.params;

    const course = await Course.findById(id);
    if(course && course.favorite){
        res.send({
            msg:"Already added",
            course: course
        })
    }else if (!course.favorite){
    const updated = await Course.findByIdAndUpdate(id, {favorite:true}, {new: true});
    res.send(updated);
    }else{
        res.sendStatus(404).send('Error: Could not add it!');
    }  
    console.log('coursess ' + JSON.stringify(course));
    // res.send(course);
})

//Remove from favorites
router.put('/fav/remove/:id', async(req,res) => {
    const {id} = req.params;

    const course = await Course.findById(id)
    .then(course => {
        if(course && course.favorite){
            Course.findByIdAndUpdate(id, {favorite:false}, {new: true}).
            then((co) => { 
                console.log('Course '+ co);
                res.send(co)})
            .catch(err => console.log(err));
        }else{
            res.json({msg:"already removed"});
        }

    }) 
    console.log('cc ' + course);
    // res.send(course); 
})

//Get all the courses added as favorites
router.get('/favs/added', async(req,res) => {

    const course = await Course.find({favorite:false});

    res.json(course);   
})



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
createCourse = (req, res) => {
    let name = req.body.name
    let description = req.body.description
    let price = req.body.price
    let category = req.body.category
    let image = req.file.path
    console.log(name, image)
    const course = new Course({
        name: name,
        description: description,
        price: price,
        category,
        image: image
    })
    course.save((err, course) => {
        if (err) {
            console.log(err)
            return res.status(400).json({
                errors: err.meesage
            })
        }
        return res.json({
            message: "Created course successfully",
            course
        })
    })
}
router.post('/newCourse', uploadMulter, uploadvalidation, createCourse)

//Update a course by id
router.put('/:courseId', asyncHandler(async (req,res) => {
    const id = req.params.courseId;
    if(req.body.users) {
        
    }
    const updated = await Course.findByIdAndUpdate(id, req.body)
    res.json(updated);
}));


//Delete by id
router.delete('/:courseId', asyncHandler(async (req,res) => {
    const id = req.params.courseId;
    
        const deletedUser = await Course.findByIdAndDelete(id);
        res.send(deletedUser);
    
}));

router.post('/:id/addUser', asyncHandler(async(req, res)=> {
    const course = await Course.findById(req.params.id);
    
    if(course) {
        
        
        const alreadyEnrolled = course.users.find(u => u.toString() === req.body._id.toString())
        if(alreadyEnrolled) {
            res.status(400)
            throw new Error("Already enrolled")
        }

        course.users.push(req.body._id);
        await course.save()
        res.status(201).json({message:"Enrolled Successfully!"})
    }else {
        res.status(404)
        throw new Error("Course not found")
    }
}))



module.exports = router;
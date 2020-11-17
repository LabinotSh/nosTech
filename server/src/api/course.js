const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const Course = require('../models/Course');
const User = require('../models/User');
const {verify} = require('../middleware/authToken');
const {authorize} = require('../middleware/authorize');
const uploadMulter = require('../middleware/upload.js')
const uploadvalidation = require('../middleware/Uploadvalidation.js');
const mongoose = require('mongoose')

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

// //Added to favorites
// router.put('/fav/add/:cId/:uId', async(req,res) => {
//     const {cId} = req.params;
//    const {user} = req.body;
//    var myId = JSON.parse(req.body.id);
//     const data = {
//         $set: {users: new ObjectId},
//         // $set: {favorite: true}
//     }
//     console.log('Body ' , req.body);

//     const course = await Course.findById(cId);
//     if(course && course.favorite){
//         res.send({
//             msg:"Already added",
//             course: course
//         })

//         if(course.users.find(u => u.toString() === req.params.uId)){
//             res.status(400)
//             throw new Error("User has been already added!")
//         }
        
//     }else if (!course.favorite){
//         // course.users.push(req.body._id);
//         // console.log('fffffff ' + course.users);
//     const updated = await Course.findOneAndUpdate({ _id: cId },
//              data,
//             //{$push:{users: req.body._id}},
//              {new:true},
//         function(err, doc){
//             if (err){
//               console.log(err);
//               return res.send({
//                 success: false,
//                 message: 'Error somewhere!'
//               });
//             } 
//             return res.send({
//               success: true,
//               favorites: doc,
//               message: 'Updated!'
              
//             });
//         });
    
//     }else{
//         res.sendStatus(404).send('Error: Could not add it!');
//     }  
//     console.log('coursess ' + JSON.stringify(course));

// })

// //Remove from favorites
// router.put('/fav/remove/:cId/:uId', async(req,res) => {
//     const {cId} = req.params;

//     const data = {
//          favorite:false,
//         $pull: {users:  req.body._id}
//     }

//     const course = await Course.findById(cId)
//     .then(course => {
//         if(course && course.favorite){
           
//             Course.findOneAndUpdate({ _id: cId },
//                  data,
//                  {new:true},
//                 function(err, doc){
//                     if (err){
//                       console.log(err);
//                       return res.send({
//                         success: false,
//                         message: 'Error somewhere!'
//                       });
//                     } 
//                     return res.send({
//                       success: true,
//                       favorites: doc,
//                       message: 'Updated!'
                      
//                     });
//                 });
            
//         }else{
//             res.json({msg:"Already removed!"})
//         }

//     }) 
//     console.log('cc ' + course);
//     // res.send(course); 
// })

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


router.post('/new', async(req, res)=> {

    try {
            const newPost = await new Course({
              name: req.body.name,
              description: req.body.description,
              price:req.body.price,
              image: req.body.image,
              category: req.body.category,
          })

          const co = await newPost.save();
          res.send(co);
          console.log(co);
    }catch(err){
        console.log(err);
    }
});




module.exports = router;
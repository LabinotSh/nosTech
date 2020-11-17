var express = require('express');
var router = express.Router();
const Course = require('../models/Course');
const User = require('../models/User');
var mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');

var ObjectId = mongoose.Types.ObjectId;


 
// if(course) {
        
        
//     const alreadyEnrolled = course.users.find(u => u.toString() === req.body._id.toString())
//     if(alreadyEnrolled) {
//         res.status(400)
//         throw new Error("Already enrolled")
//     }

//     course.users.push(req.body._id);
//     await course.save()
//     res.status(201).json({message:"Enrolled Successfully!"})
// }else {
//     res.status(404)
//     throw new Error("Course not found")
// }

//Added to favorites
router.post('/add/:cId', asyncHandler(async(req,res) => {
    const {cId} = req.params;
 
    console.log('Body ' , req.body);

    const course = await Course.findById(cId);

    if(course){

        const alreadyAdded = course.users.find(u => u.toString() === req.body._id.toString())

        if(alreadyAdded) {
            res.status(400)
            throw new Error("Already added")
        }

        let favorite = true;
        course.favorite = favorite;
        course.users.push(req.body._id);
        console.log('ccccdd ' + course.favorite);
        const favorites = await course.save();
        res.status(201).json({message:"User added Successfully!",
                              favorites: favorites})
    }else{
        res.status(404)
        throw new Error("Course not found")
       }
    
    
        
    // }else if (!course.favorite){
    //     // course.users.push(req.body._id);
    //     // console.log('fffffff ' + course.users);
    // const updated = await Course.findOneAndUpdate({ _id: cId },
    //          data,
    //         // {$push:{users: req.body._id}},
    //          {new:true},
    //     function(err, doc){
    //         if (err){
    //           console.log(err);
    //           return res.send({
    //             success: false,
    //             message: 'Error somewhere!'
    //           });
    //         } 
    //         return res.send({
    //           success: true,
    //           favorites: doc,
    //           message: 'Updated!'
              
    //         });
    //     });
    
    // }else{
    //     res.sendStatus(404).send('Error: Could not add it!');
    // }  
    // console.log('coursess ' + JSON.stringify(course));

}))

//Remove from favorites
router.put('/remove/:cId', async(req,res) => {
    const {cId} = req.params;

    const data = {
        $unset: {users: req.body._id ,favorite:false }
    }

    const course = await Course.findById(cId)
    .then(course => {
        if(course && course.favorite){
           
            Course.findOneAndUpdate({ _id: cId },
                 data,
                 {new:true},
                function(err, doc){
                    if (err){
                      console.log(err);
                      return res.send({
                        success: false,
                        message: 'Error somewhere!'
                      });
                    } 
                    return res.send({
                      success: true,
                      favorites: doc,
                      message: 'Updated!'
                      
                    });
                });
            
        }else{
            res.json({msg:"Already removed!"})
        }

    }) 
    console.log('cc ' + course);
    // res.send(course); 
})

module.exports = router;
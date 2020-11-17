var express = require('express');
var router = express.Router();
const Course = require('../models/Course');
const User = require('../models/User');
var mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');


//Added to favorites
router.put('/add/:cId', asyncHandler(async(req,res) => {
    const {cId} = req.params;

    const data = {
        $set: {users: req.body._id ,favorite:true }
    }
 
    const course = await Course.findById(cId)
    .then(course => {
        if(course && !course.favorite){
            const alreadyAdded = course.users.find(u => u.toString() === req.body._id.toString())
            if(alreadyAdded){
                res.status(400)
             throw new Error("User is already added!")
            }
           
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
                      fav: doc.favorite,
                      message: 'Updated!'
                      
                    });
                });
            
        }else{
            res.json({message:"Already added!"})
        }
    })

    // console.log('Body ' , req.body);

    // const course = await Course.findById(cId);

    // if(course){

    //     const alreadyAdded = course.users.find(u => u.toString() === req.body._id.toString())

    //     if(alreadyAdded) {
    //         res.status(400)
    //         throw new Error("Already added")
    //     }

    //     let favorite = true;
    //     course.favorite = favorite;
    //     course.users.push(req.body._id);
    //     console.log('ccccdd ' + course.favorite);
    //     const favorites = await course.save();
    //     res.status(201).json({message:"User added Successfully!",
    //                           favorites: favorites})
    // }else{
    //     res.status(404)
    //     throw new Error("Course not found")
    //    }
    
    
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
                      fav: doc.favorite,
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
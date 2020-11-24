const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const Post = require('../models/Post')

router.get('/', asyncHandler(async(req,res) => {
    const posts = await Post.find().populate('users','name surname')
    res.send(posts)
}))

router.post('/', asyncHandler(async(req,res) => {
    const user = req.body.user
    const content = req.body.content

    const post = await Post.create({
        user,
        content
    })
    
    if(post) {
        res.status(201).json({
            message: "Post Created",
            post
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
}))

module.exports = router
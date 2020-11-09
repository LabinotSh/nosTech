const express = require('express');
const Category = require('../models/Category');
const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const router = express.Router();

//Get Category 
router.get('/', asyncHandler(async (req, res) => {
    const category = await Category.find();
    res.json(category); 
}));

//Get Category by id
router.get('/:catId', asyncHandler(async(req,res) => {
    const id = req.params.catId;
    const category = await Category.findById(id)
    res.json(category);
}));

//Post Category
router.post('/', function(req, res, next) {
    Category.create(req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
});

//Edit Category by Id
router.put('/:id', function(req, res, next) {
  console.log(req.body);
  Category.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

//Delete Category by Id
router.delete('/:id', function(req, res, next) {
  Category.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
}); 

module.exports = router;

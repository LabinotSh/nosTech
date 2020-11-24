const express = require('express');
const Category = require('../models/Category');
const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const router = express.Router();
var ObjectID = require('mongoose').Types.ObjectId

//Get Category 
router.get('/', (req, res) => {
    Category.find((err, docs) => {
          if (!err) res.send(docs)
          else console.log('Error while retrieving all categories : ' + JSON.stringify(err, undefined, 2))
      })
  })

//Get Category by id
router.get('/:catId', asyncHandler(async(req,res) => {
    const id = req.params.catId;
    const category = await Category.findById(id)
    res.json(category);
}));

//Post Category
router.post('/', (req, res) => {
    var newCategory = new Category({
        name: req.body.name,
    })

    newCategory.save((err, docs) => {
        if (!err) res.send(docs)
        else console.log('Error while creating new category : ' + JSON.stringify(err, undefined, 2))
    })
})

//Edit Category by Id
router.put('/:id', (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('No category with given id : ' + req.params.id)

    var updatedCategory = {
      name: req.body.name,
       
    }

    Category.findByIdAndUpdate(req.params.id, { $set: updatedCategory },{new:true}, (err, docs) => {
        if (!err) res.send(docs)
        else console.log('Error while updating a category : ' + JSON.stringify(err, undefined, 2))
    })
})

//Delete Category by Id
router.delete('/:id', (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('No category with given id : ' + req.params.id)

    Category.findByIdAndRemove(req.params.id, (err, docs) => {
        if (!err) res.send(docs)
        else console.log('Error while deleting a record : ' + JSON.stringify(err, undefined, 2))
    })
})

module.exports = router;
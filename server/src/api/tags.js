const express = require('express');
const Tags = require('../models/Tags');
const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const router = express.Router();
var ObjectID = require('mongoose').Types.ObjectId

//Get Tags 
router.get('/', (req, res) => {
    Tags.find((err, docs) => {
          if (!err) res.send(docs)
          else console.log('Error while retrieving all tags : ' + JSON.stringify(err, undefined, 2))
      })
  })

//Get tags by id
router.get('/:tagId', asyncHandler(async(req,res) => {
    const id = req.params.tagId;
    const tags = await Tags.findById(id)
    res.json(tags);
}));

//Post tags
router.post('/', (req, res) => {
    var newTags = new Tags({
        name: req.body.name,
    })

    newTags.save((err, docs) => {
        if (!err) res.send(docs)
        else console.log('Error while creating new tags : ' + JSON.stringify(err, undefined, 2))
    })
})

//Edit tags by Id
router.put('/:id', (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('No tags with given id : ' + req.params.id)

    var updatedTags = {
      name: req.body.name,
       
    }

    Tags.findByIdAndUpdate(req.params.id, { $set: updatedTags },{new:true}, (err, docs) => {
        if (!err) res.send(docs)
        else console.log('Error while updating a tags : ' + JSON.stringify(err, undefined, 2))
    })
})

//Delete tags by Id
router.delete('/:id', (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('No tags with given id : ' + req.params.id)

        Tags.findByIdAndRemove(req.params.id, (err, docs) => {
        if (!err) res.send(docs)
        else console.log('Error while deleting a record : ' + JSON.stringify(err, undefined, 2))
    })
})

module.exports = router;
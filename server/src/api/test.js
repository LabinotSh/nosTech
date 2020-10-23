var Test = require('../models/Test');
var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var multer = require('multer');
var fs = require('fs');


var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../../static/images')
  },
  filename: (req, file, cb) => {
    let ext = file.originalname.substring(file.originalname.indexOf(".") + 1);
    cb(null, file.fieldname + '-' + Date.now() + "." + ext)
  }
});
var upload = multer({
  storage: storage
});

/* GET ALL Test */
router.get('/', function(req, res, next) {
  Test.find(function (err, test) {
      if (err) return next(err);
      res.json(test);
    });
  });
  


  router.post('/', upload.single('image'),
    function (req, res) {
      let test = req.body;
      test.name = req.body.name
      test.image = req.body.image != 'undefined' ? req.file.filename : null
      Test.create(test, function (err, post) {
        if (err) return next(err);
        res.json(post);
      });
    
  });

module.exports = router;

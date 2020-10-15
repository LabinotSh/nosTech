const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
//const jwt = require('jsonwebtoken');

const User = require('../models/User');

//Validation
//const schema = require('../validation');


//Get All the users
router.get('/', async (req,res) =>{
    try{
        const users = await User.findAll();
        res.json(users);
    }catch(err){
        console.log({
            message:err
        });
    }
});

router.post('/newUser', async (req,res) => {

    //Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password,salt);

    try {
        const newUser = new User({
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            password: hashedPassword
        })
    } catch (error) {
        console.log(error);
    }
});

//Get one user by id
router.get('/:userId', async(req,res) => {
    try {
        const id = req.params.userId;
        const user = await User.findOne({_id:id});
        res.json(user);
        
    } catch (error) {
        console.error(error);
    }
});

//Delete a user by id
router.delete('/:userId', async (req,res) => {
    const id = req.params.userId;
    try {
        const deletedUser = await User.deleteOne({
            _id: id
        })
     
        res.send(deletedUser);
    } catch (error) {
        console.error(error);
    }
});

//Update a user by id
router.patch('/:userId', async (req,res) => {
    try {
        const id = req.params.userId;
        const updated = await User.updateOne({
            _id: id
        })
        res.json(updated);
    } catch (error) {
        console.error(error);
    }
});

module.exports = router;
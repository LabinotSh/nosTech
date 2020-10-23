const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const schema = require('../middleware/validation');
const {authorize} = require('../middleware/authorize');
const {generateAccessToken, generateRefreshToken, verify} = require('../middleware/authToken');

const {refreshTokens} = require('../data/refreshTokens');
const User = require('../models/User');



//Get All the users
router.get('/', async (req,res) =>{
    try{
        const users = await User.find();
        res.header('Content-Range', `course 0-10/${users.length}`);
        res.json(users);
    }catch(err){
        console.log({
            message:err
        });
    }
});

router.post('/register', async (req,res) => {

    const {error} = schema.registrationValidate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //Check if that email already exists
    const emailExists = await User.findOne({
        where: {
            email: req.body.email
        }
    });
    if(emailExists) return res.status(400).send('Email already exists!');

    //Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password,salt);

    try {
        const newUser = new User({
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            password: hashedPassword,
            role: req.body.role
        })

        const savedUser = await newUser.save();
        res.json(savedUser);
    } catch (error) {
        console.log(error);
    }
});

//login
router.post('/login', async (req,res) => {

    const {error} = schema.loginValidate(req.body);
     if(error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({
           email: req.body.email
   });
   
   if(!user) return res.status(400).send('Email or password wrong!');

   const validPassword = await bcrypt.compare(req.body.password, user.password);
   if(!validPassword) return res.status(400).send('Invalid Password!');

   const accessToken = generateAccessToken(user);
   const refreshToken = generateRefreshToken(user);
   user.tokens = refreshTokens; 
   user.tokens.push(refreshToken);
   
//    console.log('dd : ' + user.tokens);
//    console.log('REFFF ' + refreshToken);

   res.cookie("jwt", accessToken, {secure: false, httpOnly: false})

   res.header('auth-token', accessToken).send( {
       refreshToken: refreshToken
   });
   
});

//Get the new token from the generated refresh token
router.post('/token', async (req,res) => {
    const refreshToken = req.body.token;
    if(refreshToken == null) return res.sendStatus(401)
    if(!tokens.includes(refreshToken)) return res.sendStatus(403)
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
       if(err) return res.sendStatus(403)
       const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);

       res.cookie("jwt", accessToken, {secure: false, httpOnly: false})

       res.json({ accessToken: accessToken })
    })
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
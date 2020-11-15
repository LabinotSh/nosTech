const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const schema = require('../middleware/validation')
const { authorize } = require('../middleware/authorize')
const {
  generateAccessToken,
  generateRefreshToken,
  verify,
} = require('../middleware/authToken')
const asyncHandler = require('express-async-handler');

const { refreshTokens } = require('../data/refreshTokens')
const User = require('../models/User')

const emailTemplate = require('../templates/email')
const { confirmEmail, contactEmail } = require('../../nodemailer/email')

//Get All the users
router.get('/', async (req, res) => {
  try {
    const users = await User.find()
    res.header('Content-Range', `course 0-10/${users.length}`)
    res.json(users)
  } catch (err) {
    console.log({
      message: err,
    })
  }
})

router.post('/contact', async (req, res) => {
  try {
    const { name, sname, subject, email, message } = req.body

    const sent = await contactEmail(name, sname, email, subject, message)
    res.json({ msg: 'Message sent!' })
  } catch (err) {
    console.log(err)
  }
})

router.post('/register', async (req, res) => {
  const { error } = schema.registrationValidate(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  //Check if that email already exists
  const emailExists = await User.findOne({
    email: req.body.email,
  })
  if (emailExists) return res.status(400).send('Email already exists!')

  //Hash the password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(req.body.password, salt)

  try {
    const newUser = new User({
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
      password: hashedPassword,
      role: req.body.role,
      username: req.body.username,
    })

    // const savedUser = await newUser.save();
    // res.send({user: savedUser});
    // const savedUser = await newUser.save();
    const savedUser = newUser
      .save()
      .then((newUser) => {
        confirmEmail(newUser.email, emailTemplate.confirm(newUser._id))
      })
      .then(() =>
        res.json({ msg: 'Email sent, please check your inbox to verify it!' })
      )
      .catch((err) => console.log(err))


    if (emailExists && !emailExists.confirmed) {
      await sendEmail(
        emailExists.email,
        emailTemplate.confirm(emailExists._id)
      ).then(() => res.json({ msg: 'An email message was resent to you!' }))
    }
    // res.send({user: savedUser, email: emailed});
  } catch (error) {
    console.log(error)
  }
})

//login
router.post('/login', async (req, res) => {
  const { error } = schema.loginValidate(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  const user = await User.findOne({
    username: req.body.username,
  })

  if (!user) return res.status(400).send('Username or password wrong!')

  const validPassword = await bcrypt.compare(req.body.password, user.password)
  if (!validPassword) return res.status(400).send('Invalid Password!')

  //Check if the suer has confirmed his email!
  //    if(!user.confirmed){
  //        res.status(400).send('Please confirm your email first!');
  //    }

  const accessToken = generateAccessToken(user)
  const refreshToken = generateRefreshToken(user)
  user.tokens = refreshTokens
  user.tokens.push(refreshToken)

  res.cookie('jwt', accessToken, { secure: false, httpOnly: false })
  //    res.header('auth-token', accessToken).send( {
  //        refreshToken: refreshToken
  //    });

  //    res.header('auth-token', accessToken).send( {
  //        refreshToken: refreshToken
  //    });

  res.send({
    message: 'authentication done ',
    token: accessToken,
    refreshToken: refreshToken,
    user: user,
  })
})

//Get the new token from the generated refresh token
router.post('/token', async (req, res) => {
  const refreshToken = req.body.token
  if (refreshToken == null) return res.sendStatus(401)
  if (!tokens.includes(refreshToken)) return res.sendStatus(403)
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)

    res.cookie('jwt', accessToken, { secure: false, httpOnly: false })

    res.json({ accessToken: accessToken })
  })
})

//Get one user by id
router.get('/:userId', async (req, res) => {
  try {
    const id = req.params.userId
    const user = await User.findOne({_id:id}).populate('courses');
    console.log('users  ' + user);
    res.json(user)
  } catch (error) {
    console.error(error)
  }
})



//Delete a user by id
router.delete('/:userId', async (req, res) => {
  const id = req.params.userId
  try {
    const deletedUser = await User.deleteOne({
      _id: id,
    })
    res.json('User deleted' + deletedUser)
  } catch (error) {
    console.error(error)
  }
})

//Update a user by id
// router.patch('/:userId', async (req,res) => {
//     try {
//         const id = req.params.userId;
//         const updated = await User.updateOne({
//             _id: id
//         })
//         res.json(updated);
//     } catch (error) {
//         console.error(error);
//     }
// });



// router.put('/:id', async (req, res) => {
//   const id = req.params.id

//   const userup = await User.findByIdAndUpdate(id, {
//     confirmed: true,
//   })
//   res.json('updated ' + userup)
// })

//Show all of the user's courses added to favorites
router.get('/courses/favorite', async(req,res) => {
  const user = User.find()
  .populate({ path:'courses',
   match: {'favorite': 'true'}})
   .then(data => {res.send({data})})
   .catch(err => console.log(err));

})

module.exports = router
router.put('/:userId', asyncHandler(async (req,res) => {
    const id = req.params.userId;
    const updated = await User.findByIdAndUpdate(id, req.body)
    res.json(updated);
}));

router.post('/:id/addCourse', asyncHandler(async(req, res)=> {
    const user = await User.findById(req.params.id);
    
    if(user) {
        
        
        const alreadyEnrolled = user.courses.find(u => u.toString() === req.body._id.toString())
        if(alreadyEnrolled) {
            res.status(400)
            throw new Error("Already enrolled")
        }

        user.courses.push(req.body._id);
        await user.save()
        res.status(201).json({message:"Enrolled Successfully!"})
    }else {
        res.status(404)
        throw new Error("Course not found")
    }
}))

module.exports = router;

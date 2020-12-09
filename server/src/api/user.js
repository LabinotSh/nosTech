const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const schema = require('../middleware/validation');
const { authorize } = require('../middleware/authorize');
const { generateAccessToken, generateRefreshToken, verify } = require('../middleware/authToken');
const asyncHandler = require('express-async-handler');

const { refreshTokens } = require('../data/refreshTokens');
const User = require('../models/User');

const emailTemplate = require('../templates/email');
const { confirmEmail, contactEmail } = require('../../nodemailer/email');
const { use } = require('./course');

//Get All the users
router.get('/', async (req, res) => {
	try {
		const users = await User.find();
		res.header('Content-Range', `course 0-10/${users.length}`);
		res.json(users);
	} catch (err) {
		console.log({
			message: err,
		});
	}
});

router.post('/contact', async (req, res) => {
	try {
		const { name, sname, subject, email, message } = req.body;

		const sent = await contactEmail(name, sname, email, subject, message);
		res.json({ msg: 'Message sent!' });
	} catch (err) {
		console.log(err);
	}
});

router.post('/register', async (req, res) => {
	const { error } = schema.registrationValidate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	//Check if that email already exists
	const emailExists = await User.findOne({
		email: req.body.email,
	});
	if (emailExists) return res.status(400).send('Email already exists!');

	//Check if username exists
	const usernameExists = await User.findOne({
		username: req.body.username,
	});
	if (usernameExists) return res.status(400).send('Username already exists!');

	//Hash the password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(req.body.password, salt);

	try {
		const newUser = new User({
			name: req.body.name,
			surname: req.body.surname,
			email: req.body.email,
			password: hashedPassword,
			role: req.body.role,
			username: req.body.username,
		});

		const savedUser = newUser
			.save()
			.then((newUser) => {
				confirmEmail(newUser.email, emailTemplate.confirm(newUser._id));
			})
			.then(() => res.json({ msg: 'Email sent, please check your inbox to verify it!' }))
			.catch((err) => console.log(err));

		if (emailExists && !emailExists.confirmed) {
			await sendEmail(emailExists.email, emailTemplate.confirm(emailExists._id)).then(() =>
				res.json({ msg: 'An email message was resent to you!' })
			);
		}
	} catch (error) {
		console.log(error);
	}
});

//login
router.post('/login', async (req, res) => {
	const { error } = schema.loginValidate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const user = await User.findOne({
		username: req.body.username,
	});

	if (!user) return res.status(400).send('Username or password wrong!');

	const validPassword = await bcrypt.compare(req.body.password, user.password);
	if (!validPassword) return res.status(400).send('Invalid Password!');

	//Check if the suer has confirmed his email!
	//    if(!user.confirmed){
	//        res.status(400).send('Please confirm your email first!');
	//    }

	const accessToken = generateAccessToken(user);
	const refreshToken = generateRefreshToken(user);
	user.refreshtokens = refreshTokens;
	user.refreshtokens.push(refreshToken);

	res.cookie('jwt', accessToken, { secure: false, httpOnly: false });
	console.log('fav ' + user.favorites);

	res.send({
		token: accessToken,
		refreshToken: refreshToken,
		user: user,
		role: user.role,
		favorites: user.favorites,
	});
});

//Get the new token from the generated refresh token
router.post('/token', async (req, res) => {
	const refreshToken = req.body.token;
	if (refreshToken == null) return res.sendStatus(401);
	if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
	jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
		if (err) return res.sendStatus(403);
		const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);

		res.cookie('jwt', accessToken, { secure: false, httpOnly: false });

		res.json({ accessToken: accessToken });
	});
});

//Get one user by id
router.get('/:userId', async (req, res) => {
	try {
		const id = req.params.userId;
		const user = await User.findOne({ _id: id }).populate('courses');
		console.log('users  ' + user);
		res.json(user);
	} catch (error) {
		console.error(error);
	}
});

//Delete a user by id
router.delete('/:userId', asyncHandler( async (req, res) => {
  const id = req.params.userId
  
    const deletedUser = await User.deleteOne({
      _id: id,
    })
    if(deletedUser.deletedCount == 0) {
      res.status(404)
      throw new Error("Course not found")
    }
    console.log(deletedUser)
    res.status(200).json('User deleted' + deletedUser)
}))


router.put('/:userId', asyncHandler(async (req,res) => {
    const id = req.params.userId;
    const user = await User.findOne({_id:id})

    const emailExists = await User.findOne({
      email: req.body.email,
    })
    if (emailExists) {
      if(req.body.email !== user.email) {
        res.status(400)
        throw new Error("Email already exists!")
      }
    }
    //Check if username exists
    const usernameExists = await User.findOne({
      username: req.body.username,
    })
    if (usernameExists) {
      if(req.body.username !== user.username) {
        res.status(400)
        throw new Error("Username already exists!")
      }
    }

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

router.put('/:uId/newPassword', verify, async (req, res) => {
	const { uId } = req.params;
	const newPassword = req.body.newPassword;
  const user = req.user;
  
	const validPassword = await bcrypt.compare(req.body.currentPassword, user.password);
	if (!validPassword) return res.status(400).send('Invalid Password!');

	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(newPassword, salt);

	User.findByIdAndUpdate({ _id: uId }, { $set: { password: hashedPassword } }, { new: true }, function (err, doc) {
		if (err) {
			console.log(err);
			return res.send({
				success: false,
				message: 'Error somewhere!',
			});
		}
		return res.send({
			success: true,
			newUser: generateAccessToken(doc),
			message: 'Password changed!',
		});
	});

});

//Get all the user's courses
router.get('/courses/:uId', async(req, res) => {
	const {uId} = req.params;
	
	User.findById(uId).populate('courses')
	.then(admin => {
		res.json({courses: admin.courses})
	}).catch(error => console.log(error));
});


module.exports = router;

const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const Course = require('../models/Course');
const User = require('../models/User');
const { verify } = require('../middleware/authToken');
const { authorize } = require('../middleware/authorize');
const uploadMulter = require('../middleware/upload.js');
const uploadvalidation = require('../middleware/Uploadvalidation.js');
const fs = require('fs');

// find all courses
// router.get('/', asyncHandler(async (req, res) => {
//     const courses = await Course.find().populate('users');
//     res.header('Content-Range', `course 0-2/${courses.length}`)
//     res.json(courses);
// }));

//Authenticate (add the middleware verify) before you get all the courses
router.get(
	'/',
	asyncHandler(async (req, res) => {
		const courses = await Course.find().populate('users');
		res.send(courses);
	})
);

//Get all the courses but not populating the users field
router.get(
	'/getAll',
	asyncHandler(async (req, res) => {
		const courses = await Course.find()
        res.send(courses);
	})
);


//find course by id
router.get(
	'/:id',
	asyncHandler(async (req, res) => {
		const { id } = req.params;
		const course = await Course.findById(id).populate('feedback.user', 'name surname');
		if (course) {
			res.send(course);
		} else {
			res.status(404);
			throw new Error('Course not found');
		}
	})
);

//find course by category
router.get(
	'/cat/:category',
	asyncHandler(async (req, res) => {
		const category = req.params.category;
		const courses = await Course.find({
			category: {
				$in: [category],
			},
		});
		if (courses) {
			res.json(courses);
		} else {
			res.status(404);
			throw new Error('No course with such category found');
		}
	})
);

//find course by tags
router.get(
	'/tag/:tags',
	asyncHandler(async (req, res) => {
		const tag = req.params.tags;
		const courses = await Course.find({
			tags: {
				$in: [tag],
			},
		});
		if (courses) {
			res.json(courses);
		} else {
			res.status(404);
			throw new Error('No course with such tag found');
		}
	})
);

//Create a new course
createCourse = async (req, res) => {
	let name = req.body.name;
	let description = req.body.description;
	let price = req.body.price;
	let category = req.body.category;
	let tags = req.body.tags;
	let image = req.file.path;
	let instructor = req.body.instructor
	console.log(name, image);
	const course = await new Course({
		name: name,
		description: description,
		price: price,
		category,
		tags,
		image: image,
		_instructor:instructor
	});

	const profa = await User.findById(instructor)

	profa.courses.push(course._id)
	await profa.save();


	course.save((err, course) => {
		if (err) {
			console.log(err);
			return res.status(400).json({
				errors: err.meesage,
			});
		}
		return res.json({
			message: 'Created course successfully',
			course,
		});
	});

	
};
router.post('/newCourse', uploadMulter, uploadvalidation, createCourse);

//Update a course by id
router.put(
	'/:courseId',
	asyncHandler(async (req, res) => {
		const id = req.params.courseId;
		if (req.body.users) {
		}
		const updated = await Course.findByIdAndUpdate(id, req.body);
		res.json(updated);
	})
);

//Delete by id
router.delete(
	'/:courseId',
	asyncHandler(async (req, res) => {
		const id = req.params.courseId;
		const deletedUser = await Course.findByIdAndDelete(id);
		res.send(deletedUser);
	})
);

router.post(
	'/:id/addUser',
	asyncHandler(async (req, res) => {
		const course = await Course.findById(req.params.id);

		if (course) {
			const alreadyEnrolled = course.users.find((u) => u.toString() === req.body._id.toString());
			if (alreadyEnrolled) {
				res.status(400);
				throw new Error('Already enrolled');
			}

			course.users.push(req.body._id);
			await course.save();
			res.status(201).json({ message: 'Enrolled Successfully!' });
		} else {
			res.status(404);
			throw new Error('Course not found');
		}
	})
);

router.post(
	'/:id/addReview',
	asyncHandler(async (req, res) => {
		const course = await Course.findById(req.params.id);

		if (course) {
			const alreadyReviewed = course.feedback.find((u) => u.user.toString() === req.body.user.toString());
			if (alreadyReviewed) {
				res.status(400);
				throw new Error("You've already left a feedback!");
			}

			console.log(req.body.comment);
			const feedback = {
				user: req.body.user,
				comment: req.body.comment,
			};

			course.feedback.push(feedback);
			await course.save();
			res.status(201).json({ message: 'Feedback left successfully!' });
		} else {
			res.status(404);
			throw new Error('Course not found');
		}
	})
);

router.post(
	'/:id/addVideos',
	asyncHandler(async (req, res) => {
		const course = await Course.findById(req.params.id);
		if (course) {
			course.videos.push(...req.body.videos);
			await course.save();
			res.status(201).json({ message: 'Courses added successfully' });
		} else {
			res.status(404);
			throw new Error('Course not found');
		}
	})
);

router.put(
	'/:id/deleteVideo',
	asyncHandler(async (req, res) => {
		console.log(req.body);
		const course = await Course.findById(req.params.id);
		if (course) {
			const index = course.videos.indexOf(JSON.parse(req.body.video));
			if (index > -1) {
				course.videos.splice(index, 1);
			} else {
				res.status(404);
				throw new Error('Video not found');
			}
			await course.save();

			if(fs.existsSync(`./${JSON.parse(req.body.video)}`)) {

				fs.unlink(`./${JSON.parse(req.body.video)}`, (err) => {
					if (err) {
						throw new Error(err);
					}
				});
			}

			res.status(201).json({ message: 'Video deleted' });
		} else {
			res.status(404);
			throw new Error('Course not found');
		}
	})
);

router.post('/new', async (req, res) => {
	try {
		const newCourse = await new Course({
			name: req.body.name,
			description: req.body.description,
			price: req.body.price,
			image: req.body.image,
			category: req.body.category,			
		});

		const co = await newCourse.save();
		res.send(co);
		console.log(co);
	} catch (err) {
		console.log(err);
	}
});

//Get all the courses in which user is enrolled
router.get('/enrolled/:userId', async (req, res) => {
	const { userId } = req.params;

	try {
		const enrolled = await Course.find({ users: { $in: userId } }).populate('_instructor');
		res.send({
			message: 'Courses user is enrolled',
			courses: enrolled,      
		});
	} catch (err) {
		console.log({
			error: err,
		});
	}
});


module.exports = router;
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listCourseDetails, updateCourse } from '../../redux/actions/courseActions';
import './courseView.css';

const CourseEditView = ({ match }) => {
	const courseId = match.params.id;

	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState(0);
	const [category, setCategory] = useState('');

	const dispatch = useDispatch();
	const courseDetails = useSelector((state) => state.courseDetails);
	const { course } = courseDetails;

	const courseUpdate = useSelector((state) => state.courseUpdate);
	const { success: courseUpdateSuccess } = courseUpdate;

	useEffect(() => {
		if (!course.name || course._id !== courseId) {
			dispatch(listCourseDetails(courseId));
		} else {
			setName(course.name);
			setDescription(course.description);
			setPrice(course.price);
			setCategory(course.category);
		}
	}, [dispatch, course, courseId]);

	const submitHandler = (e) => {
		e.preventDefault();

		dispatch(
			updateCourse({
				_id: courseId,
				name,
				description,
				price,
				category,
			})
		);
	};

	return (
		<>
			<div className="d-flex justify-content-between">
				<Link to="/admins/courses" className="btn btn-dark btn-sm my-3 mx-5">
					Go Back
				</Link>
				<Link to={`/admins/course/${courseId}/videos`} className="btn btn-dark btn-sm my-3 mx-5">
					Edit videos
				</Link>
			</div>
			<Form onSubmit={submitHandler} className="my-4 px-5">
				{courseUpdateSuccess ? <Alert variant="success">Course updated successfully</Alert> : null}
				<Form.Group controlId="name">
					<Form.Label>Name</Form.Label>
					<Form.Control
						size="sm"
						type="name"
						placeholder="Course name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Form.Group controlId="description">
					<Form.Label>Description</Form.Label>
					<Form.Control
						size="sm"
						as="textarea"
						rows="4"
						placeholder="Description"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Form.Group controlId="price">
					<Form.Label>Price</Form.Label>
					<Form.Control
						size="sm"
						type="number"
						placeholder=""
						value={price}
						onChange={(e) => setPrice(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Form.Group controlId="category">
					<Form.Label>Category</Form.Label>
					<Form.Control
						size="sm"
						type="name"
						placeholder="Category"
						value={category}
						onChange={(e) => setCategory(e.target.value)}
					></Form.Control>
				</Form.Group>
				<Button type="submit" variant="primary">
					Submit
				</Button>
			</Form>
		</>
	);
};

export default CourseEditView;

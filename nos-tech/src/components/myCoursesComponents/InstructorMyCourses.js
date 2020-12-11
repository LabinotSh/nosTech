import React, { useEffect, useState } from 'react';
import Panel from '../panel/Panel';
import './Instructor.css';
import { connect, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getAdminCourses } from '../../redux/actions/courses';

const InstructorCourse = ({ courses, user }) => {
	const [courseList, setCourseList] = useState(['']);
	const dispatch = useDispatch();

	const fetchCourse = () => {
		if (user) {
			dispatch(getAdminCourses(user._id));
		}
	};

	useEffect(() => {
		fetchCourse();
	}, []);

	useEffect(() => {
		if (courses) {
			setCourseList(courses);
		}
	}, [courses]);

	return (
		<>
			<Panel />
			<div className="container">
				<div className=" row row-cols-1 row-cols-md-3">
					{courseList.map((item) => {
						return (
							<div key={item} className="col my-5">
								<div className="card h-100">
									<img
										src={item.image}
										className="img-fluid card-img-top courseInstructor-img"
										alt="..."
									/>
									<div className="card-body">
										<h6 className="card-title courseInstructor-title">{item.name}</h6>
										<p className="card-text courseInstructor-desc">{item.description}</p>
									</div>
									<div className="card-footer mt-2 courseInstructor-footer">
										<div className="d-flex justify-content-between">
											<strong style={{ fontSize: '18px', marginTop: '6px' }}>
												<i className="fa fa-eur" /> {item.price}
											</strong>
										</div>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
};

const mapStateToProps = (state) => ({
	user: state.login.user,
	courses: state.adminCourses.courses,
});

export default connect(mapStateToProps, {getAdminCourses})(withRouter(InstructorCourse));

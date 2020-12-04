import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';
import { listCourses, approveCourse, refuseCourse } from '../../redux/actions/courseActions';
import { useDispatch, useSelector } from 'react-redux';
import './courseView.css';
import Panel from '../../components/panel/Panel';
import Pagination from '../../components/pagination/Pagination';

const CourseReview = ({ history }) => {
	const dispatch = useDispatch();

	const courseList = useSelector((state) => state.courseList);
	const { courses } = courseList;

	//Aprove the course
	const courseApprove = useSelector((state) => state.courseApprove);
	const { success: courseApproveSuccess } = courseApprove;

	//Refuse the course
	const courseRefuse = useSelector((state) => state.courseRefuse);
	const { success: courseRefuseSuccess } = courseRefuse;

	const user = localStorage.getItem('user');
	const [currentPage, setCurrentPage] = useState(1);
	const [postsPerPage] = useState(10);

	//Pagination
	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	const currentPosts = courses.slice(indexOfFirstPost, indexOfLastPost);

	// Change page
	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	useEffect(() => {
		dispatch(listCourses());
		console.log('testttt');
	}, [courseApproveSuccess, courseRefuseSuccess, dispatch]);

	const approveHandler = (id) => {
		if (window.confirm('Do you want to approve this course?')) {
			dispatch(approveCourse(id));
		}
	};

	const refuseHandler = (id) => {
		if (window.confirm('Do you want to refuse this course?')) {
			dispatch(refuseCourse(id));
		}
	};

	return (
		<>
			<Panel />
			<div className="smaller">
				<Table striped bordered hover size="sm">
					<thead>
						<tr>
							<th>ID</th>
							<th>NAME</th>
							<th>DESCRIPTION</th>
							<th>PRICE</th>
							<th>CATEGORY</th>
							<th>CONTENT</th>
							<th>STATUS</th>
							<th>APROVE</th>
							<th>REFUSE</th>
						</tr>
					</thead>
					<tbody>
						{currentPosts.map((course) => (
							<tr key={course._id}>
								<td>{course._id}</td>
								<td>{course.name}</td>
								<td className="courses-table-dsc">{course.description}</td>
								<td>{course.price}</td>
								<td className="courses-table-dsc">{course.category}</td>
								<td>
									<Link to={`/admins/content-review/${course._id}`}>
										<i className="pl-3 fas fa-laptop-code course-review-icon" />
									</Link>
								</td>
								<td>
									{course.status === 0 ? (
										<span className="text-warning">Onhold</span>
									) : course.status === 1 ? (
										<span className="text-success">Aproved</span>
									) : (
										<span className="text-danger">Refused</span>
									)}
								</td>
								<td>
									{course.status === 0 ? (
										<i
											onClick={() => approveHandler(course._id)}
											style={{ paddingLeft: '23px' }}
											className="fa fa-check-circle category-edit"
										/>
									) : (
										<button style={{ border: 'none' }} disabled>
											<i style={{ paddingLeft: '17px' }} className="fa fa-check-circle" />
										</button>
									)}
								</td>
								<td>
									{course.status === 0 ? (
										<i
											onClick={() => refuseHandler(course._id)}
											style={{ paddingLeft: '23px' }}
											className="fa fa-ban category-trash"
										/>
									) : (
										<button style={{ border: 'none' }} disabled>
											<i style={{ paddingLeft: '17px' }} className="fa fa-ban" />
										</button>
									)}
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			</div>
			<div className="d-flex justify-content-center">
				<Pagination postsPerPage={postsPerPage} totalPosts={courses.length} paginate={paginate} />
			</div>
		</>
	);
};

export default CourseReview;

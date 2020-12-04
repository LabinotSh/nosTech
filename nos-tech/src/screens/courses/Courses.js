import React, { useState, useEffect, useRef } from 'react';
import './courses.css';
import Carousel from '../../components/carousel/Carousel';
import { connect, useDispatch } from 'react-redux';
import { fetchAllCourses } from '../../redux/actions/courses';
import { withRouter } from 'react-router-dom';
import responsive from '../../constants/carouselResponsive';
import Banner from '../../components/banner/CourseBanner';
import Loader from '../../components/icons/Loader';
import CourseItem from './CourseItem';
import CourseContent from '../../components/courseComponents/courseContent';

const Courses = ({ list, pending, err }) => {
	const dispatch = useDispatch();

	const isRendered = useRef('false');
	const [listCourses, setCourses] = useState([]);

	const retrieveCourses = () => {
		isRendered.current = true;
		dispatch(fetchAllCourses())
			.then((response) => {
				if (isRendered) {
					setCourses(response.filter(x => x.status == 1).reverse().slice(0, 10));
					console.log('COURSES: ' + JSON.stringify(response));
				}
			})
			.catch((e) => {
				console.error('Error: ' + e);
			});
	};

	//Load courses on render
	useEffect(() => {
		retrieveCourses();
		return () => {
      isRendered.current = false;
		};
	}, []);

	const CourseCarousel = (props) => {
		if (!listCourses.length) return <div className="unmatch text-center">There is no courses!</div>;
		return listCourses.map((course) => {
			return <CourseItem course={course} key={course._id} />;
		});
	};

	if (pending) return <Loader />;
	return (
		<div>
			<Banner />
			<div className="container-fluid top-content">
				<div className="row no-gutters pb-4">
					<div className="col-sm-4"></div>
					<div className="col-sm-4 text-center">
						<p className="courses-headline">Courses we offer!</p>
						<hr />
					</div>
				</div>
				<Carousel responsive={responsive} paddingLeft={50} disableDotsControls={true}>
					{CourseCarousel()}
				</Carousel>
				<hr></hr>
			</div>
				<div className="middle-content">
					<CourseContent  />;
				</div>			
		</div>
	);
};

const mapStateToProps = (state) => ({
	loggedIn: state.login.isLoggedIn,
	pending: state.courses.pending,
	list: state.courses.courses,
});

export default connect(mapStateToProps, { fetchAllCourses })(withRouter(Courses));
import React, { useState, useEffect, useRef } from 'react';
import './courses.css';
import Carousel from '../../components/carousel/Carousel';
import { connect, useDispatch } from 'react-redux';
import { fetchAllCourses } from '../../redux/actions/courses';
import { withRouter } from 'react-router-dom';
import responsive from '../../constants/carouselResponsive';
import Banner from '../../components/banner/CourseBanner';
import Loader from '../../components/icons/Loader';
import SearchBar from '../../components/searchBar/searchBar';
import CourseItem from './CourseItem';

const Courses = ({ list, pending, err }) => {
	const dispatch = useDispatch();

	const isRendered = useRef('false');

	const [listCourses, setCourses] = useState([]);
	const [filterText, setFilterText] = useState('');

	const [displayMessage, setDisplayMessage] = useState('');

	const handleChange = (e) => {
		setFilterText(e.target.value);
	};

	const retrieveCourses = () => {
		isRendered.current = true;
		dispatch(fetchAllCourses())
			.then((response) => {
				if (isRendered) {
					setCourses(response);
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
      pending = false;
		};
	}, []);

	//Make the search appear after 1 seconds and not immediately as the user is typing
	useEffect(() => {
		const timeOutId = setTimeout(() => setDisplayMessage(filterText), 1000);
		return () => clearTimeout(timeOutId);
	}, [filterText]);

	const results = !displayMessage
		? listCourses
		: listCourses.filter((course) => course.name.toLowerCase().includes(displayMessage.toLocaleLowerCase()));

	const CourseCarousel = (props) => {
		if (!results.length) return <div className="unmatch text-center">There is no matching searches!</div>;

		return results.map((course) => {
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
					<div className="col-sm-4 text-center">
						<SearchBar input={filterText} onChange={handleChange} />
					</div>
				</div>
				<Carousel responsive={responsive} paddingLeft={50} disableDotsControls={true}>
					{CourseCarousel()}
				</Carousel>
				<hr></hr>
			</div>
			<div className="middle-content">
				<p className="courses-headline">Recent NosTech Courses</p>
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
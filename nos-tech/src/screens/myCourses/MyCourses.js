import React, { useState, useEffect, useRef } from 'react';
import './myCourses.css';
import axios from 'axios';
import MyCoursesBanner from '../../components/banner/MyCoursesBanner';
import jwt_decode from 'jwt-decode';
import { API_URL } from '../../constants/Constants';
import { connect, useDispatch } from 'react-redux';
import { fetchAllCourses, getEnrolledCourses } from '../../redux/actions/courses';
import Enrolled from '../../components/myCoursesComponents/Enrolled';
import Favorites from '../../components/myCoursesComponents/Favorites';
import TabEnrolled from '../../components/myCoursesComponents/TabEnrolled';
import TabFavs from '../../components/myCoursesComponents/TabFavs';

const MyCourses = () => {
	const [courses, setCourses] = useState([]);
	const [enrolled, setEnrolled] = useState([]);
	const [about, setAbout] = useState(true);
	const [favList, setFavList] = useState([]);

	const isRendered = useRef('false');

	const token = localStorage.getItem('user');
	const user = jwt_decode(token);

	const dispatch = useDispatch();

	// const retrieveCourses = () => {
	// 	isRendered.current = true;
	// 	dispatch(fetchAllCourses())
	// 		.then((response) => {
	// 			if (isRendered) {
	// 				setCourses(response);
	// 				console.log('COURSES: ' + JSON.stringify(response));
	// 			}
	// 		})
	// 		.catch((e) => {
	// 			console.error('Error: ' + e);
	// 		});
	// };

	const getEnrolledCo = (userId) => {
		isRendered.current = true;
		dispatch(getEnrolledCourses(userId))
		.then((response) => {
			console.log('enrolled ' + JSON.stringify(response.courses));
			if(isRendered){
				setEnrolled(response.courses)
			}
		})
		.catch((err) => {
			console.log('Err ' + err);
		})
	}

	const getFav = (userId) => {
		isRendered.current = true;
		axios
			.get(`${API_URL}/favorites/${userId}/getAll`)
			.then((res) => {
				if (isRendered) {
					console.log('fav ' + JSON.stringify(res.data));
					setFavList(res.data.favs);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		//retrieveCourses();
		getFav(user._id);
		getEnrolledCo(user._id);
	}, []);

	return (
		<>
			<div>
				<MyCoursesBanner />			
			</div>
			<div className="main-cont">
				<ul className="cs-nav">
					<li className="li-col" onClick={() => setAbout(true)}>
						<TabEnrolled about={about} />
					</li>
					<li className="li-col" onClick={() => setAbout(false)}>
						<TabFavs about={about} />
					</li>
				</ul>
				<hr className="text-center" />
			</div>
			{about ? (
				<div id="abo" className="cont abo">
					{!enrolled.length && (
						<div className="container-fluid mt-4 bg-light-gray">
							<div className="row">
								<div className="col-sm-12">
									<div className="text-info text-center nofav">
										The list is empty! <br /> You have not enrolled in any course yet!
									</div>
								</div>
							</div>
						</div>
					)}
					{enrolled &&
						enrolled.map((course) => {
							return <Enrolled course={course} key={course._id} />;
						})}
				</div>
			) : (
				<div className="cont fav bg-light">
					{!favList.length && (
						<div className="container-fluid mt-4 bg-light-gray">
							<div className="row">
								<div className="col-sm-12">
									<div className="text-danger text-center nofav">
										The list is empty! <br /> You have not added any favorites yet!
									</div>
								</div>
							</div>
						</div>
					)}
					{favList &&
						favList.map((favorite) => {
							return <Favorites favorite={favorite} key={favorite._id} />;
						})}
				</div>
			)}
		</>
	);
};

export default connect(null, {getEnrolledCourses})(MyCourses);

import React, { useState, useEffect, useRef } from 'react';
import './myCourses.css';
import axios from 'axios';
import MyCoursesBanner from '../../components/banner/MyCoursesBanner';
import jwt_decode from 'jwt-decode';
import { API_URL } from '../../constants/Constants';
import { useDispatch } from 'react-redux';
import { fetchAllCourses } from '../../redux/actions/courses';
import Enrolled from '../../components/myCoursesComponents/Enrolled';
import Favorites from '../../components/myCoursesComponents/Favorites';
import TabEnrolled from '../../components/myCoursesComponents/TabEnrolled';
import TabFavs from '../../components/myCoursesComponents/TabFavs';

const MyCourses = () => {
	const [courses, setCourses] = useState([]);
	const [video, setVideo] = useState('spinner.gif');
	const [about, setAbout] = useState(true);
	const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('userFav')));
	const [favList, setFavList] = useState([]);

	const isRendered = useRef('false');

	const token = localStorage.getItem('user');
	const user = jwt_decode(token);

	const dispatch = useDispatch();

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

	const getFav = (userId) => {
		axios
			.get(`${API_URL}/favorites/${userId}/getAll`)
			.then((res) => {
				console.log('fav ' + JSON.stringify(res.data));
				setFavList(res.data.favs);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		retrieveCourses();
		getFav(user._id);
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
				<div id="abo" className="cont abo" style={{ marginBottom: '150px' }}>
					{courses &&
						courses.map((course) => {
							return <Enrolled course={course} key={course._id} />;
						})}
				</div>
			) : (
				<div className="cont fav bg-light" id="2" style={{ marginBottom: '150px' }}>
					{favList &&
						favList.map((favorite) => {
							return <Favorites favorite={favorite} key={favorite._id} />;
						})}
				</div>
			)}
		</>
	);
};

export default MyCourses;
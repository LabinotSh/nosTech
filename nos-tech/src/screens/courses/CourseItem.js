import React, { useState, useEffect, useRef } from 'react';
import { HeartFull, HeartEmpty } from '../../components/icons/Heart';
import { LinkContainer } from 'react-router-bootstrap';
import { addToFavorites, removeFromFavorites } from '../../redux/actions/courses';
import { connect, useDispatch, useSelector } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import { history } from '../../helpers/history';
import jwt_decode from 'jwt-decode';
import { withRouter } from 'react-router-dom';

const CourseItem = (props) => {
	const dispatch = useDispatch();

	const [errors, setErrors] = useState(null);
	const [user, setUser] = useState({});
	const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('userFav')));
	const [selected, setSelected] = useState({
		removed: false,
		id: props.course._id,
	});
	const { removed } = selected;

	const isRendered = useRef('false');

	const setRoute = (id) => {
		// isRendered.current = true
		const timeOutId = setTimeout(() => {
			isRendered && localStorage.getItem('user') ? history.push(`course/${id}`) : history.push('/login');
			//window.location.reload();
		}, 700);
		return () => {
			isRendered.current = true;
			clearTimeout(timeOutId);
		};
	};

	useEffect(() => {
		try {
			const token = localStorage.getItem('user');
			if (token) {
				const useri = jwt_decode(token);
				setUser(useri);
			}
		} catch (e) {
			console.log(e);
		}
	}, []);

	const deleteLocal = (courseId) => {
		let favs = JSON.parse(localStorage.getItem('userFav'));
		let array = [...favs];
		let favList = [];

		const filt = array.filter((item) => item !== courseId);
		favList = [...filt];
		localStorage.setItem('userFav', JSON.stringify(favList));
		setFavorites(JSON.parse(localStorage.getItem('userFav')));
	};

	return (
		<div className="card courses-card" key={props.course._id}>
			<ReactTooltip place="top" backgroundColor={'#fc4563'} type="success" effect="solid" />
			<LinkContainer to={`course/${props.course._id}`}>
				<img src={props.course.image} className="card-img-top courseImg" alt="..." />
			</LinkContainer>
			<div>
				<h6 className="card-title courses-title">{props.course.name}</h6>
				<p className="card-text courses-desc">{props.course.description}</p>
				<div className="courses-footer">
					<strong style={{ fontSize: '18px', marginTop: '6px' }}>
						<i className="fa fa-eur" /> {props.course.price}
					</strong>
					<div className="justify-content-center">
						{localStorage.getItem('user') && (
							<>
								<span
									className="hover"
									data-tip={
										removed || favorites.find((item) => item === props.course._id)
											? 'Remove from favorites'
											: 'Add to favorites'
									}
								>
									{removed || favorites.find((item) => item === props.course._id) ? (
										<HeartFull
											onClick={() => {
												deleteLocal(props.course._id);
												setSelected({ ...selected, id: props.course._id, removed: false });
												dispatch(removeFromFavorites(user._id, props.course)).then((res) => {
													console.log('ID ' + user);
													setErrors(res.msg);
												});
											}}
										/>
									) : (
										<HeartEmpty
											onClick={() => {
												setSelected({ ...selected, id: props.course._id, removed: true });
												dispatch(addToFavorites(user._id, props.course)).then((res) => {
													console.log('DAt ' + JSON.stringify(res));
													setErrors(res.msg);
												});
											}}
										/>
									)}
								</span>
							</>
						)}
						<button
							className="btn btn-default buy"
							type="submit"
							onClick={() => {
								setRoute(props.course._id);
							}}
						>
							Enroll
						</button>
					</div>
				</div>
				{errors && <div className="text-center p-1 alert-danger">{errors}</div>}
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	error: state.favorites.error,
});

export default connect(mapStateToProps, { addToFavorites, removeFromFavorites })(withRouter(CourseItem));

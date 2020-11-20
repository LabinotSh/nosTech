import React, { Component, useState, useEffect, useRef } from 'react';
import { HeartFull, HeartEmpty } from '../../components/icons/Heart';
import { LinkContainer } from 'react-router-bootstrap';
import { addToFavorites, removeFromFavorites } from '../../redux/actions/courses';
import { connect, useDispatch, useSelector } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import { history } from '../../helpers/history';
import jwt_decode from 'jwt-decode';
import { withRouter } from 'react-router-dom';
import store from '../../store';
import { faVest } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { API_URL } from '../../constants/Constants';

const CourseItem = (props) => {
    const dispatch = useDispatch();

    // const userFav = JSON.parse(localStorage.getItem('userFav'));
    

    const [errors, setErrors] = useState(null);
    const [user, setUser] = useState({});
    const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('userFav')));
    //const state = [];
    const fav = []; 
	const [selected, setSelected] = useState({
		removed: false,
		id: props.course._id,
	});
    const { removed } = selected;

    const isRendered = useRef('false');

    const setRoute = (id) => {
        // isRendered.current = true
        const timeOutId = setTimeout(() => {
            
             isRendered && localStorage.getItem('user')
            ? history.push(`course/${id}`) 
            : history.push('/login')

            window.location.reload();
        },700);
        return () => {
            clearTimeout(timeOutId)
            isRendered.current=true  };
    }

	useEffect(() => {
		try {
            const token = localStorage.getItem('user');
            
            
            // const us = localStorage.getItem('us');
			if (token) {
				const useri = jwt_decode(token);
                setUser(useri); 
                console.log('id ' + user._id) 
            }

            fav = [...favorites]
          
		} catch (e) {
			console.log(e);
		}
    }, []);

    // useEffect(() => {

    //     if(favorites !== undefined){
    //     localStorage.setItem('userFav', JSON.stringify(favorites))
    //     console.log('HAHA ' + favorites);
    //     }
    // },[favorites])

    const check = (courseId) => {
        if(localStorage.getItem('userFav')){
            const fav = JSON.parse(localStorage.getItem('userFav'));
            if(fav.includes(courseId)) return true
            else return false
        // return fav.find(id => id !== courseId)
        }
        // else{
        //     return false;
        // }
    }

    const onRemoveItem = i => {
        if(fav.includes(i)){
        //   const list = fav.slice();
        //   list.pop(i);
          const removeFav = fav.filter(item => item !== i)
        //   list.splice(i, 1);
        //   const list = fav.filter()
          localStorage.setItem('userFav', JSON.stringify(removeFav));
        }
    }

    const onAdd = i => {
        if(!fav.includes(i)){
        const list = fav.concat(i);
        // const list = [...fav, i]
        console.log('user ' + localStorage.userFav)
        localStorage.setItem('userFav', JSON.stringify(list))
        
        }else{
         const list = fav.slice();
         localStorage.setItem('userFav', JSON.stringify(list));
        }
    }

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
                                        removed
                                        //check(props.course_id)
                                        //favorites.find(item => item !== props.course._id)
                                         ? 'Remove from favorites' : 'Add to favorites'}
								>
                                    {
                                    // favorites.find(id => id !== props.course._id)
                                    //localStorage.getItem('userFav').find(id => id !== props.course._id)
                                    removed 
                                    //check(props.course_id)
                                     
                                    ? (
											<HeartFull
												onClick={() => {
                                                    setSelected({ ...selected, id: props.course._id, removed: false });
                                                    setFavorites()
                                                    dispatch(removeFromFavorites(user._id, props.course))
                                                    .then(res => {
                                                        // if(favorites !== null){
                                                            //setFavorites(favorites => favorites.filter(item => item !== res.favoriteCourse))
                                                            // setFavorites(fav.filter(id => id !== res.favoriteCourse));
                                                        //}
                                                        // if(fav.includes(res.favoriteCourse)){
                                                        //     //setFavorites(fav.filter(id => id !== res.favoriteCourse));
                                                        //         fav.pop(res.favoriteCourse)
                                                        //         setFavorites(fav)
                                                        // }
                                                        onRemoveItem(res.favoriteCourse);
                                                            console.log('ID ' + user)
                                                
                                                        //}
                                                    });
												}}
											/>
									) : (
											<HeartEmpty
												onClick={() => {
													setSelected({ ...selected, id: props.course._id, removed: true });
                                                    dispatch(addToFavorites(user._id, props.course))
                                                    .then(res => {
                                                        console.log('DAt ' + JSON.stringify(res));
                                                        // setTheArray(oldArray => [...oldArray, `Entry ${oldArray.length}`]);
                                                        // if (fav.includes(res.favoriteCourse)) {
                                                            //setFavorites(oldState => [...oldState, res.favoriteCourse]);
                                                            //  fav.push(res.favoriteCourse);
                                                            //  setFavorites(fav);
                                                            //
                                                            onAdd(res.favoriteCourse) 
                                                        //localStorage.setItem('userFav', JSON.stringify(favorites))
                                                        // }
                                                    
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

const mapStateToProps = state => ({
    error: state.favorites.error
});
  

export default connect(mapStateToProps, null)(withRouter(CourseItem));
import React, {useState, useEffect, useLayoutEffect} from 'react'
import './courses.css'
import Carousel from '../../components/carousel/Carousel';
import {connect, useDispatch} from 'react-redux';
import {fetchAllCourses} from '../../redux/actions/courses';
import {withRouter} from 'react-router-dom';
import responsive from '../../constants/carouselResponsive';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import Banner from '../../components/banner/CourseBanner';
import ReactTooltip from "react-tooltip";
import {Card} from 'react-bootstrap';
import { icon } from '@fortawesome/fontawesome-svg-core';




const Courses = ({list}) => {

    const dispatch = useDispatch();
    const [courses, setCourses] = useState([]);

    const [favorite, setFavorite] = useState(false);

    const retrieveCourses = () => {
        dispatch(fetchAllCourses()).then(response =>{
            setCourses(response.courses);
            console.log('COURSES: ' + JSON.stringify(response));
        }).catch(e => {
            console.error('Error: ' + e);
        })      
    };

    //Load courses on render
    useEffect(() => {
        retrieveCourses();
    },[]);

   
    const CourseCarousel = () =>{
        
        return courses.map(course => {
          return (
            <div className="card courses-card" key={course._id} >
            <ReactTooltip place="top" backgroundColor={'#fc4563'} type="success" effect="solid"/>
            <img src={course.image} className="card-img-top courseImg" alt="..."/>
            <div>
        
                <h6 className="card-title courses-title">{course.name}</h6>
                <p className="card-text courses-desc">{course.description}</p>
                <div className="courses-footer">
                
                 <strong style={{fontSize:"18px", marginTop:'6px'}}><i className="fa fa-eur"/>  {course.price}</strong>
                {/* <button className="btn btn-sm btn-outline-dark float-left">{course.category}</button> */}
                 
                 <div className="justify-content-center">
                 <span class="hover" data-tip={favorite ? 'Remove from favorites' : 'Add to favorites'}>
                 <FontAwesomeIcon 
                 icon={ favorite ? faHeart : farHeart } 
                 size='2x' 
                 color={'#fc4563'}
                 style={{ marginRight: '5px', marginTop:'3px'}}
                //  onFocus={() => }
                 onClick={() => setFavorite(!favorite)} />
                 </span>
                 {/* <button className="btn btn-outline-success float-left" type="submit" style={{marginRight:'2px'}}>Buy now</button>  */}
                 
                <button className="btn btn btn-outline-success buy" type="submit" 
                 >Buy now</button>
                </div>
                </div>
            </div>
            </div>



          )
      })
    }

    return (

        <div>
            <Banner />
            <div className="top-content">
            <p className="courses-headline">Courses we offer!</p>
            <Carousel
                responsive={responsive}
                paddingLeft = {50}
                disableDotsControls={true}
            >
            {CourseCarousel()}
            </Carousel>
            <hr></hr>
            </div>
            <div className="middle-content">
            <p className="courses-headline">Recent NosTech Courses</p>
            </div>

        </div>
    )
}

function mapStateToProps(state) {
    return {
        list: state.courses.courses
    }
}

export default connect(mapStateToProps, {fetchAllCourses})(withRouter(Courses));

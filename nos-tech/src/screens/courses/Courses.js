import React, {useState, useEffect} from 'react'
import './courses.css'
import Carousel from '../../components/carousel/Carousel';
import {connect, useDispatch} from 'react-redux';
import {fetchAllCourses} from '../../redux/actions/courses';
import {withRouter} from 'react-router-dom';
import responsive from '../../constants/carouselResponsive';
import Banner from '../../components/banner/CourseBanner'


const Courses = ({list}) => {

    const dispatch = useDispatch();
    const [courses, setCourses] = useState([]);

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
    }, []);

    const CourseCarousel = () =>{
        
        return courses.map(course => {
          return (
            <div className="card courses-card" key={course._id} >
            <img src={course.image} className="card-img-top courseImg" alt="..."/>
            <div >
                <h6 className="card-title courses-title">{course.name}</h6>
                <p className="card-text courses-desc">{course.description}</p>
                <div className="courses-footer">
                <button className="btn btn-sm btn-outline-dark float-left">{course.category}</button>
                <span className="float-right">
                <i className="fa fa-eur pb-2 " style={{fontSize:"15px"}}/> 
                <strong>{course.price}</strong>
                </span>
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
        list:state.courses.courses
    }
}

export default connect(mapStateToProps, {fetchAllCourses})(withRouter(Courses));

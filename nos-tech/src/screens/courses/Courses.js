import React, {useState, useEffect} from 'react'
import './courses.css'
import Carousel from '../../components/carousel/Carousel';
import {connect, useDispatch} from 'react-redux';
import {fetchAllCourses} from '../../redux/actions/courses';
import {withRouter} from 'react-router-dom';


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
            <div key={course._id}>
            <div className="carousel-div col pt-5">
            <button className="btn btn-outline-success">{course.name}</button>
             <p>Description: {course.description}</p>
            </div>
            </div>
          )
      })
    }

    const responsive = {
        0: { items: 1 },
        568: { items: 3 },
        1024: { items: 4 },
    };

    return (

        <div >

            <p className="container my-5 text-center text-info">Courses we offer!</p>
            <hr></hr>
            <Carousel
                responsive={responsive}
                autoPlay = {true}
                autoPlayInterval = {2000}
                paddingLeft = {100}
                infinite={true}
                disableDotsControls={true}
            >
                {CourseCarousel()}
            </Carousel>
            <hr></hr>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        list:state.courses.courses
    }
}

export default connect(mapStateToProps, {fetchAllCourses})(withRouter(Courses));

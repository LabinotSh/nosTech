import React, {useState, useEffect} from 'react'
import './course.css'
import Feedback from './Feedback';
import spinner from './spinner.gif'
import { history } from "../../helpers/history";
import {useDispatch, useSelector,connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom';
import {listCourseDetails,addStudentToCourse} from '../../redux/actions/courseActions'
import jwt_decode from 'jwt-decode';
import Loader from '../../components/icons/Loader';



const Course = ({match, loading}) => {
    const courseId = match.params.id
    const [video, setVideo] = useState("spinner.gif")
    const [about, setAbout] = useState(true)
    const[enrolled,setEnrolled]= useState(false)
    
    const dispatch = useDispatch();
    const courseDetails = useSelector(state => state.courseDetails)
    const{course} = courseDetails
    const[user,setUser] = useState({})

    const courseAddStudent = useSelector(state => state.courseAddStudent)
    const {success:addStudentSuccess} = courseAddStudent
    
    

    //Gets course details 
    useEffect(() => {
        if(addStudentSuccess) {
            alert("You've enrolled successfully")
            
        }
        dispatch(listCourseDetails(courseId)) 
    },[dispatch,addStudentSuccess])


    //Loads the first video of the course
    useEffect(()=> {
        if(course.videos[0]) {
            setVideo(course.videos[0])
        }
    },[course.videos])

    const videoChangeHandler = (name) => {
        setVideo(name)
    }


    
    //checks whether the logged in user is enrolled in the course or not 
    useEffect(() => {
        try {
            const token = localStorage.getItem('user')
            if(token) {
                const useri = jwt_decode(token)
                
                setUser(useri)
                if(course.users) {
                    if(course.users.find(u => u.toString() === user._id.toString())) {
                        setEnrolled(true)
                    } 
                }
            }
        }catch(e) {
            console.log(e)
        }
    },[course])   

    const enrollCourseHandler = () => {
        console.log(user)
        if(!user._id) {
            console.log("thisss")
            localStorage.setItem('course', courseId);
            history.push('/login')
        }else {
            dispatch(addStudentToCourse(courseId,user))
        }
    } 

    return (
       
        <>
            <div className="mx-2 mt-3 py-3 mainContent">
                <h6>Category &gt; <a href="#">{course.category}</a></h6>
                <h2 className="text-white course-name">{course.name}</h2>
                <div className="videoDiv">
                    <div className="embed-responsive embed-responsive-16by9 video">
                        <video controls="controls" src={require(`./${video}`)}>
                            
                        </video>
                    </div>
                    {(!enrolled)?
                    <div className="text-white right-main">
                        <button type="button" id="enrBtn" onClick={enrollCourseHandler}>Enroll Now</button> 
                        <h2 className="text-white">${course.price}</h2>
                    </div>:
                    <ul class="list-group course-list w-25">
                        {(course.videos)?(<>{course.videos.map((courseVideo, index) =>
                        <li  class="list-group-item" key={index} onClick={() => videoChangeHandler(courseVideo)}>{`${index +1}. ${courseVideo}`}</li>) }
                       
                        </>):null}
                    </ul>
                    }
                </div>
            </div>
            <div className="mx-1 mt-4">
                <ul className="course-nav">
                    <li onClick={() => setAbout(true)} >About</li>
                    <li onClick={() => setAbout(false)}>Reviews</li>
                </ul>
                <hr></hr>
            </div>
            {(about)?
            <div id="about" className="about">
                <div className="about-majte">    
                    <p>{course.description}</p>
                </div> 
                <div className="about-right">
                    <img src={require('../../assets/images/s1.png')} className="rounded-circle" width="120px" height="120px" alt="Cinque Terre" />
                    {(course._instructor)?<p>{course._instructor.name}</p>:<p></p>}
                </div>

            </div>:
            <div className="bg-light">
                {
                   (course.feedback)?course.feedback.map((feedback,i) => (
                        <React.Fragment key={i}><Feedback title={feedback.comment} name={feedback.name}></Feedback> <hr></hr> </React.Fragment>)):<div><img src={spinner}></img></div>
                } 
            </div>
            }
           
        </>
    )
}

// function mapStateToProps(state) {
//     return {
//         loading: state.courseDetails.loading
//     }
// }

export default Course

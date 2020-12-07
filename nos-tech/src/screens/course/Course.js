import React, {useState, useEffect} from 'react'
import './course.css'
import Feedback from './Feedback';
import { history } from "../../helpers/history";
import {useDispatch, useSelector} from 'react-redux'
import {listCourseDetails,addStudentToCourse,createCourseFeedback} from '../../redux/actions/courseActions'
import {addCourseToStudent} from '../../redux/actions/userActions'
import { COURSE_ADD_STUDENT_RESET } from '../../redux/actions/types'
import jwt_decode from 'jwt-decode';





const Course = ({match}) => {
    const courseId = match.params.id
    const [video, setVideo] = useState("spinner.gif")
    const [about, setAbout] = useState(true)
    const[enrolled,setEnrolled] = useState(false)
    
    const dispatch = useDispatch();
    const courseDetails = useSelector(state => state.courseDetails)
    const{course} = courseDetails
    const[user,setUser] = useState({})

    const courseAddStudent = useSelector(state => state.courseAddStudent)
    const {success:addStudentSuccess} = courseAddStudent

    const [comment,setComment] = useState("")
    
    const courseCreateFeedback = useSelector(state => state.courseCreateFeedback)
    const{success:createFeedbackSuccess, error:createFeedbackError} = courseCreateFeedback

    //Gets course details 
    useEffect(() => {
        if(addStudentSuccess) {
            alert("You've enrolled successfully")
            dispatch({type:COURSE_ADD_STUDENT_RESET })
        }
        
        if(createFeedbackSuccess) {
            alert("Your review was successfully submited!")
        }
        dispatch(listCourseDetails(courseId))
        
    },[dispatch,addStudentSuccess,createFeedbackSuccess])


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
            localStorage.setItem('course', courseId);
            history.push('/login')
        }else {
            history.push(`/checkout/${course._id}`)
        }
    } 

    const feedbackSubmitHandler = (e) => {
        e.preventDefault();
        
        const userId = user._id

        console.log(userId)
        console.log(comment)
        dispatch(createCourseFeedback(courseId, {
            user:userId,
            comment
        }))
        setComment("")
    }

    return (
        <>
            <div className="mx-2 mt-3 py-3 mainContent">
                <div className="courseMain-majte">
                    <h6>Category &gt; <a href="#">{course.category}</a></h6>
                    <h2 className="text-white course-name">{course.name}</h2>
                    <div className="videoDiv">
                        <div className="embed-responsive embed-responsive-16by9 video">
                            <video controls="controls" src={`/${video}`}>
                                
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
            </div>
            <div className="mt-4">
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
            <div className="feedbacks">
                {
                    (course.feedback.length > 0)?course.feedback.map((feedback,i) => (
                        <React.Fragment key={i}><Feedback title={feedback.comment} name={feedback.user.name} lastname={feedback.user.surname}></Feedback> <hr></hr> </React.Fragment>))
                        :<div className="about-majte"><h5 className="text-center my-5">Nothing to show here yet!</h5></div>
                }
                
                {enrolled?
                
                <form className="ml-3" onSubmit={feedbackSubmitHandler}>
                    <h4 className="mt-5 mb-3">Leave a Review</h4>
                    {(createFeedbackError)?
                    <div className="alert alert-danger">{createFeedbackError}</div>:null
                    }
                    <div className="form-group">
                        <textarea class="form-control border border-secondary"  rows="4" value={comment} placeholder="Your comment..." onChange={(e)=>setComment(e.target.value)}></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary feedbackBtn">Submit</button>
                </form>:null
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

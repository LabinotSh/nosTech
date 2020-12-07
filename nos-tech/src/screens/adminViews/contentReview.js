import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {listCourseDetails} from '../../redux/actions/courseActions'
import {Link} from 'react-router-dom'

const ContentReview = ({match}) => {
    const courseId = match.params.id

    const dispatch = useDispatch();
    const courseDetails = useSelector(state => state.courseDetails)
    const {course} = courseDetails

    useEffect(()=>{
        dispatch(listCourseDetails(courseId))
    },[courseId,match,dispatch])


    return (
        <>  
        <Link to="/admins/course-review"  className="btn btn-dark btn-sm my-3 mx-5" >Go Back</Link>
        <div className="container content-items-review-part">
        <img className="content-review-image" src={`/${course.image}`} />
        {course.videos?(course.videos.map(video =>
            <video className="content-review-video" type="video"  controls src={`/${video}`} />
        )):null}
        </div>
        </>
    )
}

export default ContentReview

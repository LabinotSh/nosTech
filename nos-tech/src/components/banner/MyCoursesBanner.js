import React from 'react';
import './Banner.css';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTrash } from '@fortawesome/free-solid-svg-icons';

function MyCoursesBanner(){
   
    return(
        <div className="MyCourseBanner">
        <div className="my-container text-center">

           <div className="text-center" > 
        <h1 className="MyCourseBanner-title pt-5 pb-3">
            <span className="my">my </span>  Courses</h1>
            <div className="text-light">View all the courses you are subscribed to and added as Favorites <FontAwesomeIcon 
            icon={faHeart}
            color={'#fc4563'} /> !</div>
            </div>
        
        
        {/* <FontAwesomeIcon icon={faUser} size='6x'/> */}
        
        

        {/* <button className="courseBanner-button">Software Development</button>
        <button className="courseBanner-button">Mobile & Web Development</button>
        <button className="courseBanner-button">Algorithms</button>
        <button className="courseBanner-button">Computer Security & Networks</button>
        <button className="courseBanner-button">Design & Product</button> */}
        </div>
        </div>
    )
}

export default MyCoursesBanner;
import React from 'react';
import './Banner.css'

function CourseBannerComponent(){
   
    return(
        <div className="CourseBanner">
        <div className="container">
        <h1 className="Coursebanner-title pt-5 pb-3">NosTech Courses</h1>

        <button className="courseBanner-button">Software Development</button>
        <button className="courseBanner-button">Mobile & Web Development</button>
        <button className="courseBanner-button">Algorithms</button>
        <button className="courseBanner-button">Computer Security & Networks</button>
        <button className="courseBanner-button">Design & Product</button>
        </div>
        </div>
    )
}

export default CourseBannerComponent
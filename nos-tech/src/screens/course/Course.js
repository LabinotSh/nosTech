import React from 'react'
import './course.css'
import courses from './courses'





const Course = (params) => {
    const course = courses.find((c) => c._id === params.match.params.id)
    console.log(course._id)
    return (
        <>
            <div className="mx-2 mt-3 py-3 mainContent">
                <h6>Category &gt; <a href="#">Test</a></h6>
                <h2 className="text-white">{course.name}</h2>
                <div className="videoDiv">
                    <div className="embed-responsive embed-responsive-16by9">
                        <video controls="controls">
                            <source src={require(`./${course.introVideo}`)}></source>
                        </video>
                    </div>
                    <div className="text-white right-main">
                        <button type="button" id="enrBtn">Enroll Now</button> 
                        <h2 className="text-white">${course.price}</h2>
                    </div>
                </div>
            </div>
            <div className="mx-1 mt-4">
                <ul className="course-nav">
                    <li><a href="#about">About</a></li>
                    <li><a href="#reviews">Reviews</a></li>
                </ul>
                <hr></hr>
            </div>
            <div id="about" className="about">
                <div className="about-left">    
                    <p>{course.description}</p>
                </div> 
                <div className="about-right">
                    <img src={require('../../assets/images/s1.png')} className="rounded-circle" width="100px" height="100px" alt="Cinque Terre" />
                    <p>Eris Leci</p>
                </div>

            </div>
            <div className="bg-light">
                <div className="mx-1 mt-4 pl-4">
                        <p id="reviews" className="h5">Reviews</p>
                        <hr></hr>
                </div>
                <div className="media my-5 pl-2">
                    <img className="align-self-start mr-3 rounded-circle" width="100px" height="100px" src={require('../../assets/images/s1.png')} alt="Generic placeholder image"/>
                    <div className="media-body">
                        <h5 className="mt-0">Eris Leci</h5>
                        <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.</p>
                        
                    </div>
                    
                </div>
                <hr></hr>
                <div className="media my-5 pl-2">
                    <img className="align-self-start mr-3 rounded-circle" width="100px" height="100px" src={require('../../assets/images/s1.png')} alt="Generic placeholder image"/>
                    <div className="media-body">
                        <h5 className="mt-0">Eris Leci</h5>
                        <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.</p>
                        
                    </div>    
                </div>
                <hr></hr>
                <div className="media my-5 pl-2">
                    <img className="align-self-start mr-3 rounded-circle" width="100px" height="100px" src={require('../../assets/images/s1.png')} alt="Generic placeholder image"/>
                    <div className="media-body">
                        <h5 className="mt-0">Eris Leci</h5>
                        <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.</p>
                        
                    </div>
                    
                </div>
            </div>
           
        </>
    )
}

export default Course

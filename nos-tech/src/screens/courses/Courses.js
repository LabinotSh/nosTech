import React from 'react'
import './courses.css'
import Carousel from '../../components/carousel/Carousel'


function Courses() {

    const CourseCarousel = () =>{
        return courses.map(courses => {
          return (
            <div>
            <div className="carousel-div col pt-5">
            <button className="btn btn-outline-success">{courses}</button>
            </div>
            </div>
          )
      })
    }
    
    const courses = [
         'HTML','PHP', 'Css','Python','Vue js','React Js'  
    ];

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

export default Courses

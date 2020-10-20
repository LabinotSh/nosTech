import React from 'react'
import '../css/courses.css'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

function Courses() {
    const responsive = {
        superLargeDesktop: {
          breakpoint: { max: 4000, min: 3000 },
          items: 4
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 5
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 2
        }
      };
    return (
        <div >
           <p className="container my-5 text-center text-info">Courses we offer!</p>
           <hr></hr>
           <Carousel 
      className="my-3 ml-5" 
      responsive={responsive} 
      infinite={true}
      removeArrowOnDeviceType={["tablet", "mobile"]}
      autoPlay= {true}
      autoPlaySpeed={5000}
      >
    <div className="carousel-div col pt-5">
        <button className="btn btn-outline-dark">HTML&CSS</button>
    <div className="my-5">
        <button className="btn btn-outline-success">Python</button>
    </div>
    </div>

    <div className="carousel-div col pt-5">
        <button className="btn btn-outline-primary">PHP</button>
    <div className="my-5">
        <button className="btn btn-outline-warning">Laravel</button>
    </div>
    </div>

    <div className="carousel-div col pt-5">
        <button className="btn btn-outline-secondary">Angular</button>
    <div className="my-5">
        <button className="btn btn-outline-info">Wordpress</button>
    </div>
    </div>

    <div className="carousel-div col pt-5">
        <button className="btn btn-outline-danger">Vue Js</button>
    <div className="my-5">
        <button className="btn btn-outline-success">Node Js</button>
    </div>
    </div>

    <div className="carousel-div col pt-5">
        <button className="btn btn-outline-primary">React Js</button>
    <div className="my-5">
        <button className="btn btn-outline-warning">Java</button>
    </div>
    </div>
  </Carousel>

  <hr></hr>
        </div>
    )
}

export default Courses

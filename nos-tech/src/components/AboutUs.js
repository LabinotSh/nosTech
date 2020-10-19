import React from 'react'
import '../css/aboutus.css'
import pic1 from '../assets/aboutUs.jpg'
import whatwedo1 from '../assets/whatwedo1.jpg'
import whatwedo2 from '../assets/whatwedo2.jpg'
import whatwedo3 from '../assets/whatwedo3.jpg'
import one from '../assets/1.jpg'
import two from '../assets/2.jpg'
import three from '../assets/3.jpg'
import four from '../assets/4.jpg'
import five from '../assets/5.jpg'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

function AboutUs() {
  const responsive = {
    superLargeDesktop: {

      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  

    return (
      <div className="container">
      {/* Who are we ? -- Section */}
      <div className="row my-5">
        <div className="row col-md-12">
        <div className="card col-md-7 about-us-card">
        <img  className="card-img-top " src={pic1} ></img>
        </div>
        <div className="card col-md-5 about-us-card">
        <h2 className="text-center mb-5 my-5">Who are we?</h2>
        <p >Lorem Ipsum is simply dummy text of the printing and typesetting industry.
           Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
          when an unknown printer took a galley of type and scrambled it to make a type
          specimen book. It has survived not only five centuries, but also the leap into
          electronic typesetting, remaining essentially unchanged. It was popularised in
          the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
          and more recently with desktop publishing software like Aldus PageMaker including 
          versions of Lorem</p>
        </div>
      </div>
      </div>

       {/* What we do ? -- Section */}
      <div className=" col-md-12 row">
      <div className="card about-us-card  col-md-7 my-5">
        <img  className="card-img-top  what-we-do-pic1" src={whatwedo1} ></img>
        <img  className="card-img-top  what-we-do-pic2" src={whatwedo2} ></img>
        <img  className="card-img-top  what-we-do-pic3" src={whatwedo3} ></img>
      </div>
        <div className="card col-md-5 about-us-card my-5">
        <h2 className="text-center mb-5 my-5">What we do!</h2>
        <p >Lorem Ipsum is simply dummy text of the printing and typesetting industry.
           Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
          when an unknown printer took a galley of type and scrambled it to make a type
          specimen book. It has survived not only five centuries, but also the leap into
          electronic typesetting, remaining essentially unchanged. It was popularised in
          the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
          and more recently with desktop publishing software like Aldus PageMaker including 
          versions of Lorem</p>
        </div>
      </div>


      {/* Meet our team ? -- Section */}
      <h4 className="container">Meet our team</h4>
      <hr></hr>
      <Carousel 
      className="my-3" 
      responsive={responsive} 
      infinite={true}
      removeArrowOnDeviceType={["tablet", "mobile"]}
      autoPlay= {true}
      autoPlaySpeed={5000}
      >
    <div className="carousel-div"><img  className="card-img-top  carousel-pic" src={one} ></img></div>
    <div className="carousel-div"><img  className="card-img-top  carousel-pic" src={two} ></img></div>
    <div className="carousel-div"><img  className="card-img-top  carousel-pic" src={three} ></img></div>
    <div className="carousel-div"><img  className="card-img-top  carousel-pic" src={four} ></img></div>
    <div className="carousel-div"><img  className="card-img-top  carousel-pic" src={five} ></img></div>
  </Carousel>

    </div>

    )}

export default AboutUs

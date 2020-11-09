import React from 'react'
import './aboutus.css'
import Carousel from '../../components/carousel/Carousel'
import AboutItems from '../../components/carousel/aboutItems'
import WhoAreWe from '../../components/aboutComponents/whoAreWe'
import WhatWeDo from '../../components/aboutComponents/whatWeDo'

function AboutUs() {

  const responsive = {
    0: { items: 1 },
    568: { items: 3 },
    1024: { items: 3 },
};
  const aboutCarousel = () =>{
    return AboutItems.map(AboutItems => {
      return (
        <div key={AboutItems}>
        <img alt="Pic not found" className="aboutUs-Carousel" src={AboutItems.image}/>
      </div>
      )
    })
  }

    return (
      <div className="container">
      {/* Who are we ? -- Section */}
      <WhoAreWe />
       {/* What we do ? -- Section */}
      <WhatWeDo />
      {/* Meet our team ? -- Section */}
      <h4 className="container">Meet our team</h4>
      <hr></hr>
      <render>
      <div className="my-5">
        <Carousel 
          responsive={responsive}
          autoPlay = {true}
          autoPlayInterval = {1500}
          infinite = {true}
          disableDotsControls = {true}
        >
          {aboutCarousel()}
        </Carousel>
        </div>
      </render>

    </div>

    )}

export default AboutUs

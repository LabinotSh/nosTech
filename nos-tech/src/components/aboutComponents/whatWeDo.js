import React from 'react';
import team2 from '../../assets/images/aboutUs2.svg'
import team3 from '../../assets/images/aboutUs3.svg'
import team4 from '../../assets/images/aboutUs4.svg'

function WhatWeDo() {

  return (
    <div className=" col-md-12 row">
      <div className="card about-us-card  col-md-7 my-5">
        <h2 className="text-center mb-5 my-5 text-dark">What we do!</h2>
        <p>
          We provide students with reliable sources and quality information presented to them by professionals which work with the latest technology in the industry.
          With us you can develop empoyable skills through tutorials tailored to give you the most detailed explanations.
        </p>
      </div>
      <div className="card col-md-5 about-us-card my-5">
        <img className="card-img-top  what-we-do-pic1" src={team4} alt="...not found" />
        <img className="card-img-top  what-we-do-pic2" src={team2} alt="...not found" />
        <img className="card-img-top  what-we-do-pic3" src={team3} alt="...not found" />
      </div>
    </div>
  )
}

export default WhatWeDo
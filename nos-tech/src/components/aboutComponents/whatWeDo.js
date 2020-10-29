import React from 'react';
import team2 from '../../assets/images/aboutUs2.svg'
import team3 from '../../assets/images/aboutUs3.svg'
import team4 from '../../assets/images/aboutUs4.svg'

function WhatWeDo(){

    return(
        <div className=" col-md-12 row">
        <div className="card about-us-card  col-md-7 my-5">
        <h2 className="text-center mb-5 my-5 text-dark">What we do!</h2>
          <p >Lorem Ipsum is simply dummy text of the printing and typesetting industry.
             Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and scrambled it to make a type
            specimen book. It has survived not only five centuries, but also the leap into
            electronic typesetting, remaining essentially unchanged. It was popularised in
            the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
            and more recently with desktop publishing software like Aldus PageMaker including 
            versions of Lorem</p>
        </div>
          <div className="card col-md-5 about-us-card my-5">
          <img  className="card-img-top  what-we-do-pic1" src={team4} ></img>
          <img  className="card-img-top  what-we-do-pic2" src={team2} ></img>
          <img  className="card-img-top  what-we-do-pic3" src={team3} ></img>
          </div>
        </div>
    )
}

export default WhatWeDo
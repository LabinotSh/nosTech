import React from 'react'
import team from '../../assets/images/aboutUs.svg'

function WhoAreWe(){

    return(
              
      <div className="row my-5">
      <div className="row col-md-12">
      <div className="card col-md-7 about-us-card">
      <img  className="card-img-top " src={team} alt="..not found"></img>
      </div>
      <div className="card col-md-5 about-us-card">
      <h2 className="text-center text-dark mb-5 my-5">Who are we?</h2>
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
    )
}

export default WhoAreWe
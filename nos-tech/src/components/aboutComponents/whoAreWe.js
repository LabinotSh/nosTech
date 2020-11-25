import React from 'react'
import team from '../../assets/images/aboutUs.svg'

function WhoAreWe() {

  return (

    <div className="row my-5">
      <div className="row col-md-12">
        <div className="card col-md-7 about-us-card">
          <img className="card-img-top " src={team} alt="..not found"></img>
        </div>
        <div className="card col-md-5 about-us-card">
          <h2 className="text-center text-dark mb-5 my-5">Who are we?</h2>
          <p><b>nosTech</b> is an educational organization offering open online courses.
          It provides people with the skills they want and that the company needs.
          We value teamwork, which is why we provide our users with a shared space where they can interchange ideas and information</p>
        </div>
      </div>
    </div>
  )
}

export default WhoAreWe
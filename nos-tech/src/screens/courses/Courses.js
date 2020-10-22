import React from 'react'
import './courses.css'

function Courses() {
   
    return (
        <div >
           <p className="container my-5 text-center text-info">Courses we offer!</p>
           <hr></hr>
          
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


  <hr></hr>
        </div>
    )
}

export default Courses

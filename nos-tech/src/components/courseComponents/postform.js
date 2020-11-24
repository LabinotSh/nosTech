import React from 'react'
import Modal from '../modal/addCourse-modal'
import './postform.css'

const LeftForm = () => {
    return (
        <>
      <div className="add-course-left-content">
        <div className="row text-center">
        <h1 className="text-light mb-5">NosTech</h1>
        <p className="w-100 my-2 text-light">
          <em>Fill this form to attach your work in nosTech</em>
        </p>
        <p className="w-100 text-light" style={{fontSize: "15px"}}>
          <em>Create an online video course. 
          </em>
        </p>
        <p className="w-100 text-light" style={{fontSize: "13px"}}>
          <em>Earn money by 
            teaching people around the world.
          </em>
        </p>
        <Modal />
        <button className="add-course-go-back ml-3">
          Go back
           <i className="ml-1 fa fa-arrow-up" style={{fontSize:"15px"}}/>
        </button>
        </div>
      </div>
        </>
    )
}

export default LeftForm
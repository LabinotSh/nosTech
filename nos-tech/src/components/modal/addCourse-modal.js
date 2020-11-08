import React from 'react'
import './modal.css';
import TextM from '../../constants/modalText'

const CourseModal = () => {

    const showAlert = () => {
        alert('Great!');
    }
    return(
        <>
    <button type="button" 
    className="modal-course-button" 
    data-toggle="modal" 
    data-target="#staticBackdrop"
    >
        Read More
    </button>
      
      <div className="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">Not sure what to do?</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
           <TextM />

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" onClick={showAlert} className="btn btn-primary" data-dismiss="modal">Understood</button>
               
            </div>
          </div>
        </div>
      </div>
      </>
    )
}

export default CourseModal
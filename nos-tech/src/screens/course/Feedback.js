import React from 'react'
import './course.css'

const Feedback = (props) => {
    return (
        <div className="media my-1 pl-2 pt-3 w-75">
            <img className="align-self-start mr-3 rounded-circle" width="80px" height="80px" src={require('../../assets/images/profile.png')} alt="Generic placeholder image"/>
            <div className="media-body">
                <h5 className="mt-0">{props.name} {props.lastname}</h5>
                <p>{props.title}</p>
                
            </div>  
                    
        </div>
    )
}

export default Feedback

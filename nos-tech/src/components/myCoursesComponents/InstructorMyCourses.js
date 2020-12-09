import React, { useEffect, useState } from 'react'
import Panel from '../panel/Panel';
import axios from 'axios';
import './Instructor.css';

const InstructorCourse = () => {

    const [course, setCourse] = useState(['']);

    const fetchCourse = () => {
        axios.get('/api/course/')
        .then((response) => {
            setCourse(response.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        fetchCourse();
    }, [])

    return (
        <>
        <Panel />
        <div className="container">
        <div className=" row row-cols-1 row-cols-md-3">
        {course.map((item,idx) => {
            return(
                <>
            <div key={idx} className="col my-5">
                    <div className="card h-100">
                    <img src={`/${item.image}`}
                        className="card-img-top courseInstructor-img"
                        alt="..." 
                    /> 
                    <div className="card-body">
                    <h6 className="card-title courseInstructor-title">{item.name}</h6>
                    <p className="card-text courseInstructor-desc">{item.description}</p>
                    </div>
                    <div className="card-footer mt-2 courseInstructor-footer">
                    <div className="d-flex justify-content-between">
                    <strong style={{ fontSize: "18px", marginTop: "6px" }}>
                            <i className="fa fa-eur" /> {item.price}
                    </strong>    
                    </div>
                    </div>
                    </div>
                    </div>
                </>
                )
                })}
        </div>
        </div>
        </>
    )
}

export default InstructorCourse
import React from 'react'
import {Spinner} from 'react-bootstrap';

const SpinnerC = () => {
    return (
        <>
        <div className="noCourseAlert my-5">
         <p className="text-center my-2 mb-2">The course you are looking for is not available at the moment!</p>
            <div className="text-center my-5">
            <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
            </Spinner>     
            </div>     
        </div>
        </> 
    )
}

export default SpinnerC

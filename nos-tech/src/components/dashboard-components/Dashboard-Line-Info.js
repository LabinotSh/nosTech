import React from 'react'
import './Dashboard-Component.css'

const LineInfo = () => {
    return (
        <>
        <div className="card line-info-card">
        <p>Line chart shows all courses in nostech</p>
        <img src={require('../../assets/images/line2.png')} className="line-info-img" />
        <p className="mt-2">Also shows the status of course whilst being reviewed</p>
        </div>
        </>
    )
}

export default LineInfo
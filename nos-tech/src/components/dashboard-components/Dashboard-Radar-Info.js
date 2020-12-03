import React from 'react'
import './Dashboard-Component.css'

const RadarInfo = () => {
    return (
        <>
        <div className="card radar-info-card">
        <p>The radar displays nostech most used categories by courses.</p>
        <img src={require('../../assets/images/line.png')} className="radar-info-img" />
        <p className="mt-2">You can choose yours on course submission form.</p>
        </div>
        </>
    )
}

export default RadarInfo
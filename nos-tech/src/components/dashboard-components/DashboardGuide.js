import React from 'react'
import './Dashboard-Component.css'

const DashboardGuide = () => {
    return(
        <>
        <div className="d-flex">

        <div className="col-xl-12">
        <div className="row">

        <div className="col-xl-3">
        <div className="card dashboard-card-guide">
        <img src={require('../../assets/images/dashboard-guide1.svg')} 
        class="w-100 dashboard-guide-image" alt="..."/>
        <div className="card-body">
        <p className="card-text dashboard-text-guide">
            You log in as a teacher
            <i className="fa fa-lock-open ml-1" 
            style={{fontSize:'13px',color:'#c2c2c2'}} />    
        </p>
        </div>
        </div>
        </div>

        <div className="col-xl-3">
        <div className="card dashboard-card-guide">
        <img src={require('../../assets/images/dashboard-guide2.svg')} 
        class="w-100 dashboard-guide-image" alt="..." />
        <div className="card-body">
        <p className="card-text dashboard-text-guide">
            Find form for course submission
            <i className="fa fa-binoculars ml-1" 
            style={{fontSize:'13px',color:'#c2c2c2'}} />
        </p>
        </div>
        </div>
        </div>

        <div className="col-xl-3">
        <div className="card dashboard-card-guide">
        <img src={require('../../assets/images/dashboard-guide3.svg')} 
        class="w-100 dashboard-guide-image" alt="..."/>
        <div className="card-body">
        <p className="card-text dashboard-text-guide">
            After submission, course will be sent for review
            <i className="fas fa-dolly ml-1" 
            style={{fontSize:'13px',color:'#c2c2c2'}} />
        </p>
        </div>
        </div>
        </div>

        <div className="col-xl-3">
        <div className="card dashboard-card-guide">
        <img src={require('../../assets/images/dashboard-guide4.svg')} 
        class="w-100 dashboard-guide-image" alt="..." />
        <div className="card-body">
        <p className="card-text dashboard-text-guide">
            And you're all done
            <i className="fa fa-check ml-1" 
            style={{fontSize:'13px',color:'#c2c2c2'}} />
        </p>
        </div>
        </div>
            </div>
      
        </div>
        </div>
                    
        </div>
        </>
    ) 
}

export default DashboardGuide
import React from 'react'
import Panel from '../../components/panel/Panel'
import DashboardGuide from '../../components/dashboard-components/DashboardGuide'
import DashboardRadar from '../../components/dashboard-components/Dashboard-Radar';


const Dashboard = () => {

    
    return(
        <div>
        <Panel />
        <h1 className="nostech-guide-text">How NosTech Rolls...</h1>
        <DashboardGuide />
        <div  style={{width:'500px',display:"flex"}}>
        <DashboardRadar />
        </div>
        </div>
    )
}

export default Dashboard
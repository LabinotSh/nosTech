import React from 'react'
import Panel from '../../components/panel/Panel'
import DashboardGuide from '../../components/dashboard-components/DashboardGuide'
import DashboardRadar from '../../components/dashboard-components/Dashboard-Radar';
import DashboardLineChart from '../../components/dashboard-components/Dashboard-LineChart';
import RadarInfo from '../../components/dashboard-components/Dashboard-Radar-Info';
import LineInfo from '../../components/dashboard-components/Dashboard-Line-Info';

const Dashboard = () => {

    
    return(
        <div>
        <Panel />
        <h1 className="nostech-guide-text">How NosTech Rolls...</h1>
        <DashboardGuide />
        {/* Radar Part */}
        <div className="d-flex">
        <div className="col-xl-12 row">
        <div className="col-xl-8 ">
        <DashboardRadar />
        </div>        
        <div className="col-xl-4">
        <RadarInfo />
        </div>
        </div>
        </div>
        {/*  */}

        {/* Line Part */}
        <div className="d-flex">
        <div className="col-xl-12 row">
        <div className="col-xl-7 ">
        <DashboardLineChart />
        </div>
        <div className="col-xl-5">
        <LineInfo />
        </div>
        </div>
        </div>
        {/*  */}

        </div>
    )
}

export default Dashboard
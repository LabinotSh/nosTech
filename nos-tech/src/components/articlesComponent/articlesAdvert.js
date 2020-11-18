import React from 'react';
import './articlesComponent.css';

function AdvComponent() {

return(
<div className="col-xl-3 float-right">
        
    <div className="card bg-primary text-white text-center p-3">
        <blockquote className="blockquote mb-0">
        <p>Advertise here.</p>
        <footer className="blockquote-footer text-white">
        <small>
            Advertise your bussines 
            <cite title="Source Title">or product here.</cite>
        </small>
        </footer>
        </blockquote>
    </div>
</div> 
        )
}

export default AdvComponent;
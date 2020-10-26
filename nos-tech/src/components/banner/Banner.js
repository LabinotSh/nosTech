import React from 'react';
import './Banner.css'

function BannerComponent(){
    const category = [
        'Iphone', 'Samsung', 'VR' , 'Amazon', 'Google'
    ]   
    return(
        <div className="Banner">
           <div className="container">

        <h1 className="text-white text-center pt-5 banner-title">
            Technology
        </h1>

        <p className="text-white text-center my-5">
            The latest tech news from nosTech on giants like Apple and Google,
            and the most important technology issues of the day 
        </p>

        <hr className="bg-light mx-auto" style={{width:"25%"}}></hr>
                
        <p className="text-light text-center pb-3">
            TOPICS
            {category.map(item => (
                <span className="btn banner-button text-center ml-2 mb-4">{item}</span>
            ))
            }
        </p> 
           </div>
        </div>
    )
}

export default BannerComponent
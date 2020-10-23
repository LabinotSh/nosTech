import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

function carouselComponent(props) {


    return(
    <AliceCarousel
        mouseTracking
        responsive={props.responsive}
        infinite={props.infinite}
        autoPlay = {props.autoPlay}
        autoPlayInterval = {props.autoPlayInterval}
        paddingLeft={props.paddingLeft}
        disableDotsControls={props.disableDotsControls}
    >  
    {props.children}
    </AliceCarousel>
    )
}

export default carouselComponent
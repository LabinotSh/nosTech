import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

function carouselComponent() {
    const responsive = {
        0: { items: 1 },
        568: { items: 2 },
        1024: { items: 2 },
    };
    const items = [
        {
          image: "https://previews.123rf.com/images/desbayy/desbayy1801/desbayy180100038/94019558-nt-letter-logo.jpg"
        },
        {
            image: "https://previews.123rf.com/images/desbayy/desbayy1801/desbayy180100038/94019558-nt-letter-logo.jpg"
        },
        {
            image: "https://previews.123rf.com/images/desbayy/desbayy1801/desbayy180100038/94019558-nt-letter-logo.jpg"
        }
      ];

    return(
        <AliceCarousel
        mouseTracking
        responsive={responsive}
    >      
    { items.map(items => {
      return (
        <div>
        <img alt="text" className="c" src={items.image}/>
      </div>
      )
  })
 }
    </AliceCarousel>
    )
}

export default carouselComponent
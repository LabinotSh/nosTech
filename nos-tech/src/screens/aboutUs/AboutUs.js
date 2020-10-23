import React from 'react'
import './aboutus.css'
import team from '../../assets/images/aboutUs.svg'
import team2 from '../../assets/images/aboutUs2.svg'
import team3 from '../../assets/images/aboutUs3.svg'
import team4 from '../../assets/images/aboutUs4.svg'
import Carousel from '../../components/carousel/Carousel'


function AboutUs() {

  const responsive = {
    0: { items: 1 },
    568: { items: 3 },
    1024: { items: 3 },
};
  const aboutCarousel = () =>{
    return items.map(items => {
      return (
        <div>
        <img alt="Pic not found" className="aboutUs-Carousel" src={items.image}/>
      </div>
      )
    })
  }
  const items = [
    {
      image: "https://previews.123rf.com/images/desbayy/desbayy1801/desbayy180100038/94019558-nt-letter-logo.jpg"
    },
    {
        image: "https://previews.123rf.com/images/desbayy/desbayy1801/desbayy180100038/94019558-nt-letter-logo.jpg"
    },
    {
        image: "https://previews.123rf.com/images/desbayy/desbayy1801/desbayy180100038/94019558-nt-letter-logo.jpg"
    },
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

    return (
      <div className="container">
      {/* Who are we ? -- Section */}
      <div className="row my-5">
        <div className="row col-md-12">
        <div className="card col-md-7 about-us-card">
        <img  className="card-img-top " src={team} ></img>
        </div>
        <div className="card col-md-5 about-us-card">
        <h2 className="text-center mb-5 my-5">Who are we?</h2>
        <p >Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
       when an unknown printer took a galley of type and scrambled it to make a type
       specimen book. It has survived not only five centuries, but also the leap into
       electronic typesetting, remaining essentially unchanged. It was popularised in
       the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
       and more recently with desktop publishing software like Aldus PageMaker including 
       versions of Lorem</p>
        </div>
      </div>
      </div>

       {/* What we do ? -- Section */}
       <div className=" col-md-12 row">
      <div className="card about-us-card  col-md-7 my-5">
      <h2 className="text-center mb-5 my-5">What we do!</h2>
        <p >Lorem Ipsum is simply dummy text of the printing and typesetting industry.
           Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
          when an unknown printer took a galley of type and scrambled it to make a type
          specimen book. It has survived not only five centuries, but also the leap into
          electronic typesetting, remaining essentially unchanged. It was popularised in
          the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
          and more recently with desktop publishing software like Aldus PageMaker including 
          versions of Lorem</p>
      </div>
        <div className="card col-md-5 about-us-card my-5">
        <img  className="card-img-top  what-we-do-pic1" src={team4} ></img>
        <img  className="card-img-top  what-we-do-pic2" src={team2} ></img>
        <img  className="card-img-top  what-we-do-pic3" src={team3} ></img>
        </div>
      </div>


      {/* Meet our team ? -- Section */}
      <h4 className="container">Meet our team</h4>
      <hr></hr>
      <render>
      <div>
        <Carousel 
          responsive={responsive}
          autoPlay = {true}
          autoPlayInterval = {1500}
          infinite = {true}
        >
          {aboutCarousel()}
        </Carousel>
      
        </div>
      </render>

    </div>

    )}

export default AboutUs

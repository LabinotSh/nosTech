import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Carousel from '../carousel/Carousel';
import responsive from '../../constants/carouselTags';
import {Link, withRouter} from 'react-router-dom'
import './Tags.css';

const CourseTags = () => {

    const [tags, setTags] = useState([]);

    const fetchTags = () => {
        axios
        .get('/api/tags/')
        .then((response) => {
            setTags(response.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        fetchTags();
    }, [])

    const retrievetags = () => {
        return tags.map((item,idx) => {
              return(
              <div className="py-5" key={idx}>
                <Link to = {`/topics/${item._id}`}>  
                <button className="tags-buton-carousel">
                <i className="fa fa-hashtag pr-2" />
                    {item.name} 
                </button>
                </Link>
              </div>
              )
            })
    }

    return(
    <div className="container">
    <p className="courses-headline text-center">Popular Topics</p>
          <Carousel 
          responsive={responsive} 
          paddingLeft={50} 
          disableDotsControls={true}
          >
		{retrievetags()}
		</Carousel>
        <hr />  
    </div>
    )
}

export default CourseTags

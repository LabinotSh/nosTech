import React,{useState,useEffect} from 'react';
import './Banner.css'
import axios from 'axios'


const CourseBannerComponent = () => {

    const [category, setCategory] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          const response = await axios.get('/api/category');
          setCategory(response.data);
      }
      fetchData();
    }, [category]);
   
    return(
        <div className="CourseBanner">
        <div className="container">
        <h1 className="Coursebanner-title pt-5 pb-3">NosTech Courses</h1>
        {category.map((category,index) => {
            return(
                <div style={{display: "inline"}} key={index} >
            <button className="courseBanner-button" >{category.name}</button>
                </div>
            )
        })
        }
       
        </div>
        </div>
    )
}

export default CourseBannerComponent
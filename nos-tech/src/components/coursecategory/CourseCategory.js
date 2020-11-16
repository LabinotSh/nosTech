import axios from 'axios';
import { useHistory } from 'react-router-dom';
import React , { useState, useEffect} from 'react';
import Banner from '../banner/coursecatBanner'
import './CourseCategory.css';

const CourseCategory = ({course, match}) => {
    const history = useHistory();
    let params = match.params
    const [repos, setRepos] = useState([]);
  
    
    useEffect(() => {
        const fetchData = async () => {
        const response = await axios.get('/api/course/');
        setRepos(response.data.filter(x => x.category == params.cid).reverse());
      }
      
      fetchData();
    }, [course,match]);

return (
    
<>
    <Banner />
    <div className="container">
    <div className=" row row-cols-1 row-cols-md-3">
    { repos.map((item,index) => {
    return(
        <div key={index} className="col my-5">
        <div className="card h-100">
        <img src={`/${item.image}`}
                  className="card-img-top coursecat-img"
                  alt="..." /> 
        <div className="card-body">
        <h6 className="card-title courseCat-title">{item.name}</h6>
        <p className="card-text courseCat-desc">{item.description}</p>
        </div>
        <div className="card-footer mt-2 courseCat-footer">
        <div className="d-flex justify-content-between">
        <strong style={{ fontSize: "18px", marginTop: "6px" }}>
                <i className="fa fa-eur" /> {item.price}
              </strong>
        <strong style={{ fontSize: "18px", marginTop: "6px" }}>
                <i className="fa fa-shopping-cart" />
        </strong>     
        </div>
        </div>

        </div>
        </div>   
    )
    })}
    </div>
    </div>


</>
)
}

export default CourseCategory;
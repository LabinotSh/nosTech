import { useHistory, withRouter } from 'react-router-dom';
import React , { useState, useEffect} from 'react';
import Banner from '../../components/banner/courseTagBanner'
import Pagination from '../../components/pagination/Pagination'
import Loader from "../../components/icons/Loader";
import axios from 'axios';

const CourseTags = ({pending, match}) => {
    const history = useHistory();
    let params = match.params

    const [repos, setRepos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(9);
    
    //Get courses by category
    const retrieveCourses = () => {
        axios.get(`/api/course/tag/${params.Tid}`)
        .then(response => {
            console.log(JSON.stringify(response.data))
            setRepos(response.data)
            
        })

        .catch((e) => {
            console.error("Error: " + e);
        });
    };

       
         
 

    useEffect(() => {
    
    retrieveCourses();
    }, [match]);

    //Pagination
	const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = repos.slice(indexOfFirstPost, indexOfLastPost);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    //Loading...
    if (pending) return <Loader />;

    return (

<>
    <Banner />
    <div className="container">
    <div className=" row row-cols-1 row-cols-md-3">
    { currentPosts.map((item,index) => {
    return(
        <div key={index} className="col my-5">
        <div className="card h-100">
        <img src={`/${item.image}`}
            className="card-img-top coursecat-img"
            alt="..." 
        /> 
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
    <div className="d-flex justify-content-center">
    <Pagination
            postsPerPage={postsPerPage}
            totalPosts={repos.length}
            paginate={paginate}
            activePage={repos.currentPage}
        />
    </div>
</>
)
}

export default CourseTags;
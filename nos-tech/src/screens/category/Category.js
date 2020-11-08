import React,{useState,useEffect} from 'react'
import axios from 'axios'
import './Category.css'

const Category = () => {

    //Declaring states
    const initialState = { name: ''}
    const [category, setCategory] = useState([]); //Category State
    const [info, setInfo] = useState(initialState) 
    const [error, setError] = useState({
        found: false,
        message: ''
    });

    //handle Change 
    const handleChange = (e) => { 
        setInfo({...info, [e.target.name]: e.target.value})
      }

    //Form Submit
    const handleSubmit = (e) => { 
        e.preventDefault();  
        
        axios
        .post('/api/category', info)
        .then((res) => {
            console.log(res.data);
        })
      .catch((err) => {
        console.log(err.response);
        setError({
          found: true,
          message: err.response.data.errors,
        });
        })
        //Clearing the form after submit!
        if(handleChange){
            setInfo({
                name: ''
            })
        }
    }
     // Get Category
     useEffect(() => {
        const fetchData = async () => {
        const response = await axios.get('/api/category');
          setCategory(response.data);
        }
        fetchData();
      }, [category]);



    return(
        <div className="col-xl-12 row container">
            <div className="col-xl-6">
            <form id="category-form-reset" className="category-form" onSubmit={handleSubmit}>
                <div className="form-group category-part">
                    <input 
                    type="text"  
                    id="name" 
                    name="name" 
                    value={info.name} 
                    onChange={handleChange} 
                    placeholder="enter name..."
                    className="form-control text-white bg-transparent"/>
                </div>
                <button type="submit" className="category-button">
                    Submit
                </button>
            </form>
            </div>

            <div className="col-xl-6">

            <table className="table table-sm table-hover category-table">
            <thead>
                <tr>
                <th scope="col" style={{fontWeight:"400"}}>Categories</th>
                <th scope="col" style={{fontWeight:"400",color:"#ff4a03"}}>Delete</th>
                <th scope="col" style={{fontWeight:"400",color:"#09d69c"}}>Edit</th>
                </tr>
            </thead>
            <tbody>
            {category.map((item,index) => {
            return(
                <>
            <tr  key={index}>
            <th scope="row" style={{fontWeight:"300"}}>{item.name}</th>
            <th scope="row"><i className="pl-3 fa fa-trash category-trash" /></th>
            <th scope="row"><i className="pl-2 fa fa-edit category-edit" /></th>
            </tr>
            </>
            )})}
            
            </tbody>
            </table>

            </div>
           
        </div>
    )
}

export default Category
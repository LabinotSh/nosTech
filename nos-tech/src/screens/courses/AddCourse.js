import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LeftContent from '../../components/courseComponents/postform'
import Panel from '../../components/panel/Panel';
import MultiSelect from "react-multi-select-component";
import { history } from "../../helpers/history";
import {useSelector} from 'react-redux'


function AddCourse() {



  const loggeedUser= useSelector(state => state.login)
  const {user} = loggeedUser
  console.log(user)
  
  /** start states */
  const [category, setCategory] = useState([]); //Category State
  const [tags, setTags] = useState([]); //Tags State
  const [selected, setSelected] = useState([]);
  const [formData, setFormData] = useState('');
  const [info, setInfo] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    tags: [''],
    image: ''
  });
  const [progressPercent, setProgressPercent] = useState(0);
  const [error, setError] = useState({
    found: false,
    message: '',
  });
  const [createSuccess, setCreateSuccess] = useState(false)
  /** end states */

  // Upload image
  const upload = ({ target: { files } }) => {
    let data = new FormData();
    data.append('image', files[0]);
    data.set("name", document.getElementById("name").value);
    data.set("description", document.getElementById("description").value);
    data.set("price", document.getElementById("price").value);
    data.set("category", document.getElementById("category").value);
    data.set("instructor", user._id);
    /* data.set("tags", document.getElementById("tags").value); */
    /* data.append('tags', JSON.stringify(tags)); */
    for(let i = 0; i < selected.length; i++)
    {
    data.append("tags", selected[i].value);
    }  
    setFormData(data);
  };

  // Submit Form
  const handleSubmit = (e) => {
    e.preventDefault();

    let nameValidation = document.forms["add-course-form"]["name"].value;
    let descriptionValidation = document.forms["add-course-form"]["description"].value;
    let priceValidation = document.forms["add-course-form"]["price"].value;
    let priceValidationLength = document.getElementById("price").value;
    // Name Validation
    if (nameValidation == "") {
      document.getElementById("Error-Name").innerHTML = 'Name is Required';
      return false 
    }
    if(nameValidation.length > 255){
      document.getElementById("Error-Name").innerHTML = 'Name is too long';
      return false
    }
    // Description Validation
    if(descriptionValidation == ""){
      document.getElementById("Error-Description").innerHTML = 'Description is Required';
      return false
    }
    if(descriptionValidation.length < 5){
      document.getElementById('Error-Description').innerHTML = 'Description is too short!';
      return false
    }
    if(descriptionValidation.length > 255){
      document.getElementById('Error-Description').innerHTML = 'Description is too long';
      return false
    }
    // Price Validation
    if(priceValidation == ""){
      document.getElementById('Error-Price').innerHTML = 'Price is required'
      return false
    }
    if(isNaN(priceValidationLength) || priceValidationLength < 1){
      document.getElementById('Error-Price').innerHTML = 'Price must be min 1€'
      return false
    }

    setInfo({
      name: '',
      description: '',
      price: '',
      category: '',
      tags: [''],
      image: '',
    });
    setProgressPercent(0);
    const options = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);
        console.log(`${loaded}kb of ${total}kb | ${percent}%`);
        setProgressPercent(percent);
      },
    };
   axios
      .post('/api/course/newCourse', formData, options)
      .then((res) => {
        console.log(res.data);
        const course = res.data.course
        setCreateSuccess(true)
        
        setTimeout(() => {
          setInfo(res.data.course);
          setProgressPercent(0);
          history.push(`/admins/course/${course._id}/videos`)
        }, 5000);
        
      })
      .catch((err) => {
        console.log(err.response);
        setError({
          found: true,
          message: err.response.data.errors,
        });
        setTimeout(() => {
          setError({
            found: false,
            message: '' ,
          });
          setProgressPercent(0);
        }, 3000);
      });
      document.getElementById("create-course-form").reset();
  };

      // Get Category
      useEffect(() => {
        const fetchData = async () => {
        const response = await axios.get('/api/category');
          setCategory(response.data);
        }
        fetchData();
      }, []);

      // Get Tags
      useEffect(() => {
        const fetchData = async () => {
        const response = await axios.get('/api/tags');
              setTags(response.data);
        }
        fetchData();
      }, []);
     //options
    let options = tags.map((option) => {
        return { value: option.name, label: option.name };
      })   

      const handleChange = (event) => {
        setSelected([...selected, event.target.value])
        console.log(selected);
      }

      
  return (
    <div>
      
      <div className="col-xl-12">
        <div style={{marginLeft:'-15px'}}>
        <Panel />
        </div>
      
      <div className="main-add-course pt-5 d-flex justify-content-center align-items-center flex-row">
      <LeftContent />
        
      <div className="add-course-right-content">
       
      <form id="create-course-form" name="add-course-form" className="add-course-form" onSubmit={handleSubmit} style={{ width: '359px' }}>
       {(createSuccess)?
      <div className="alert alert-warning" role="alert">
          Your course has been successfully submited for review. Please upload your videos after you've been redirected...
      </div>:null
      }
        <div className="form-group">
            <label>Name</label>
            <input type="text" id="name" name="name" className="form-control w-100"/>
            <p className="error-add-course" id="Error-Name"></p>
        </div>

        <div className="form-group">
            <label>Description</label>
            <input type="text" id="description" name="description" className="form-control w-100"/>
            <p className="error-add-course" id="Error-Description"></p>
        </div>

        <div className="form-group">
            <label>Price</label>
            <input type="number" id="price" name="price" className="form-control w-100"/>
            <p className="error-add-course" id="Error-Price"></p>
        </div>

        <div className="form-group">
        <label>Category</label>    
        <div>
        <div className="form-group">
            <select
            id="category"
            name="category"
            className="form-control w-100"
            >
        {category.map((item,index) => {
            return(
            <option
              value={item.name}
              key={index}
              className="w-100"
            >
              {item.name}
            </option>
          )})}
            </select>
        </div>
        </div>
        </div>

        <div className="form-group h-80">
        <label>Select course tech</label>    
        <MultiSelect
          options={options}
          value={selected}
          id="select"
          onChange={setSelected}
          labelledBy={"Select"}
        />
      </div>

        {error.found && (
        <div
          className='alert alert-danger file-error'
          role='alert'
        >
          {error.message}
        </div>
      )}
        <div className='progress mb-3 w-100'>
        <div
            className='progress-bar'
            role='progressbar'
            style={{ width: `${progressPercent}%` }}
            aria-valuenow={progressPercent}
            aria-valuemin={0}
            aria-valuemax={100}
        >
            {progressPercent}
        </div>
        </div>
        <div className='custom-file mb-3'>
          <input
            type='file'
            className='custom-file-input'
            id='inputGroupFile04'
            aria-describedby='inputGroupFileAddon04'
            onChange={upload}
          />
          <label className='custom-file-label' htmlFor='inputGroupFile04'>
            Choose file
          </label>
        </div>

        <button type='submit' className='add-course-button-submit w-100'>
          Submit
        </button>
      </form>
      </div>
      </div>    
      </div>
    </div>
  );
}

export default AddCourse;
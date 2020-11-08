import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LeftContent from '../../components/courseComponents/postform'

function AddCourse() {
  /** start states */
  const [category, setCategory] = useState([]); //Category State
  const [formData, setFormData] = useState('');
  const [info, setInfo] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: ''
  });
  const [progressPercent, setProgressPercent] = useState(0);
  const [error, setError] = useState({
    found: false,
    message: '',
  });
  /** end states */

  // Upload image
  const upload = ({ target: { files } }) => {
    let data = new FormData();
    data.append('image', files[0]);
    data.set("name", document.getElementById("name").value);
    data.set("description", document.getElementById("description").value);
    data.set("price", document.getElementById("price").value);
    data.set("category", document.getElementById("category").value);
    setFormData(data);
  };

  // Submit Form
  const handleSubmit = (e) => {
    e.preventDefault();
    setInfo({
      name: '',
      description: '',
      price: '',
      category: '',
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
        setTimeout(() => {
          setInfo(res.data.course);
          setProgressPercent(0);
        }, 1000);
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
      }, [category]);


  return (
    <div className='d-flex justify-content-center'>
     
      <div className="main-add-course d-flex my-5 justify-content-center align-items-center flex-row">
      <LeftContent />
        
      <div className="add-course-right-content">
      <form id="create-course-form" className="add-course-form" onSubmit={handleSubmit} style={{ width: '359px' }}>
        
        <div className="form-group">
            <label>Name</label>
            <input type="text" id="name" name="name" className="form-control w-100"/>
        </div>

        <div className="form-group">
            <label>Description</label>
            <input type="text" id="description" name="description" className="form-control w-100"/>
        </div>

        <div className="form-group">
            <label>Price</label>
            <input type="number" id="price" name="price" className="form-control w-100"/>
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
              value={item._id}
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

        <button type='submit' className='btn btn-primary w-100'>
          Submit
        </button>
      </form>
      </div>
      </div>
    </div>
  );
}

export default AddCourse;
import React, { useState,useEffect } from "react";
import "./personal-info.css";
import { Form, Image, Button, Alert } from "react-bootstrap";
import { AiOutlineUserAdd } from "react-icons/ai";
import {useDispatch, useSelector} from 'react-redux';
import {listUserDetails,updateUser} from '../../redux/actions/userActions';
import {USER_UPDATE_RESET} from '../../redux/actions/types'
import jwt_decode from 'jwt-decode';
// import ProfilePicture from "../profile-picture/ProfilePicture";

function PersonalInfo() {
    const[name, setName] = useState("");
    const[surname,setSurname] = useState("")
    const[email, setEmail] = useState("")
    const[username,setUsername] = useState("")
    const[userId,setUserId] = useState({});
   

    const dispatch = useDispatch()
    
    const userUpdate = useSelector(state => state.userUpdate)
    const{success:userUpdateSuccess, error:updateError} = userUpdate
    
    const userDetails = useSelector(state => state.userDetails)
    const{user} = userDetails

  

    useEffect(()=>{
        
      if(!user.name || (user._id !== userId)) {
          dispatch(listUserDetails(userId))
      }else {
          setName(user.name)
          setSurname(user.surname)
          setEmail(user.email)
          setUsername(user.username)
      }   
  },[dispatch,user,userId])

    useEffect(() => {
      try {
          const token = localStorage.getItem('user')
          if(token) {
              const useri = jwt_decode(token)       
              setUserId(useri._id)
          }
      }catch(e) {
          console.log(e)
      }
  },[]) 

  


  const submitHandler = (e) => {
    e.preventDefault()

    dispatch(updateUser({
        _id:user._id,
        name,
        surname,
        email,
        username
    }))
    dispatch({type:USER_UPDATE_RESET })
  
    
}



  

  return (
    
    <div className="personal-info-div">
      {userUpdateSuccess?<Alert variant="success" className="personalInformationAlert mx-auto" >Your information was updated successfully</Alert>:updateError?<Alert variant="danger" className="personalInformationAlert mx-auto" >An error occured: {updateError}</Alert>:null}
      <Form className="personal-info-form spacing" onSubmit={submitHandler} >
      
        
        {/* <ProfilePicture /> */}
        {/* <Image src="holder.js/171x180" roundedCircle> */}
        <AiOutlineUserAdd roundedCircle className="aioutlineuseradd spacing" />
        <Form.Group controlId="formGroupName" className="spacing">
          {/* <Form.Label>Email address</Form.Label> */}
          <Form.Control type="text" placeholder="First Name" defaultValue={user.name} onChange={(e)=> setName(e.target.value)}/>
        </Form.Group>
        <Form.Group controlId="formGroupName" className="spacing">
          {/* <Form.Label>Email address</Form.Label> */}
          <Form.Control type="text" placeholder="Last Name" defaultValue={user.surname} onChange={(e)=> setSurname(e.target.value)}/>
        </Form.Group>
        <Form.Group controlId="formGroupUsername" className="spacing">
          {/* <Form.Label>Email address</Form.Label> */}
          <Form.Control type="text" placeholder="User's username" defaultValue={user.username} onChange={(e)=> setUsername(e.target.value)}/>
        </Form.Group>
        <Form.Group controlId="formGroupEmail" className="spacing">
          {/* <Form.Label>Email address</Form.Label> */}
          <Form.Control type="email" placeholder="User's email address" defaultValue={user.email} onChange={(e)=> setEmail(e.target.value)}/>
        </Form.Group>
        <div className="change-password-btn-div">
          <Button type="submit" className="change-password-btn">
            Edit my Information
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default PersonalInfo;

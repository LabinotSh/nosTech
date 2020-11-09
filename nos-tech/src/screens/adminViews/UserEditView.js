import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import {Form,Button, Alert} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {listUserDetails} from '../../redux/actions/userActions'
import './courseView.css'

const UserEditView = ({match}) => {
    
    const userId = match.params.id

    const[name, setName] = useState("");
    const[surname,setSurname] = useState("")
    const[email, setEmail] = useState("")
    const[username,setUsername] = useState("")
    const[role,setRole] = useState("")

    
    const dispatch = useDispatch();
    const userDetails = useSelector(state => state.userDetails)
    const{user} = userDetails

    // const courseUpdate = useSelector(state => state.courseUpdate)
    // const{success:courseUpdateSuccess} = courseUpdate
    

    useEffect(()=>{
        
        if(!user.name || (user._id !== userId)) {
            dispatch(listUserDetails(userId))
        }else {
            setName(user.name)
            setSurname(user.surname)
            setEmail(user.email)
            setUsername(user.username)
            setRole(user.role)
        }
        
        
        
    },[dispatch,user,userId])

    const submitHandler = (e) => {
        
        e.preventDefault()
        

        // dispatch(updateCourse({
        //     _id:courseId,
        //     name,
        //     description,
        //     price,
        //     category
        // }))
    }


    return (
        <>
            <Link to="/admins/users" className="btn btn-dark btn-sm my-3 mx-5">Go Back</Link>
            <Form onSubmit={submitHandler} className="my-4 px-5">
                <Alert variant="success">Course updated successfully</Alert>
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control size="sm" type="name" placeholder="Name" value={name} onChange={(e)=> setName(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId="surname">
                    <Form.Label>Surname</Form.Label>
                    <Form.Control size="sm" as="text" placeholder="Description" value={surname} onChange={(e)=> setSurname(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control size="sm" type="name" placeholder="" value={username} onChange={(e)=> setUsername(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control size="sm" type="name" placeholder="Category" value={email} onChange={(e)=> setEmail(e.target.value)}></Form.Control>
                </Form.Group>
                <Button type="submit" variant="primary">Submit</Button>

            </Form>
        </>
    )
}

export default UserEditView

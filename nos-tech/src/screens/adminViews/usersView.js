import React, {useEffect} from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import {Table, Button} from 'react-bootstrap'
import {listUsers, deleteUser} from '../../redux/actions/userActions'
import {useDispatch, useSelector} from 'react-redux'
import './courseView.css'


const UsersView = () => {
    const dispatch = useDispatch();
    
    const userList = useSelector(state => state.userList)
    const {users} = userList

    const userDelete = useSelector(state => state.userDelete)
    const {success:userDeleteSuccess} = userDelete

    
    useEffect(() => {
        dispatch(listUsers())
    }, [dispatch,userDeleteSuccess])

    

    const deleteUserHandler = (id) => {
        if(window.confirm("Are you sure?")) {
        dispatch(deleteUser(id))
        }
    }

    
    

    return (
        <>
            <h2 className="ml-5 text-black">USERS</h2>
            <div className="smaller">
            <Table striped bordered hover  size="sm"  >
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>FIRST NAME</th>
                        <th>LAST NAME</th>
                        <th>USERNAME</th>
                        <th>EMAIL</th>
                        <th>ROLE</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user =>(
                        <tr key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.name}</td>
                            <td>{user.surname}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                                <LinkContainer to={`/admins/user/${user._id}/edit`}>
                                    <Button variant="light" className="btn-sm" style={{fontWeight: 'bold'}}>
                                    Edit
                                    </Button>
                                </LinkContainer>
                                
                            </td>
                            <td>
                                    <Button variant="danger" className="btn-sm" style={{fontWeight: 'bold'}} onClick={() => deleteUserHandler(user._id)}>
                                        Delete
                                    </Button>
                                
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            </div>
        </>
    )
}

export default UsersView

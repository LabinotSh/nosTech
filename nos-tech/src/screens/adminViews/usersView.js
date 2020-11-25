import React, {useEffect,useState} from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import {Table, Button} from 'react-bootstrap'
import {listUsers, deleteUser} from '../../redux/actions/userActions'
import {useDispatch, useSelector} from 'react-redux'
import './courseView.css'
import Panel from '../../components/panel/Panel';
import Pagination from '../../components/pagination/Pagination';
import { USER_DELETE_RESET } from '../../redux/actions/types'


const UsersView = () => {
    const dispatch = useDispatch();
    
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);

    const userList = useSelector(state => state.userList)
    const {users} = userList

    const userDelete = useSelector(state => state.userDelete)
    const {success:userDeleteSuccess} = userDelete

     //Pagination
	const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = users.slice(indexOfFirstPost, indexOfLastPost);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);
    
    useEffect(() => {
        if(userDeleteSuccess) {
            dispatch({type: USER_DELETE_RESET})
        }
        dispatch(listUsers())
    }, [dispatch,userDeleteSuccess])

    

    const deleteUserHandler = (id) => {
        if(window.confirm("Are you sure?")) {
        dispatch(deleteUser(id))
        }
    }

    return (
        <>
            <Panel />
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
                        <th>EDIT</th>
                        <th>DELETE</th>
                    </tr>
                </thead>
                <tbody>
                    {currentPosts.map(user =>(
                        <tr key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.name}</td>
                            <td>{user.surname}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                                <LinkContainer to={`/admins/user/${user._id}/edit`}>
                                <i className="pl-2 fa fa-edit category-edit" />
                                </LinkContainer>
                                
                            </td>
                            <td>
                                <i onClick={() => deleteUserHandler(user._id)} className="pl-3 fa fa-trash category-trash" />                           
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            </div>
            <div className="d-flex justify-content-center">
            <Pagination
            postsPerPage={postsPerPage}
            totalPosts={users.length}
            paginate={paginate}
            />
            </div>
        </>
    )
}

export default UsersView

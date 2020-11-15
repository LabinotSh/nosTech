import React, {useEffect} from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import {Table, Button} from 'react-bootstrap'
import {listCourses, deleteCourse} from '../../redux/actions/courseActions'
import {useDispatch, useSelector} from 'react-redux'
import './courseView.css'


const CoursesView = ({history}) => {
    const dispatch = useDispatch();

    const  courseList = useSelector(state => state.courseList)
    const {courses} = courseList

    const courseDelete = useSelector(state => state.courseDelete)
    const {success:courseDeleteSuccess} = courseDelete

    const user = localStorage.getItem("user")
    

    useEffect(() => {
        dispatch(listCourses())
        console.log("testttt")
    }, [courseDeleteSuccess,dispatch])

    const deleteHandler = (id) => {
        if(window.confirm("Are you sure?")) {
        dispatch(deleteCourse(id))
        }
    }

    
    

    return (
        <>
            <h2 className="ml-5 text-black">Courses</h2>
            <div className="smaller">
            <Table striped bordered hover  size="sm"  >
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>DESCRIPTION</th>
                        <th>PRICE</th>
                        <th>CATEGORY</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map(course =>(
                        <tr key={course._id}>
                            <td>{course._id}</td>
                            <td>{course.name}</td>
                            <td>{course.description}</td>
                            <td>{course.price}</td>
                            <td>{course.category}</td>
                            <td>
                                <LinkContainer to={`/admins/course/${course._id}/edit`}>
                                    <Button variant="light" className="btn-sm" style={{fontWeight: 'bold'}}>
                                    Edit
                                    </Button>
                                </LinkContainer>
                                
                            </td>
                            <td>
                                    <Button variant="danger" className="btn-sm" style={{fontWeight: 'bold'}} onClick={() => deleteHandler(course._id)}>
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

export default CoursesView

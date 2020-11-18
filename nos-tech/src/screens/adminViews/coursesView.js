import React, {useEffect,useState} from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import {Table, Button} from 'react-bootstrap'
import {listCourses, deleteCourse} from '../../redux/actions/courseActions'
import {useDispatch, useSelector} from 'react-redux'
import './courseView.css'
import Panel from '../../components/panel/Panel';
import Pagination from '../../components/pagination/Pagination';

const CoursesView = ({history}) => {
    const dispatch = useDispatch();

    const  courseList = useSelector(state => state.courseList)
    const {courses} = courseList

    const courseDelete = useSelector(state => state.courseDelete)
    const {success:courseDeleteSuccess} = courseDelete

    const user = localStorage.getItem("user")
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);

    //Pagination
	const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = courses.slice(indexOfFirstPost, indexOfLastPost);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

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
        <Panel />
            <div className="smaller">
            <Table striped bordered hover  size="sm"  >
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>DESCRIPTION</th>
                        <th>PRICE</th>
                        <th>CATEGORY</th>
                        <th>EDIT</th>
                        <th>DELETE</th>
                    </tr>
                </thead>
                <tbody>
                    {currentPosts.map(course =>(
                        <tr key={course._id}>
                            <td>{course._id}</td>
                            <td>{course.name}</td>
                            <td className="courses-table-dsc">{course.description}</td>
                            <td>{course.price}</td>
                            <td>{course.category}</td>
                            <td>
                                <LinkContainer to={`/admins/course/${course._id}/edit`}>
                                    <i className="pl-2 fa fa-edit category-edit" />
                                </LinkContainer>
                            </td>
                            <td>
                                    <i onClick={() => deleteHandler(course._id)} className="pl-3 fa fa-trash category-trash" />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            </div>
            <div className="d-flex justify-content-center">
            <Pagination
            postsPerPage={postsPerPage}
            totalPosts={courses.length}
            paginate={paginate}
            />
            </div>
        </>
    )
}

export default CoursesView

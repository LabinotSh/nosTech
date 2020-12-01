import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import * as actions from "../../redux/actions/postTags";
import PostTagsForm from "./PostTagsForm";
import './Tags.css'
import Panel from '../panel/Panel'; 
import Pagination from '../pagination/Pagination';

const PostTags = ({ classes, ...props }) => {
    //const {classes, ...props} = props
    const [currentId, setCurrentId] = useState(0)
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(9);

       //Pagination
	const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = props.postTagsList.slice(indexOfFirstPost, indexOfLastPost);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    useEffect(() => {
        props.fetchAllPostTags()
    }, [])//DidMount

    const onDelete = id => {
        const onSuccess = () => {
            alert('Tag was deleted succesfuly')
        }
        if (window.confirm('Are you sure to delete this tag?'))
            props.deletePostTags(id,onSuccess)
    }


    return (
       
        <div className="col-xl-12 row container">
            {/* Panel */}
            <Panel /> 

            {/* Left Content */}
            <div className="col-xl-5">
                    <PostTagsForm {...{ currentId, setCurrentId }} />
            </div>


            {/* Right Content */}
            <div className="col-xl-5">
            <p className="unique-tag">*Tag name should be unique*</p>
            <table className="table table-sm table-hover tags-table">
            <thead>
                <tr>
                <th scope="col" style={{fontWeight:"400"}}>#Tags</th>
                <th scope="col" style={{fontWeight:"400",color:"#ff4a03"}}>Delete</th>
                <th scope="col" style={{fontWeight:"400",color:"#193e82"}}>Edit</th>
                </tr>
            </thead>
            <tbody>
            {currentPosts.map((record, index) => {
            return(
            <Fragment key={index}>
            <tr>
            <th scope="row" style={{fontWeight:"300"}}>{record.name}</th>
            <th scope="row"><i onClick={() => onDelete(record._id)} className="pl-3 fa fa-trash tags-trash" /></th>
            <th scope="row"><i onClick={() => setCurrentId(record._id)} className="pl-2 fa fa-edit tags-edit" /></th>
            </tr>
            </Fragment>
            )})}
            
            </tbody>
            </table>
            <div className="d-flex justify-content-center">
            <Pagination
            postsPerPage={postsPerPage}
            totalPosts={props.postTagsList.length}
            paginate={paginate}
            />
            </div>
        </div>
        </div>
    );
}

const mapStateToProps = state => ({
    postTagsList: state.postTags.list
})

const mapActionToProps = {
    fetchAllPostTags: actions.fetchAll,
    deletePostTags: actions.Delete
}

export default connect(mapStateToProps, mapActionToProps)((PostTags));

import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import * as actions from "../../redux/actions/postCategory";
import PostCategoryForm from "./PostCategoryForm";
import './Category.css'

const PostCategories = ({ classes, ...props }) => {
    //const {classes, ...props} = props
    const [currentId, setCurrentId] = useState(0)

    useEffect(() => {
        props.fetchAllPostCategories()
    }, [])//DidMount

    const onDelete = id => {
        const onSuccess = () => {
            alert('Category was deleted succesfuly')
        }
        if (window.confirm('Are you sure to delete this category?'))
            props.deletePostCategory(id,onSuccess)
    }


    return (
        <div className="col-xl-12 row container">
            {/* Left Content */}
            <div className="col-xl-6">
                    <PostCategoryForm {...{ currentId, setCurrentId }} />
            </div>


            {/* Right Content */}
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
            {props.postCategoryList.map((record, index) => {
            return(
            <Fragment key={index}>
            <tr>
            <th scope="row" style={{fontWeight:"300"}}>{record.name}</th>
            <th scope="row"><i onClick={() => onDelete(record._id)} className="pl-3 fa fa-trash category-trash" /></th>
            <th scope="row"><i onClick={() => setCurrentId(record._id)} className="pl-2 fa fa-edit category-edit" /></th>
            </tr>
            </Fragment>
            )})}
            
            </tbody>
            </table>
        </div>
        </div>
    );
}

const mapStateToProps = state => ({
    postCategoryList: state.postCategory.list
})

const mapActionToProps = {
    fetchAllPostCategories: actions.fetchAll,
    deletePostCategory: actions.Delete
}

export default connect(mapStateToProps, mapActionToProps)((PostCategories));

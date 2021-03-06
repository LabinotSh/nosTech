import React,{useState,useEffect,Fragment} from 'react';
import { connect } from "react-redux";
import * as actions from "../../redux/actions/postCategory";
import './Banner.css';
import {Link} from 'react-router-dom';


const CourseBannerComponent = ({classes, ...props}) => {

    useEffect(() => {
        props.fetchAllPostCategories()
    }, [])//DidMount
   
    return(
        <div className="CourseBanner">
        <div className="container">
        <h1 className="Coursebanner-title pt-5 pb-3">NosTech Courses</h1>
         {props.postCategoryList.slice(0,5).map((record, index) => {
            return(
            <Fragment key={index}>
                <div style={{display: "inline"}} key={index} >
                <Link 
                className="courseBanner-button mb-5" 
                to = {`/coursecategory/${record.name}`}>
                    {record.name}
                </Link>
                </div>
            </Fragment>
            )})}
       
        </div>
        </div>
    )
}

const mapStateToProps = state => ({
    postCategoryList: state.postCategory.list
})

const mapActionToProps = {
    fetchAllPostCategories: actions.fetchAll
}

export default connect(mapStateToProps, mapActionToProps)((CourseBannerComponent));
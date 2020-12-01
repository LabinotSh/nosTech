import React,{useState,useEffect,Fragment} from 'react';
import { connect } from "react-redux";
import * as actions from "../../redux/actions/postTags";
import './Banner.css';
import {Link} from 'react-router-dom';


const CourseTagBanner = ({classes, ...props}) => {

    useEffect(() => {
        props.fetchAllPostTags()
    }, [])//DidMount
   
    return(
        <div className="CourseCategory-Banner">
        <div className="container">
        <h1 className="Coursebanner-title pt-5 pb-3">NosTech Courses</h1>
         {props.postTagsList.map((record, index) => {
            return(
            <Fragment key={index}>
                <div style={{display: "inline"}} key={index} >
                <Link 
                className="courseCatBanner-button mb-5" 
                to = {`/topics/${record._id}`}>
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
    postTagsList: state.postTags.list
})

const mapActionToProps = {
    fetchAllPostTags: actions.fetchAll
}

export default connect(mapStateToProps, mapActionToProps)((CourseTagBanner));
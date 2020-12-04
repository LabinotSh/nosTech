import React,{useState,useEffect,Fragment} from 'react';
import { connect } from "react-redux";
import * as actions from "../../redux/actions/postTags";
import './Banner.css';
import {Link} from 'react-router-dom';
import Carousel from '../carousel/Carousel';
import responsive from '../../constants/carouselTagCourse';

const CourseTagBanner = ({classes, ...props}) => {

    useEffect(() => {
        props.fetchAllPostTags()
    }, [])//DidMount
   
    const retrievetags = () => {
        return props.postTagsList.map((record, index) => {
            return(
            <Fragment key={index}>
                <div style={{display: "inline"}} key={index} >
                <Link 
                className="courseTag-button mb-5" 
                to = {`/topics/${record.name}`}>
                <i className="fa fa-hashtag pr-1" />{record.name}
                </Link>
                </div>
            </Fragment>
            )})
    }
    return(
        <div className="CourseTag-Banner">
        <div className="container">
        <h1 className="CourseTag-title pt-5 pb-3">NosTech Topics</h1>
        <Carousel 
          responsive={responsive}  
          disableDotsControls={false}
          disableButtonsControls={true}
          >
		{retrievetags()}
		</Carousel>
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
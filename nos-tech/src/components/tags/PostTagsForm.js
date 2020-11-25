import React, { useEffect, useState } from "react";
import useForm from "./useForm";
import { connect } from "react-redux";
import * as actions from "../../redux/actions/postTags";


const initialFieldValues = {
    name: '',
}

const PostTagsForm = ({ classes, ...props }) => {

    useEffect(() => {
        if (props.currentId != 0){
            setValues({
                ...props.postTagsList.find(x => x._id == props.currentId)
            })
            setErrors({})
        }
    }, [props.currentId])

    const validate = () => {
        let temp = { ...errors }
        temp.name = values.name ? "" : "This field is required."
        setErrors({
            ...temp
        })
        return Object.values(temp).every(x => x == "")
    }

    var {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFieldValues,props.setCurrentId)

    const handleSubmit = e => {
        e.preventDefault()
        const onSuccess = () => {
            resetForm()
        }
        if (validate()) {
            if (props.currentId == 0)
                props.createPostTags(values, onSuccess)
            else
                props.updatePostTags(props.currentId, values, onSuccess)
        }
    }

    return (
        <div className="col-xl-6">
        <form className="tags-form" onSubmit={handleSubmit}>
        <div className="form-group tags-part">
            <input 
            type="text"  
            id="name" 
            name="name" 
            value={values.name} 
            onChange={handleInputChange}
            placeholder="enter name..."
            style={{width:"250px"}}
            className="form-control text-white bg-transparent"
            />
            <span className="tags-input-error" {...(errors.name && { error: true })}>
                {errors.name}
            </span>
        </div>
        <button type="submit" className="tags-button">
                            Submit
        </button>
        </form>
        </div>
    );
}


const mapStateToProps = state => ({
    postTagsList: state.postTags.list
})

const mapActionToProps = {
    createPostTags: actions.create,
    updatePostTags: actions.update
}


export default connect(mapStateToProps, mapActionToProps)((PostTagsForm));
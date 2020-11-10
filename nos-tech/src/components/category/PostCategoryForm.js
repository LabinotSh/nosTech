import React, { useEffect, useState } from "react";
import useForm from "./useForm";
import { connect } from "react-redux";
import * as actions from "../../redux/actions/postCategory";


const initialFieldValues = {
    name: '',
}

const PostCategoryForm = ({ classes, ...props }) => {

    useEffect(() => {
        if (props.currentId != 0){
            setValues({
                ...props.postCategoryList.find(x => x._id == props.currentId)
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
                props.createPostCategory(values, onSuccess)
            else
                props.updatePostCategory(props.currentId, values, onSuccess)
        }
    }

    return (
        <div className="col-xl-6">
        <form className="category-form" onSubmit={handleSubmit}>
        <div className="form-group category-part">
            <input 
            type="text"  
            id="name" 
            name="name" 
            value={values.name} 
            onChange={handleInputChange}
            placeholder="enter name..."
            style={{width:"250px"}}
            className="form-control text-white bg-transparent"
            {...(errors.name && { error: true, helperText: errors.name })}
            />
        </div>
        <button type="submit" className="category-button">
                            Submit
        </button>
        </form>
        </div>
    );
}


const mapStateToProps = state => ({
    postCategoryList: state.postCategory.list
})

const mapActionToProps = {
    createPostCategory: actions.create,
    updatePostCategory: actions.update
}


export default connect(mapStateToProps, mapActionToProps)((PostCategoryForm));
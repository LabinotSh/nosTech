import React from 'react'
import {Create, NumberInput, SimpleForm, TextInput} from 'react-admin'

const CourseCreate = (props) => {
    return (
        <Create title="create course" {...props}>
            <SimpleForm>
                <TextInput source="name"></TextInput>
                <TextInput multiline source="description"></TextInput>
                <NumberInput source="price"></NumberInput>
            </SimpleForm>
        </Create>
    )
}

export default CourseCreate

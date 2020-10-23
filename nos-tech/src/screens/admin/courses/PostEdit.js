import React from 'react'
import { Edit, SimpleForm, TextInput, NumberInput} from 'react-admin'

const PostEdit = (props) => {
    return (
        <Edit title="Edit Course" undoable={false} {...props}>
            <SimpleForm>
                <TextInput source="id" disabled></TextInput>
                <TextInput source="name"></TextInput>
                <TextInput multiline source="description"></TextInput>
                <NumberInput source="price"></NumberInput>
            </SimpleForm>
        </Edit>
    )
}

export default PostEdit

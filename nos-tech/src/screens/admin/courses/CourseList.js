import React from 'react'
import {List, Datagrid, TextField, EditButton, DeleteButton, NumberField, DateField, ArrayField, SingleFieldList, ChipField, SimpleFormIterator, TextInput} from 'react-admin';


const CourseList = (props) => {
    return (
        <List {...props}>
            <Datagrid>
                <TextField source="id" />
                <TextField source="name"/>
                <TextField source="description"/>
                <NumberField source="price"></NumberField>
                <TextField source="image"></TextField>
                <DateField source="createdAt"></DateField>
                <DateField source="updatedAt"></DateField>
                <EditButton basePath="/course"></EditButton>
                <DeleteButton basePath="/course"></DeleteButton>
            </Datagrid>
        </List>
    )
}

export default CourseList

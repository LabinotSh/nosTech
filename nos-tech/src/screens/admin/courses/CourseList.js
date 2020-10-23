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
                <ArrayField source="users">
                  <Datagrid className="users" className="users">
                   <TextField source="_id"/>
                    <TextField source="name" />
                    <TextField source="surname" />
                    <TextField source="email" />
                  </Datagrid>
                </ArrayField>
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

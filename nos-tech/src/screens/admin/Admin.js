import React from 'react'
import {Admin, Resource} from 'react-admin'
import restProvider from 'ra-data-rest-client'
import CourseList from './courses/CourseList'
import CourseCreate from './courses/CourseCreate'
import PostEdit from './courses/PostEdit'
import './admin.css';


const Adm = () => {
    return (
        <Admin dataProvider={restProvider('http://localhost:3000/api', {
            "course": "_id",
            "user":"_id"
        })}>    
            <Resource name='course' list={CourseList} create={CourseCreate} edit={PostEdit}/>
        </Admin>
    )
}

export default Adm;

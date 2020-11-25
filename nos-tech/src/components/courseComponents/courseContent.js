import React,{useState,useEffect} from 'react'
import axios from 'axios'
import CourseItem from '../../screens/courses/CourseItem';
import './courseComponent.css';
import LoadMore from '../loadMore/LoadMore';

const CourseContent = () => {
    
    const [items, setItems] = useState(['']);
    const [visible, setVisible] = useState(3);

    const fetchCourses = () => {
        axios.get('/api/course/')
        .then((response) =>{
        setItems(response.data.filter(x => x.status === 1).reverse());
        })
        .catch((err) => {
            console.log(err);
        })
    }

    // Load more function
    const loadMore = () => {
        setVisible(prevValue => prevValue + 3)
    }

    useEffect(() =>{
        fetchCourses();
    }, [])

    return(
        <>
        <p className="courses-headline">NosTech All Courses</p>
        <div className="container row mx-auto">
            {items.slice(0, visible).map((item, idx) => {
                return(
                <div className="course-content-items">
                    <CourseItem course={item} key={idx._id} />
                </div>
                )
            })}
        </div>
        {visible < items.length &&
        <LoadMore 
        loadMore={loadMore}
        />
        }
        </>
    )
}

export default CourseContent
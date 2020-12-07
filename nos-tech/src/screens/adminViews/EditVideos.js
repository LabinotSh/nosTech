import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {listCourseDetails} from '../../redux/actions/courseActions'
import {Table, Alert} from 'react-bootstrap'
import LeftContent from '../../components/courseComponents/postform'
import axios from 'axios'
import './courseView.css'
import Panel from '../../components/panel/Panel';
import { Link } from 'react-router-dom'

const EditVideos = ({match}) => {
    const courseId = match.params.id
    const [videos, setVideos] = useState([])
    const [successUpdate, setSuccessUpdate] = useState(false)
    const [successDelete, setSuccessDelete] = useState(false)
    const [text, setText] = useState("Choose your video/s")


    const dispatch = useDispatch();
    const courseDetails = useSelector(state => state.courseDetails)
    const{course} = courseDetails

    

    const[loading,setLoading] = useState("")
    const uploadFileHandler = async (e) => {
        const files = e.target.files
        let length = 0;
        const formData = new FormData()
        for(const file of files) {
            formData.append('video',file)
            length++;
        }
        setLoading(true)
        setText("Uploading...")
        
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            const {data} = await axios.post('/api/uploadVideo',formData,config)       
            if(data) {
                await axios.post(`/api/course/${courseId}/addVideos`, {videos:data})
            }
            setText((length === 1? "1 file":length + " files" ) + " uploaded")
            setLoading(false)
            setSuccessUpdate(true)

        }catch(e){
            setSuccessUpdate(false)
            
            
        }
    }

    const deleteVideoHandler = async (video) => {
        try {
            if(window.confirm("Are you sure?")) {
                
                console.log(typeof video)
                await axios.put(`/api/course/${courseId}/deleteVideo`,{video:video})
                setSuccessDelete(true)
            }
        }catch(e) {
            
        }
    }

    
    useEffect(()=>{
        if(!course.name || successUpdate || successDelete || (course._id !== courseId)) {
            dispatch(listCourseDetails(courseId))
        }
            
            setVideos(course.videos)
            setSuccessUpdate(false)
            setSuccessDelete(false)
    },[dispatch,course,courseId,successUpdate,successDelete])
    
    console.log(successUpdate)
    
    return (
        <>
        <Panel />
        <div className="mx-auto mb-5 mt-2 videoForm-container">
            
            {(successUpdate === true)?
                <Alert variant="success">He</Alert>:null
            }
            <div className="d-flex" >
                <LeftContent  />
                <div className="d-flex justify-content-center flex-column w-50">
                <p className="addVideo">Submit your videos for the course</p>
                    <div className="input-group mt-3 mx-auto mb-5 w-75 ml-3">
                        <div className="custom-file">
                            <input type="file" accept=".mp4, .webm" multiple onChange={uploadFileHandler} className="custom-file-input" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01"></input>
                            
                            <label className="custom-file-label" htmlFor="inputGroupFile01">{text}</label>
                        </div>
                    </div>
                    <div className="smaller videosTable mx-auto w-75">
                        <Table striped bordered hover className="">
                            <thead>
                                <tr>
                                    <th>Video</th>
                                    <th width="50px">Delete</th>
                                </tr>
                                {videos.map((video,i) => (
                                    <tr key={i}>
                                        <td>{video}</td>
                                        <td><i className="pl-2 fa fa-trash category-trash" onClick={() => deleteVideoHandler(JSON.stringify(video))}/></td>
                                    </tr>
                                ))}
                            </thead>
                        </Table>
                    </div>  
                <div className="mx-auto mt-3">
                <Link to="/admins/dashboard" className="edit-video-done-buton">
                    Done
                </Link> 
                </div>    
                </div>
            </div>    
        </div>
        </>
    )
}

export default EditVideos

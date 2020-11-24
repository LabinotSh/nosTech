import React, {useState} from 'react'
import axios from 'axios'

const Upload = (props) => {
    const[loading,setLoading] = useState("")
    const uploadFileHandler = async (e) => {
        const files = e.target.files 
        const formData = new FormData()
        for(const file of files) {
            formData.append('video',file)
        }
        setLoading(true)
        
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            const {data} = await axios.post('/api/uploadVideo',formData,config)       
            if(data) {
                await axios.post('/api/course/5f894db086661e32081fd2bd/addVideos', {videos:data})
            }

            setLoading(false)

        }catch(e){
            console.log(e)
        }
    }

    return (
        <div>
            <h2>Test</h2>
            
            <video controls="controls" width="600px" height="300px"></video>
            <form>
                <label htmlFor="fileUpload">Choose a File:</label>
                <input type="file" multiple onChange={uploadFileHandler}></input>
                
            </form>

            <div className="input-group">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="inputGroupFileAddon01">Upload</span>
                </div>
                <div className="custom-file">
                    <input type="file" multiple onChange={uploadFileHandler} className="custom-file-input" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01"></input>
                    
                    <label className="custom-file-label" htmlFor="inputGroupFile01">Choose file</label>
                </div>
            </div>

            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="inputGroupFileAddon01">Upload</span>
                </div>
                <div className="custom-file">
                    <input type="file" className="custom-file-input" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01" /> 
                    <label className="custom-file-label" htmlFor="inputGroupFile01">Choose file</label>
                </div>
            </div>

            <div className="input-group">
                <div className="custom-file">
                    <input type="file" className="custom-file-input" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" />
                    <label className="custom-file-label" htmlFor="inputGroupFile04">Choose file</label>
                </div>
                <div className="input-group-append">
                    <button className="btn btn-outline-secondary" type="button" id="inputGroupFileAddon04">Button</button>
                </div>
            </div>
            
        </div>
    )
}

export default Upload

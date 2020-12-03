import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {ComposedChart,Legend,Bar,Line,XAxis,YAxis,CartesianGrid,Tooltip,Area} from 'recharts'

const LineChart = () => {

    const [course, setCourse] = useState([''])

    const fetchCourse = async () => {
        try{
            axios
            .get('/api/course/')
            .then((response) => {
                setCourse(response.data)
            })
            .catch((err) => {
                console.log(err)
            })
        }
        catch{
            console.log('Error while trying to fetch courses...')
        }
    }

    useEffect(() => {
        fetchCourse()
    }, [])

    const AllCourses = () => {
        return course.length;
    }
    console.log('number is: ' + AllCourses())

    const OnHold = () => {
        return course.filter(x => x.status === 0).length;
    }
   

    const Approved = () => {
        return course.filter(x => x.status === 1).length;
    }
   

    const Refused = () => {
        return course.filter(x => x.status === 2).length;
    }
   

    const data = [
        {
          "name": "Courses",
          "uv": AllCourses(),
          "pv": AllCourses(),
          "amt": AllCourses(),
        },
        {
          "name": "On Hold",
          "uv": AllCourses(),
          "pv": OnHold(),
          "amt": OnHold()
        },
        {
          "name": "Approved",
          "uv": AllCourses(),
          "pv": Approved(),
          "amt": Approved()
        },
        {
            "name": "Refused",
            "uv": AllCourses(),
            "pv": Refused(),
            "amt": Refused()
        }
      ]

    return (
        <>
        <div className="card mt-5 Line-chart-card">                        
        <ComposedChart width={500} height={320} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid stroke="#f5f5f5" />
        <Area type="monotone" dataKey="amt" fill="#6087ab" stroke="#6087ab" />
        <Bar dataKey="pv" barSize={20} fill="#284969" />
        <Line type="monotone" dataKey="uv" stroke="#1871c4" />
        </ComposedChart>
        </div> 
        </>
    )
}

export default LineChart
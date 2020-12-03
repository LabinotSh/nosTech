import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {RadarChart,PolarGrid,PolarAngleAxis,PolarRadiusAxis,Radar,Legend} from 'recharts'

const DashboardRadar = () => {

    const [category, setCategory] = useState(['']);
    const [course, setCourse] = useState(['']);

    const fetchCourse = async () => {
        try{
            axios.get('/api/course/')
            .then((response) =>{
                setCourse(response.data)
            })
            .catch((err) => {
                console.log(err)
            })
        }
        catch{
            console.log('No course was fetched')
        }
    }

    const fetchCategory = async ()  => {
        try{
            axios.get(`/api/category/`)
            .then((response) => {
                setCategory(response.data)
            })
            .catch((err) => {
                console.log(err)
            })
        }
        catch{
            console.log('No Category was fetched')
        }
    }

    useEffect(() => {
        fetchCategory();
    }, [])

    useEffect(() => {
        fetchCourse()
    }, [])


    const SoftwareDevelopment = () => {
        return course.filter(x => x.category == 'Software Development').length;
    }
  

    const WebDevelopment = () => {
        return course.filter(x => x.category == 'Mobile & Web Development').length;
    } 


    const Algorithms = () => {
        return course.filter(x => x.category == 'Algorithms').length;
    } 


    const MachineLearning = () => {
        return course.filter(x => x.category == 'Machine Learning').length;
    } 


    const Design = () => {
        return course.filter(x => x.category == 'Design and Product').length;
    } 


    const data = category.map(item => (
        {
            "subject": item.name,
            "WebDevelopment": WebDevelopment() * 20,
            "Software Development": SoftwareDevelopment() * 20,
            "Algorithms": Algorithms() * 40,
            "MachineLearning": MachineLearning() * 80,
            "Design and Product": Design() *50,
            "fullMark": 150
        }
    ))
    
    return (
        <>
        <div className="card radar-card">
        <RadarChart outerRadius={90} width={520} height={250} data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis angle={30} domain={[0, 150]}/>
        {category.filter(x => x.name == 'Software Development' ).map(item => (
        <Radar name={item.name} dataKey="Software Development" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
        ))
        }
        {category.filter(x => x.name == 'Machine Learning' ).map(item => (
        <Radar name={item.name} dataKey="MachineLearning" stroke="#f58251" fill="#f58251" fillOpacity={0.6} />
        ))
        }
        {category.filter(x => x.name == 'Algorithms' ).map(item => (
        <Radar name={item.name} dataKey="Algorithms" stroke="#f5be51" fill="#f5be51" fillOpacity={0.6} />
        ))
        }
        {category.filter(x => x.name == 'Mobile & Web Development' ).map(item => (
        <Radar name={item.name} dataKey="WebDevelopment" stroke="#a3ceff" fill="#a3ceff" fillOpacity={0.6} />
        ))
        }
        {category.filter(x => x.name == 'Design and Product' ).map(item => (
        <Radar name={item.name} dataKey="Design and Product" stroke="#51c1f5" fill="#51c1f5" fillOpacity={0.6} />
        ))
        }
        <Legend />
        </RadarChart>
        </div> 
        </>
    )
}
export default DashboardRadar
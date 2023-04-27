import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";
import Navbar from './Navbar';

const ViewOne = () => {
    const [projectList, setProjectList] = useState({});
    const { id } = useParams(); 
    const navigate = useNavigate();

    const date = new Date(projectList.dueDate);
    const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;


    useEffect(() => {
        axios.get(`http://localhost:8000/api/projects/${id}`)
            .then(res => {
                console.log(res.data);
                setProjectList(res.data);
            })
            .catch(err => console.log(err));
    }, []);
console.log(id)
    return (
        <div>
            < Navbar />
            <h3>Project Name: {projectList.projectName}</h3>
            <p>Description: {projectList.description}</p>
            <p>Tasks: {projectList.tasks && projectList.tasks.join(', ')}</p>
            <p>Due Date: {formattedDate}</p>
            <p>Completed: {projectList.completedStatus}</p>


        </div>
    );
}

export default ViewOne;
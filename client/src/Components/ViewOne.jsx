import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";
import Navbar from './Navbar';
import background from '../images/pexels-fauxels-3183186.jpg'

const ViewOne = () => {
    const [projectList, setProjectList] = useState({});
    const { id } = useParams();
    const userId = window.localStorage.getItem("userID")
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    const date = new Date(projectList.dueDate);
    const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;


    useEffect(() => {
        axios.get((`http://localhost:8000/api/projects/${id}`), { withCredentials: true })
            .then(res => {
                console.log(res.data);
                setProjectList(res.data);
            })
            .catch(err => console.log(err));
    }, []);


    useEffect(() => {
        axios.get(`http://localhost:8000/api/users/${projectList.userOwner}`, { withCredentials: true })
            .then(res => {
                console.log(res.data);
                setUser(res.data);
            })
            .catch(err => console.log(err));
    }, [projectList.userOwner]);



    return (
        <div>
            < Navbar />
            <div>
                <div className="container-fluid vh-100 d-flex justify-content-center align-items-center" style={{ backgroundImage: `url(${background})`, backgroundSize: "cover" }}>
                    <div className='row'>
                        <div className='w-100'>
                            <div className="card p-5 fw-bold" style={{ backgroundColor: 'rgb(228,201,171)', border: '2px solid black', borderRadius: '10px', width: '500px', margin: '0auto' }}>
                                <h3 className='page-title-view'>Project Name: {projectList.projectName}</h3>
                                <div className='project-view-info text-center'>
                                    <p>Description: {projectList.description}</p>
                                    <p>Tasks: {projectList.tasks && projectList.tasks.join(', ')}</p>
                                    <p>Due Date: {formattedDate}</p>
                                    <p>Completed: {projectList.completedStatus ? 'Yes' : 'No'}</p>
                                    <p>Created By: {user.firstName} {user.lastName} </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            );
}

            export default ViewOne;
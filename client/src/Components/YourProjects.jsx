import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import Navbar from "./Navbar";
import background from '../images/pexels-ylanite-koppens-796602.jpg'

const YourProjects = (props) => {
    console.log(props)
    const {projectList, setProjectList} = props;
    const userId = window.localStorage.getItem("userID")
    
    const canEdit = (projectOwnerId) => {
        console.log(userId)
        console.log(projectOwnerId)
        return userId === projectOwnerId;
    }

    const [user, setUser] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:8000/api/projects`, {withCredentials:true})
            .then((res) => {
                console.log(res.data.Project);
    
                if (Array.isArray (res.data.Project)){
                    const filteredProjects = res.data.Project.filter(project => project.userOwner === userId);
                    setProjectList(filteredProjects);
                } else {
                    console.log("Error response data is not an array")
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);


    const removeFromDOM = id => {
        axios.delete(`http://localhost:8000/api/projects/${id}`, {withCredentials:true})
            .then((res) => {
                console.log(res.data)
                setProjectList(projectList.filter(project => project._id !== id));
            })
            .catch((err) => {
                console.log(err);
            })

    }



    console.log(projectList)
    return (
    <div>
        <Navbar/>
        <div className="container-fluid vh-100" style={{ backgroundImage: `url(${background})`, backgroundSize: "cover" }}>
        <h2 className="page-title-dash">Welcome To Your Projects</h2>
        <table className="table table-hover table-striped">
        <thead>
            <tr>
            <th scope="col">Project Name</th>
            <th scope="col">Tasks</th>
            <th scope="col">Due Date</th>
            <th scope="col">Completed</th>
            <th scope="col">Actions</th>
            </tr>
        </thead>
        <tbody>
            {
            projectList.map((project, index) => {
                const date = new Date(project.dueDate);
                const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
                return ( 
                    <tr key={index}>
                    <td className={`${project.completedStatus ? "text-decoration-line-through":""}`}>{project.projectName}</td>
                    <td className={`${project.completedStatus ? "text-decoration-line-through":""}`}>{project.tasks.join(', ')}</td>
                    <td className={`${project.completedStatus ? "text-decoration-line-through":""}`}>{formattedDate}</td>
                    <td>{project.completedStatus ? 'Yes':'No'}</td>
                    <td> 
                    {canEdit(project.userOwner)  ? (

                    <button className="btn btn-warning"><Link to={`/project/${project._id}`}>Edit</Link></button> 
                    ):null}
                    <button className="btn btn-info"><Link to={`/projects/${project._id}`}>View</Link></button>
                    {canEdit(project.userOwner) ? (

                        <button className="btn btn-danger" onClick={(e)=>{removeFromDOM(project._id)}}>Delete</button>
                        ) : null
                    }
                    
                    </td>
                </tr> )
            })
            }
        </tbody>
        </table>
        </div>
    </div>
    );
}

export default YourProjects
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import axios from 'axios';
import Navbar from './Navbar';
import background from '../images/pexels-karol-d-323645.jpg';

const AddProject = ({ setLoggedIn }) => {
    const [projectList, setProjectList] = useState([]);
    const [projectName, setProjectName] = useState("");
    const [tasks, setTasks] = useState([]);
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [completedStatus, setCompletedStatus] = useState(false);
    const [user, setUser] = useState([]);
    const [selectedOption, setSelectedOption] = useState("");
    const userId = window.localStorage.getItem("userID")
    const navigate = useNavigate();
    const [taskError, setTaskError] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:8000/api/users`)
            .then(res => {
                setUser(res.data);
                console.log(user)
                console.log(Array.isArray(user))
                console.log(user[0])

            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/project", {
            projectName,
            tasks,
            description,
            dueDate,
            user,
            completedStatus,
            userOwner: userId

        },
            { withCredentials: true }
        )
            .then((res) => {
                console.log(res);
                console.log(res.data);
                setProjectList([...projectList, res.data]);
                setProjectName("");
                setTasks([]);
                setDescription("");
                setDueDate("");
                setSelectedOption("");
                setUser([]);
                alert("project created")
            })
            .catch((err) => {
                console.log(err);
            });
        navigate("/projects");
    };

    const handleProjectStatus = (e) => {
        console.log(e.target.value);
        console.log(e.target.name)
        if (e.target.name === 'completedStatus') {
            setProjectList({ ...projectList, completedStatus: !projectList.completedStatus })
        } else {
            setProjectList({ ...projectList, [e.target.name]: e.target.value })
        }
        console.log(completedStatus)
    }

    const addTask = () => {
        setTasks([...tasks, ""])

    }

    const handleTaskChange = (e, idx) => {
        e.target.value.length < 2 ?
            setTaskError('Task name must be at least 2 characters') :
            setTaskError("");
        const { value } = e.target;
        const task = tasks;
        task[idx] = value;
        setTasks(task)
    }

    console.log(tasks)
    return (
        <div>
            <Navbar />
            <div className="container-fluid vh-100 fw-bold" style={{ backgroundImage: `url(${background})`, backgroundSize: "cover" }}>
                <h2 className="page-title-add">Add a Project</h2>
                <form action="" className="form col-md-4 mx-auto" onSubmit={handleSubmit}>
                    <div className='form-group mt-3'>
                        {
                            projectName && projectName.length < 3 ? <p className='text-danger'>Project Name must be at least 2 characters</p> : ""}
                        <label htmlFor="" className='form-label'>Project Name: </label>
                        <input type="text" name='setProjectName' className="form-control" onChange={(e) => { setProjectName(e.target.value) }} />
                    </div>
                    <div className='form-group mt-3'>
                        {
                            taskError ? <p className='text-danger'>{taskError}</p> : ""
                        }
                        <label htmlFor="" className='form-label'>Tasks : </label>
                        {
                            tasks.map((task, idx) => (
                                <div key={idx}>

                                    <input type="text" name="tasks" className="form-control" onChange={(e) => { handleTaskChange(e, idx) }} />

                                </div>
                            ))}
                        <button className='task-btn' onClick={addTask} type="button">Add Tasks</button>
                    </div>
                    <div className='form-group mt-3'>
                        {
                            description && description.length < 5 ? <p className='text-danger'>Description must be at least 5 characters</p> : ""
                        }
                        <label htmlFor='' className='form-label'>Description: </label>
                        <input type="text" name="description" id="" className='form-control' onChange={(e) => { setDescription(e.target.value) }} />
                    </div>
                    <div className='form-group mt-3'>
                        {
                            !dueDate ? <p className='text-danger'>Due Date is required.</p> : ""
                        }
                        <label htmlFor='' className='form-label'> Due Date: </label>
                        <input type="date" name="dueDate" id="" className='form-control' min={new Date().toISOString().split('T')[0]} onChange={(e) => { setDueDate(e.target.value) }} />
                    </div>
                    <div className='form-group mt-3'>
                        <label htmlFor="" className="form-label">Completed?</label>
                        <input type="checkbox" name="completedStatus" onChange={handleProjectStatus}></input>
                    </div>
                    <br>
                    </br>
                    <input className="submit-input" type="submit" value="Create Project" />
                </form>
            </div>
        </div>
    )
}

export default AddProject


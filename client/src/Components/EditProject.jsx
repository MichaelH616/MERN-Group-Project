import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar'

const EditProject = () => {
    // const [projectList, setProjectList] = useState([]);
    // const [projectName, setProjectName] = useState("");
    // const [tasks, setTasks] = useState("");
    // const [description, setDescription] = useState("");
    // const [dueDate, setDueDate] = useState("");
    // const [user, setUser] = useState([]);
    // const [selectedOption, setSelectedOption] = useState("");

    const [projectList, setProjectList] = useState({});
    const [projectNameError, setProjectNameError] = useState('');
    const [projectTaskError, setProjectTaskError] = useState('');
    const [projectDescriptionError, setProjectDescriptionError] = useState('');
    const [projectDateError, setProjectDateError] = useState('');
    const navigate = useNavigate();

    const { id } = useParams();

    const date = new Date(projectList.dueDate);
    const month = String(date.getMonth() + 1).padStart(2, 0);
    const day = String(date.getDate()).padStart(2, 0);
    const formattedDate = `${date.getFullYear()}-${month}-${day}`;

    const handleProjectName = (e) => {
        e.target.value.length < 1 ?
        setProjectNameError('Project name must be at least 3 characters') :
        setProjectList({ ...projectList, [e.target.name]: e.target.value })
    }

    const handleProjectTask = (e) => {
        e.target.value.length < 1 ?
            setProjectTaskError('Tasks must be at least 3 characters') : 
            setProjectList({ ...projectList, [e.target.name]: e.target.value })
    }

    const handleProjectDescription = (e) => {
        e.target.value.length < 3 ?
            setProjectDescriptionError('Description must be at least 3 characters') :
            setProjectList({ ...projectList, [e.target.name]: e.target.value })
    }

    const handleProjectDate = (e) => {
        e.target.value === '' ?
            setProjectDateError('Date is required') :
            setProjectList({ ...projectList, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!projectDateError && !projectDescriptionError && !projectNameError && !projectTaskError) {
            axios.put(`http://localhost:8000/api/projects/${id}`, projectList,

                { withCredentials: true }
            )
                .then((res) => {
                    console.log(res);
                    navigate('/projects')
                })
                .catch(err => {
                    console.log(err);
                })
        }

    }

    useEffect(() => {
        axios.get((`http://localhost:8000/api/project/${id}`), { withCredentials: true })
            .then(res => {
                setProjectList(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    return (
        <div>
            <Navbar />
            <h1>Edit a Project</h1>
            <form action="" className="form col-md-4 mx-auto" onSubmit={handleSubmit}>
                <div className='form-group mt-3'>
                    {
                    projectNameError ? <p className='text-danger'>{projectNameError}</p> : ""}
                    <label htmlFor="" className='form-label'>Project Name: </label>
                    <input type="text" name='projectName' value={projectList.projectName} className="form-control" onChange={handleProjectName} />
                </div>
                <div className='form-group mt-3'>
                    {
                        projectTaskError ? <p className='text-danger'>{projectTaskError}</p> : ""}
                    <label htmlFor="" className='form-label'>Tasks : </label>
                    <input type="text" name="tasks" value={projectList.tasks} className="form-control" onChange={handleProjectTask} />
                </div>
                <div className='form-group mt-3'>
                    {
                        projectDescriptionError ? <p className='text-danger'>{projectDescriptionError}</p> : ""
                    }
                    <label htmlFor='' className='form-label'>Description: </label>
                    <input type="text" name="description" value={projectList.description} id="" className='form-control' onChange={handleProjectDescription} />
                </div>
                <div className='form-group mt-3'>
                    {
                        projectDateError ? <p className='text-danger'>{projectDateError}</p> : ""
                    }
                    <label htmlFor='' className='form-label'> Due Date: </label>
                    <input type="date" name="dueDate" id="" value={formattedDate} className='form-control' min={new Date().toISOString().split('T')[0]} onChange={handleProjectDate} />
                </div>
                {/* <div className='form-group mt-3'>
                <select name="user" className='form-control' onChange={(e) => { setSelectedOption([e.target.value]) }} >
                    <option value={selectedOption}>Select user</option>
                    {user.map((user) => (
                        <option key={userId} value={user}>{user.firstName} {user.lastName}</option>
                    ))
                    }
                </select>
            </div> */}
                <br>
                </br>
                <input className="submit-input" type="submit" value="Update Project" />
            </form>
        </div>
        // <div>
        //     <Navbar/>
        //     <h1>Edit a Project</h1>
        //     <form action="" className="form col-md-4 mx-auto" onSubmit={handleSubmit}>
        //         <div className='form-group mt-3'>
        //             {
        //                 projectName && projectName.length < 3 ? <p className='text-danger'>Project Name must be at least 2 characters</p> : ""}
        //             <label htmlFor="" className='form-label'>Project Name: </label>
        //             <input type="text" name='title' value={projectList.projectName} className="form-control" onChange={(e) => { setProjectName(e.target.value) }} />
        //         </div>
        //         <div className='form-group mt-3'>
        //             {
        //                 tasks && tasks.length < 3 ? <p className='text-danger'>Tasks must be at least 2 characters.</p> : ""}
        //             <label htmlFor="" className='form-label'>Tasks : </label>
        //             <input type="text" name="tasks" value={projectList.tasks} className="form-control" onChange={(e) => { setTasks(e.target.value) }} />
        //         </div>
        //         <div className='form-group mt-3'>
        //             {
        //                 description && description.length < 5 ? <p className='text-danger'>Description must be at least 5 characters</p> : ""
        //             }
        //             <label htmlFor='' className='form-label'>Description: </label>
        //             <input type="text" name="description" value={projectList.description} id="" className='form-control' onChange={(e) => { setDescription(e.target.value) }} />
        //         </div>
        //         <div className='form-group mt-3'>
        //             {
        //                 dueDate ? <p className='text-danger'>Due Date is required.</p> : ""
        //             }
        //             <label htmlFor='' className='form-label'> Due Date: </label>
        //             <input type="date" name="dueDate" id="" value={formattedDate} className='form-control' min={new Date().toISOString().split('T')[0]} onChange={(e) => { setDueDate(e.target.value) }} />
        //         </div>
        //         <div className='form-group mt-3'>
        //             <select name="user" className='form-control' onChange={(e) => { setSelectedOption([e.target.value]) }} >
        //                 <option value={selectedOption}>Select user</option>
        //                 {user.map((user) => (
        //                     <option key={userId} value={user}>{user.firstName} {user.lastName}</option>
        //                 ))
        //                 }
        //             </select>
        //         </div>
        //         <br>
        //         </br>
        //         <input className="submit-input" type="submit" value="Update Project" />
        //     </form>
        // </div>
    )
}

export default EditProject            
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import axios from 'axios';
import Navbar from './Navbar';

const AddProject = ({ setLoggedIn}) => {
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
        if(e.target.name === 'completedStatus') {
            setProjectList({...projectList, completedStatus:!projectList.completedStatus})
        } else {
            setProjectList({...projectList, [e.target.name]:e.target.value})
        }
        console.log(completedStatus)
    }

    const addTask = () => {
        setTasks([...tasks,""])

    }

    const handleTaskChange = (e, idx) => {
        e.target.value.length < 2? 
        setTaskError('Task name must be at least 2 characters'):
        setTaskError("");
        const {value} = e.target;
        const task = tasks ;
        task[idx] = value;
        setTasks(task)
    }

    console.log(tasks)
    return (
        <div>
            <Navbar />
            <h1>Add a Project</h1>
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
                                
                                // tasks && tasks.length < 2 ? <p className='text-danger'>Tasks must be at least 2 characters.</p> : ""
                }
                    <label htmlFor="" className='form-label'>Tasks : </label>
                    {
                    tasks.map((task, idx) => (
                        <div key={idx}>

                            <input type="text" name="tasks" className="form-control" onChange={(e) => {handleTaskChange(e, idx) }} />
                            
                        </div>
                    ))}
                    <button onClick={addTask} type="button">Add Tasks</button>
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
                {/* <div className='form-group mt-3'>
                    <select name="user" className='form-control' onChange={(e) => { setSelectedOption([e.target.value]) }} >
                        <option value={selectedOption}>Select user</option>
                        {user.map((user) => (
                            <option key={user._id} value={user}>{user.firstName} {user.lastName}</option>
                        ))
                        }
                    </select>
                </div> */}
                <br>
                </br>
                <input className="submit-input" type="submit" value="Create Project" />
            </form>
        </div>
    )
}

export default AddProject

// import React, {useState} from 'react';
// import axios from 'axios';

// const AddProject = (props, {userId}) => {
//     const {projectList, setProjectList} = props
//     const [projectName, setProjectName] = useState ("");
//     const [tasks, setTasks] = useState ("");
//     const [description, setDescription] = useState ("");
//     const [dueDate, setDueDate] = useState ("");
//     const [users, setUsers] = useState ("");

//     const handleSubmit = (e)=>{
//         e.preventDefault();


//     axios.post(("http://localhost:8000/api/project",{projectName, tasks, description, dueDate, users}),  {withCredentials:true})

//         .then((res)=>{
//             console.log(res);
//             console.log(res.data);
//             setProjectList([...projectList, res.data]);
//             setProjectName("");
//             setTasks("");
//             setDescription("");
//             setDueDate("");
//             setUsers("");
//             })
//         .catch((err)=>{
//             console.log(err);
//             });
//     }

//     return (
//         <div>
//             <h1>Add a Project</h1>
//             <form action="" className="form col-md-4 mx-auto" onSubmit={handleSubmit}>
//                 <div className='form-group mt-3'>
//                     {
//                     projectName && projectName.length < 3 ? <p className='text-danger'>Project Name must be at least 2 characters</p>:""}
//                     <label htmlFor="" className='form-label'>Project Name: </label>
//                     <input type="text" name='setProjectName' className="form-control" onChange={(e)=>{setProjectName
//                 (e.target.value)}}/>
//                 </div>
//                 <div className='form-group mt-3'>
//                     {
//                     tasks && tasks.length < 3 ? <p className='text-danger'>Tasks must be at least 2 characters.</p>:""}
//                     <label htmlFor="" className='form-label'>Tasks : </label>
//                     <input type="text" name="tasks" className="form-control" onChange={(e)=>{setTasks(e.target.value)}}  />
//                 </div>
//                 <div className='form-group mt-3'>
//                     {
//                     description && description.length < 5 ? <p className='text-danger'>Description must be at least 5 characters</p>:""
//                     }
//                     <label htmlFor='' className='form-label'>Description: </label>
//                     <input type="text" name="description" id=""className='form-control' onChange={(e)=>{setDescription(e.target.value)}} />
//                 </div>
//                 <div className='form-group mt-3'>
//                     {
//                     dueDate ? <p className='text-danger'>Due Date is required.</p>:""
//                     }
//                     <label htmlFor='' className='form-label'> Due Date: </label>
//                     <input type="date" name="dueDate" id=""className='form-control' onChange={(e)=>{setDueDate(e.target.value)}} />
//                 </div>
//                 <div className='form-group mt-3'>
//                     {
//                     users && users.length < 2 ? <p className='text-danger'>User is required.</p>:""
//                     }
//                     <label htmlFor='' className='form-label'>User(s): </label>
//                     <input type="text" name="member" id=""className='form-control' onChange={(e)=>{setUsers(e.target.value)}} />
//                 </div>
//                 <br>
//                 </br>
//                 <input className="submit-input" type="submit" value="Create Project" />
//             </form>
//         </div>
//     )
// }

// export default AddProject
// import React, {useState, useEffect} from 'react';
// import {useNavigate} from "react-router-dom"
// import axios from 'axios';

// const AddProject = (props, {setLoggedIn}, {userId}) => {
//     const [projectList, setProjectList] = useState([]);
//     const [projectName, setProjectName] = useState("");
//     const [tasks, setTasks] = useState("");
//     const [description, setDescription] = useState("");
//     const [dueDate, setDueDate] = useState("");
//     const [user, setUser] = useState([]);
//     const navigate = useNavigate();

//     useEffect(() => {
//         axios.get(`http://localhost:8000/api/users`)
//             .then(res => {
//                 setUser(res.data);
//             })
//             .catch(err => {
//                 console.log(err);
//             });
//     }, []);

//     const handleSubmit = (e)=>{
//         e.preventDefault();
//         axios.post("http://localhost:8000/api/project", {
//                 projectName,
//                 tasks,
//                 description,
//                 dueDate,
//                 userId: selectedUser.id
//             },
//             {withCredentials:true}
//         )
//             .then((res)=>{
//                 console.log(res);
//                 console.log(res.data);
//                 setProjectList([...projectList, res.data]);
//                 setProjectName("");
//                 setTasks("");
//                 setDescription("");
//                 setDueDate("");
//                 setSelectedUser(null);
//             })
//             .catch((err)=>{
//                 console.log(err);
//             });
//             navigate("/projects");
//     };

//     const [selectedUser, setSelectedUser] = useState(null);

//     const handleUserelect = (e) => {
//         const userId = e.target.value;
//         setSelectedUser(user.find(user => user._id === (userId)));
//     }           
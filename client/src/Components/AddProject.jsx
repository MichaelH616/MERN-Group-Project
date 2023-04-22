import React, {useState} from 'react';
import axios from 'axios';

const AddProject = (props) => {
    const {projectList, setProjectList} = props 
    const [projectName, setProjectName] = useState ("");
    const [tasks, setTasks] = useState ("");
    const [description, setDescription] = useState ("");
    const [dueDate, setDueDate] = useState ("");
    const [users, setUsers] = useState ("");

    const handleSubmit = (e)=>{
        e.preventDefault();

    axios.post("http://localhost:8000/api/project",{projectName, tasks, description, dueDate, users})
        .then((res)=>{
            console.log(res);
            console.log(res.data);
            setProjectList([...projectList, res.data]);
            setProjectName("");
            setTasks("");
            setDescription("");
            setDueDate("");
            setUsers("");
            })
        .catch((err)=>{
            console.log(err);
            });
    }

    return ( 
        <div>
            <h1>Add a Project</h1>
            <form action="" className="form col-md-4 mx-auto" onSubmit={handleSubmit}>
                <div className='form-group mt-3'>
                    {
                    projectName && projectName.length < 3 ? <p className='text-danger'>Project Name must be at least 2 characters</p>:""}
                    <label htmlFor="" className='form-label'>Project Name: </label>
                    <input type="text" name='setProjectName' className="form-control" onChange={(e)=>{setProjectName
                (e.target.value)}}/>
                </div>
                <div className='form-group mt-3'>
                    {
                    tasks && tasks.length < 3 ? <p className='text-danger'>Tasks must be at least 2 characters.</p>:""}
                    <label htmlFor="" className='form-label'>Tasks : </label>
                    <input type="text" name="tasks" className="form-control" onChange={(e)=>{setTasks(e.target.value)}}  />
                </div>
                <div className='form-group mt-3'>
                    {
                    description && description.length < 5 ? <p className='text-danger'>Description must be at least 5 characters</p>:""   
                    }
                    <label htmlFor='' className='form-label'>Description: </label>
                    <input type="text" name="description" id=""className='form-control' onChange={(e)=>{setDescription(e.target.value)}} />
                </div>
                <div className='form-group mt-3'>
                    {
                    dueDate ? <p className='text-danger'>Due Date is required.</p>:""
                    }
                    <label htmlFor='' className='form-label'> Due Date: </label>
                    <input type="date" name="dueDate" id=""className='form-control' onChange={(e)=>{setDueDate(e.target.value)}} />
                </div>
                <div className='form-group mt-3'>
                    {
                    users && users.length < 2 ? <p className='text-danger'>User is required.</p>:""
                    }
                    <label htmlFor='' className='form-label'>User(s): </label>
                    <input type="text" name="member" id=""className='form-control' onChange={(e)=>{setUsers(e.target.value)}} />
                </div>
                <br>
                </br>
                <input className="submit-input" type="submit" value="Create" />
            </form>
        </div>
    )
}

export default AddProject            
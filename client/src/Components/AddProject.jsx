import React, {useState} from 'react';
import axios from 'axios';

const AddProject = (props) => {
    const {projectList, setProjectList} = props 
    const [title, setTitle] = useState ("");
    const [tasks, setTasks] = useState ("");
    const [description, setDescription] = useState ("");
    const [dueDate, setDueDate] = useState ("");
    const [member, setMember] = useState ("");

    const handleSubmit = (e)=>{
        e.preventDefault();

    axios.post("http://localhost:8000/api/project",{title, tasks, description, dueDate, member})
        .then((res)=>{
            console.log(res);
            console.log(res.data);
            setProjectList([...projectList, res.data]);
            setTitle("");
            setTasks("");
            setDescription("");
            setDueDate("");
            setMember("");
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
                    title && title.length < 3 ? <p className='text-danger'>Title must be at least 2 characters</p>:""}
                    <label htmlFor="" className='form-label'>Title: </label>
                    <input type="text" name='title' className="form-control" onChange={(e)=>{setTitle(e.target.value)}}/>
                </div>
                <div className='form-group mt-3'>
                    {
                    tasks && tasks.length < 3 ? <p className='text-danger'>Tasks must be at least 2 characters.</p>:""}
                    <label htmlFor="" className='form-label'>Tasks : </label>
                    <input type="number" name="tasks" className="form-control" onChange={(e)=>{setTasks(e.target.value)}}  />
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
                    member && member.length < 2 ? <p className='text-danger'>Member is required.</p>:""
                    }
                    <label htmlFor='' className='form-label'>Member(s): </label>
                    <input type="text" name="member" id=""className='form-control' onChange={(e)=>{setMember(e.target.value)}} />
                </div>
                <br>
                </br>
                <input className="submit-input" type="submit" value="Create" />
            </form>
        </div>
    )
}

export default AddProject            
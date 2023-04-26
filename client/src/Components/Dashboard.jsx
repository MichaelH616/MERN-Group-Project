import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import Navbar from "./Navbar";

const Dashboard = (props) => {
    console.log(props)
    const {projectList, setProjectList} = props;
    const { userId } = useParams();

    useEffect(() => {
        axios.get((`http://localhost:8000/api/projects`), {withCredentials:true})
        .then((res) => {
            console.log(res.data.Project);

            if (Array.isArray (res.data.Project)){

                setProjectList(res.data.Project);
            }else{
                console.log("Error response data is not an array")
            }

        })
        .catch((err) => {
        console.log(err);
        });
    }, []);
    


    const removeFromDOM = id => {
        axios.delete(`http://localhost:8000/api/projects/${id}`)
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
        <div className='container'>
        <table className="table table-bordered my-4">
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
                    <td>{project.projectName}</td>
                    <td>{project.tasks}</td>
                    <td>{formattedDate}</td>
                    <td>{project.completedStatus ? 'True':'False'}</td>
                    <td> 
                    <button className="btn btn-primary"><Link to={`/project/${project._id}`}>Edit</Link></button> 
                    <button className="btn btn-info"><Link to={`/projects/${project._id}`}>View</Link></button>
                    <button className="btn btn-danger" onClick={(e)=>{removeFromDOM(project._id)}}>Delete</button>
                    </td>
                </tr> )
            })
            }
        </tbody>
        </table>
        </div>
    </div>
    );
};

export default Dashboard;


//     const [projectList, setProjectList] = useState("");
//     const { userId } = useParams();

//     useEffect(() => {
//         axios.get("http://localhost:8000/api/projects")
//             .then(res => {
//                 setProjectList(res.data.Project2);
//             })
//             .catch(err => {
//                 console.log(err);
//             });
//     }, []);

// return (
//     <div>
//         <table className="table table-bordered">
//         <thead>
//             <tr>
//             <th scope="col">Project Name</th>
//             <th scope="col">Tasks</th>
//             <th scope="col">Member(s)</th>
//             <th scope="col">Due Date</th>
//             <th scope="col">Completed</th>
//             <th scope="col">Actions</th>
//             </tr>
//         </thead>
//         <tbody>
//             {projectList?.map((projectList) => (
//             <tr key={userId}>
//                 <td>{projectList.projectName}</td>
//                 <td>{projectList.tasks}</td>
//                 <td>{userId}</td>
//                 <td>{projectList.dueDate}</td>
//                 <td>{projectList.completed ? "True" : "False"}</td>
//                 <td>
//                 <button className="btn btn-primary">Edit</button>
//                 <button className="btn btn-danger">Delete</button>
//                 </td>
//             </tr>
//             ))}
//         </tbody>
//         </table>
//     </div>
//     );
// };

// export default Dashboard;
// import React from "react";

// const Dashboard = (props, {userId}) => {
//     return (
//         <div>
//             <table className="table table-bordered">
//     <thead>
//     <tr>
//         <th scope="col">Project Name</th>
//         <th scope="col">Tasks</th>
//         <th scope="col">Member(s)</th>
//         <th scope="col">Due Date</th>
//         <th scope="col">Completed</th>
//         <th scope="col">Actions</th>
//     </tr>
//     </thead>
//     <tbody>
//     <tr>
//         <th scope="row">1</th>
//         <td>Mark</td>
//         <td>Otto</td>
//         <td>@mdo</td>
//     </tr>
//     <tr>
//         <th scope="row">2</th>
//         <td>Jacob</td>
//         <td>Thornton</td>
//         <td>@fat</td>
//     </tr>
//     <tr>
//         <th scope="row">3</th>
//         <td colspan="2"></td>
//         <td></td>
//     </tr>
//     </tbody>
// </table>
//         </div>
//     )
// }

// export default Dashboard
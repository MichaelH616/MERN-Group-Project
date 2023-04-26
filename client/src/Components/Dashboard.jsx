import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";

const Dashboard = (props) => {
    const {projectList, setProjectList} = props;
    const { userId } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/projects`)
        .then((res) => {
        setProjectList(res.data);
        console.log(res.data.Project);
        })
        .catch((err) => {
        console.log(err);
        });
    }, []);

    console.log(projectList)
    return (
    <div>
        <table className="table table-bordered">
        <thead>
            <tr>
            <th scope="col">Project Name</th>
            <th scope="col">Tasks</th>
            <th scope="col">Member(s)</th>
            <th scope="col">Due Date</th>
            <th scope="col">Completed</th>
            <th scope="col">Actions</th>
            </tr>
        </thead>
        <tbody>
            {projectList.Project.map((projectList, index) => {
                return ( 
                    <tr key={index}>
                    <td>{projectList.projectName}</td>
                    <td>{projectList.tasks}</td>
                    {/* <td>{projectList.user.firstName.join(", ")}</td> */}
                    <td>{projectList.dueDate}</td>
                    <td>{projectList.completed ? "True" : "False"}</td>
                    <td> 
                    <button className="btn btn-primary"><Link to={`projects/${projectList._id}`}>Edit</Link></button> 
                    <button className="btn btn-danger">View</button> 
                    </td>
                </tr> )
            })
            }
        </tbody>
        </table>
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
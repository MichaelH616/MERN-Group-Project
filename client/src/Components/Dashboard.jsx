import React from "react";

const Dashboard = (props) => {
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
    <tr>
        <th scope="row">1</th>
        <td>Mark</td>
        <td>Otto</td>
        <td>@mdo</td>
    </tr>
    <tr>
        <th scope="row">2</th>
        <td>Jacob</td>
        <td>Thornton</td>
        <td>@fat</td>
    </tr>
    <tr>
        <th scope="row">3</th>
        <td colspan="2"></td>
        <td></td>
    </tr>
    </tbody>
</table>
        </div>
    )
}

export default Dashboard
import React from 'react';
import {  Link } from "react-router-dom";


const Navbar= () =>{
    return (
        <nav className="nav">
            <a href='/' className='site-title'>Project Manager</a>
            <ul>
                <li>
                    <a href="/projects">Dashboard</a>
                </li>
                <li>
                    <a href="/project">Add Project</a>
                </li>
                <li>
                    <a href="/view">View All Projects</a>
                </li>
                <li>
                    <a href="/edit">Edit Project</a>
                </li>
                <li>
                    <a href='/logout'>Logout</a>
                </li>
            </ul>
        </nav>
    );
}
export default Navbar;
import React from 'react';
import {  Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Navbar= (props) =>{
    const{userInfo, setUserInfo} = props
    const Navigate = useNavigate ()
    const logout = () => {
        axios.post('http://localhost:8000/api/users/logout', {}, {withCredentials: true})
            .then(res => {
                console.log(res);
                setUserInfo({
                    firstName:"",
                    lastName:"",
                    email:"",
                    password:"",
                }) 
                Navigate("/");
            })
    }

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
                <Link onClick={logout} className="nav-link mx-5">Logout</Link>
                </li>
            </ul>
        </nav>
    );
}
export default Navbar;
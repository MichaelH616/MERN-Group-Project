import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Dashboard from './Components/Dashboard';
import AddProject from './Components/AddProject';
import RegisterForm from './Components/RegisterForm';
import SignIn from './Components/SignIn';

function App() {
  
 
  return (
    <div>
      <Routes>
        <Route path="/projects" element={<Dashboard/>} />
        <Route path="/project" element={<AddProject/>} />
        <Route path ="/register" element={<RegisterForm/>}/>
        <Route path = "/signin" element = {<SignIn/>}/>
        <Route/>
      </Routes>
    </div>
  );
}

export default App;

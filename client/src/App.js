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
        <Route path ="/" default element={<RegisterForm/>}/>
        <Route path = "/signin" element = {<SignIn/>}/>
        <Route path="*" element={<h1>404 - Page Not Found</h1>}/>
      </Routes>
    </div>
  );
}

export default App;

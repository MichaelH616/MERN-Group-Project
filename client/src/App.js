import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Dashboard from './Components/Dashboard';
import AddProject from './Components/AddProject';
import Navbar from './Components/Navbar';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/projects" element={<Dashboard/>} />
        <Route path="/project" element={<AddProject/>} />
        <Route/>
      </Routes>
    </div>
  );
}

export default App;

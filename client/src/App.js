import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Dashboard from './Components/Dashboard';
import AddProject from './Components/AddProject';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/projects" element={<Dashboard/>} />
        <Route path="/project" element={<AddProject/>} />
        <Route/>
      </Routes>
    </div>
  );
}

export default App;

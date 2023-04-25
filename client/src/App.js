import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Dashboard from './Components/Dashboard';
import AddProject from './Components/AddProject';
import RegisterForm from './Components/RegisterForm';
import SignIn from './Components/SignIn';

function App() {

  const[userId, setUserId] = useState(null);
  
  return (
    <div>
      <Routes>
      <Route path="/projects" element={<Dashboard userId={userId}/>} />
        <Route path="/project" element={<AddProject userId={userId}/>} />
        <Route path ="/" default element={<RegisterForm setUserId={setUserId}/>}/>
        <Route path = "/signin" element = {<SignIn setUserId={setUserId}/>}/>
        <Route path="*" element={<h1>404 - Page Not Found</h1>}/>
      </Routes>
    </div>
  );
}

export default App;

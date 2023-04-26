import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Dashboard from './Components/Dashboard';
import AddProject from './Components/AddProject';
import RegisterForm from './Components/RegisterForm';
import SignIn from './Components/SignIn';
import EditProject from './Components/EditProject';
import ViewOne from './Components/ViewOne';

function App() {

  const[userId, setUserId] = useState(null);
  const [projectList, setProjectList] = useState([]);
  
  return (
    <div>
      <Routes>
        <Route path="/projects" element={<Dashboard projectList={projectList} setProjectList={setProjectList} userId={userId}/>} />
        <Route path="/project" element={<AddProject userId={userId}/>} />
        <Route path="/project/:id" element={<EditProject projectList={projectList} setProjectList={setProjectList}/>}/>
        <Route path="/projects/:id" element={<ViewOne projectList={projectList} setProjectList={setProjectList}/>}/>
        <Route path ="/" default element={<RegisterForm setUserId={setUserId}/>}/>
        <Route path = "/signin" element = {<SignIn setUserId={setUserId}/>}/>
        <Route path="*" element={<h1>404 - Page Not Found</h1>}/>
      </Routes>
    </div>
  );
}

export default App;

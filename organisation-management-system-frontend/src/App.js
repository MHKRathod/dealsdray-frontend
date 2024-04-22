import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './pages/signUp/signUp';
import Login from "./pages/Login/login";
import Dashboard from './pages/Dashboard/Dashboard';
import EmployeeList from './pages/EmployeeList/EmployeeList';
import CreateEmployeeForm from './pages/EmployeeCreate/EmployeeCreate';
import UpdateEmployeeForm from './pages/EmployeeUpdate/EmployeeUpdate';
import OrganizationalTree from './pages/organisation/Tree-structure';

function App() {
  const [username, setUsername] = useState(null);

  const handleLogin = (loggedInUsername) => {
    setUsername(loggedInUsername);
  };

  const handleLogout = () => {
    setUsername(null);
  };

  
  return (
    <Router>
      <div>
       <Routes>
          <Route path="/signup" exact element={<SignUp/>}/>
          <Route path="/" exact element={<Login onLogin={handleLogin} />} />
          <Route path="/dashboard" element={<Dashboard  username={username} onLogout={handleLogout}/>} />
          <Route path="/employee" element={<CreateEmployeeForm/>} />
          <Route path="/employeeList" element={<EmployeeList/>} />
          <Route path="/employeeUpdate/:id" element={<UpdateEmployeeForm/>} />
          <Route path="/organization" element={<OrganizationalTree/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App; 

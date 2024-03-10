import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./pages/Login/login"; // Ensure that you import Login without curly braces
import Dashboard from './pages/Dashboard/Dashboard';
import EmployeeList from './pages/EmployeeList/EmployeeList';
import CreateEmployeeForm from './pages/EmployeeCreate/EmployeeCreate';
import UpdateEmployeeForm from './pages/EmployeeUpdate/EmployeeUpdate';
function App() {
  return (
    <Router>
      <div>
       <Routes>
          <Route path="/login" exact element={<Login />} /> {/* Render Login component using the 'element' prop */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employee" element={<CreateEmployeeForm/>} /> {/* Assuming Dashboard component is rendered similarly */}
          <Route path="/employeeList" element={<EmployeeList/>} />
          <Route path="/employeeUpdate/:id" element={<UpdateEmployeeForm/>} />
          {/* Other routes */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
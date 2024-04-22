import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './EmployeeList.css';

const EmployeeList = () => {
    
    const [employees, setEmployees] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [sortKey, setSortKey] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [employeesPerPage] = useState(3);

    // Fetch employee list when component mounts
    useEffect(() => {
        fetchEmployeeList();
    }, []);

    
    const fetchEmployeeList = async () => {
        try {
            const response = await axios.get('https://xto10x-24f21250d5a0.herokuapp.com/api/employees');
            // Fetch manager names and update state
            const employeesWithManagerNames = await Promise.all(response.data.map(async employee => {
                // Check if employee has a manager
                if (employee.manager) {
                    try {
                        // Fetch manager details
                        const managerResponse = await axios.get(`https://xto10x-24f21250d5a0.herokuapp.com/api/employees/${employee.manager}`);
                        const managerName = managerResponse.data.employee.name ? managerResponse.data.employee.name : "No Manager";
                        // Return employee object with manager name
                        return { 
                            ...employee, 
                            manager: managerName
                        };
                    } catch (error) {
                        console.error('Error fetching manager details:', error);
                        return { ...employee, manager: "No Manager" };
                    }
                } else {
                    // If employee has no manager, set manager name to "No Manager"
                    return { ...employee, manager: "No Manager" };
                }
            }));
            // Update employees state
            setEmployees(employeesWithManagerNames);
        } catch (error) {
            console.error('Error fetching employee list:', error);
        }
    };
    
    
    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://xto10x-24f21250d5a0.herokuapp.com/api/employees/delete/${id}`);
            // Remove deleted employee from state
            setEmployees(employees.filter(employee => employee._id !== id));
            console.log('Employee with ID:', id, 'deleted successfully');
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
    };

    // Sort employees by key
    const handleSort = (key) => {
        setSortKey(key);
    };

    // Paginate employees
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Filter employees based on search keyword
    const filteredEmployees = employees.filter((employee) =>
        employee.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        employee.mobile.toLowerCase().includes(searchKeyword.toLowerCase())
    );

    // Sort filtered employees
    const sortedEmployees = sortKey ? [...filteredEmployees].sort((a, b) => {
        if (a[sortKey] < b[sortKey]) return -1;
        if (a[sortKey] > b[sortKey]) return 1;
        return 0;
    }) : filteredEmployees;

    // Pagination calculations
    const indexOfLastEmployee = currentPage * employeesPerPage;
    const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
    const currentEmployees = sortedEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

   
    return (
        <div className="employee-list-container">
            <h2>Employee List</h2>
            <input type="text" placeholder="Search" value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} /> 
            <table className="employee-list-table">
                <thead>
                    <tr>
                        <th onClick={() => handleSort('name')}>Name</th>
                        <th onClick={() => handleSort('email')}>Email</th>
                        <th onClick={() => handleSort('mobile')}>Mobile No</th>
                        <th onClick={() => handleSort('designation')}>Designation</th>
                        <th onClick={() => handleSort('gender')}>Gender</th>
                        <th>Courses</th>
                        <th>Manager</th>
                        <th>Create Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentEmployees.map((employee) => (
                        <tr key={employee._id}>
                            <td>{employee.name}</td>
                            <td>{employee.email}</td>
                            <td>{employee.mobile}</td>
                            <td>{employee.designation}</td>
                            <td>{employee.gender}</td>
                            <td>{employee.courses.join(', ')}</td>
                            <td>{employee.manager}</td>
                            <td>{new Date(employee.createDate).toLocaleDateString()}</td>
                            <td>  
                                <Link to={{ pathname: `/employeeUpdate/${employee._id}`, state: { employeeData: employee } }} className="edit-link">Edit</Link>
                                <button onClick={() => handleDelete(employee._id)} className='button-spacing'>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Pagination */}
            <ul className="pagination">
                {Array.from({ length: Math.ceil(sortedEmployees.length / employeesPerPage) }).map((_, index) => (
                    <li key={index} className={currentPage === index + 1 ? 'active' : ''}>
                        <button onClick={() => paginate(index + 1)}>{index + 1}</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EmployeeList;

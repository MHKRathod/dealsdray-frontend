import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [sortKey, setSortKey] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [employeesPerPage] = useState(3); // Number of employees to display per page

    useEffect(() => {
        fetchEmployeeList();
    }, []);

    const fetchEmployeeList = async () => {
        try {
            const response = await axios.get('https://dealsdray-08a41365016a.herokuapp.com/api/employees');
            setEmployees(response.data);
        } catch (error) {
            console.error('Error fetching employee list:', error);
        }
    };

    const handleDelete = (id) => {
        // Handle delete action
        console.log('Delete employee with ID:', id);
    };

    const filteredEmployees = employees.filter((employee) =>
        employee.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        employee.mobile.toLowerCase().includes(searchKeyword.toLowerCase())
    );

    const sortedEmployees = sortKey ? [...filteredEmployees].sort((a, b) => {
        if (a[sortKey] < b[sortKey]) return -1;
        if (a[sortKey] > b[sortKey]) return 1;
        return 0;
    }) : filteredEmployees;

    const indexOfLastEmployee = currentPage * employeesPerPage;
    const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
    const currentEmployees = sortedEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            <h2>Employee List</h2>
            <input type="text" placeholder="Search" value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} />
            <table>
                <thead>
                    <tr>
                        <th onClick={() => setSortKey('name')}>Name</th>
                        <th onClick={() => setSortKey('email')}>Email</th>
                        <th onClick={() => setSortKey('mobile')}>Mobile No</th>
                        <th>Designation</th>
                        <th>Gender</th>
                        <th>Course</th>
                        <th>Create date</th>
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
                            <td>{employee.createDate}</td>
                            <td>
                            <Link
    to={{
        pathname: `/employeeUpdate/${employee._id}`,
        state: { employeeData: employee }
    }}
>
    Edit
</Link>
                                <button onClick={() => handleDelete(employee._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    {console.log("Employeedata :", currentEmployees)},
                </tbody>
            </table>
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

import React, { Fragment, useState } from 'react';
import EmployeeInput from '../../components/EmployeeInput/EmployeeInput';
import axios from "axios";
import ModalComponent from '../../components/Modal/ModalCreate';
import './EmployeeCreate.css'; 


const CreateEmployeeForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        designation: 'HR',
        gender: '',
        courses: [],
        manager: '', 
    });
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [managerData, setManagerData] = useState(null); 

    const handleInputChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleManagerSearch = async (managerName) => {
        try {
            const response = await axios.get(`https://xto10x-24f21250d5a0.herokuapp.com/api/employees`);
            const employees = response.data; // Assuming response.data is an array of employees
            const filteredEmployees = employees.filter(employee => employee.name.toLowerCase().includes(managerName.toLowerCase()));
            setManagerData(filteredEmployees); // Store filtered manager data in state
        } catch (error) {
            console.error('Error searching for manager:', error);
        }
    };

    const handleManagerSelect = (managerId) => {
        setFormData({ ...formData, manager: managerId }); // Set selected manager ID in form data
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('Form Data:', formData);
            const response = await axios.post('https://xto10x-24f21250d5a0.herokuapp.com/api/employees', formData); 
            console.log('Employee created:', response.data);
            
            // Reset form data
            setFormData({
                name: '',
                email: '',
                mobile: '',
                designation: 'HR',
                gender: '',
                courses: [],
                manager: '', 
            });

            setModalIsOpen(true); // Open modal after successful submission
            
        } catch (error) {
            console.error('Error creating employee:', error);
            console.log('Error response:', error.response);
        }
    }

    return (
        <Fragment>
            <h1 className="heading-1">Registration Form</h1>
            <div className="form-container">
                <form onSubmit={handleSubmit} className="form">
                    <EmployeeInput label="Name" name="name" type="text" value={formData.name} onChange={handleInputChange} required />
                    <EmployeeInput label="Email" name="email" type="email" value={formData.email} onChange={handleInputChange} required />
                    <EmployeeInput label="Mobile No" name="mobile" type="text" pattern="[0-9]{10}" value={formData.mobile} onChange={handleInputChange} required />
                    <EmployeeInput label="Designation" name="designation" type="select" value={formData.designation} onChange={handleInputChange} options={[
                           { label: 'HR', value: 'HR' },
                           { label: 'SDE', value: 'SDE' },
                           { label: 'SDE2', value: 'SDE2' },
                           { label: 'Service Engineer', value: 'Service Engineer' },
                           { label: 'Data Scientist', value: 'Data Scientist' }
                    ]} required />
                    <EmployeeInput label="Gender" name="gender" type="radio" value={formData.gender} onChange={handleInputChange} options={[
                        { label: 'Male', value: 'Male' },
                        { label: 'Female', value: 'Female' }
                    ]} required />
                    <EmployeeInput label="Courses" name="courses" type="checkbox" value={formData.courses} onChange={handleInputChange} options={[
                       { label: 'B.Tech', value: 'B.Tech' },
                       { label: 'M.Tech', value: 'M.Tech' },
                       { label: 'B.Sc', value: 'B.Sc' },
                       { label: 'M.Sc', value: 'M.Sc' }
                    ]} />
                    <div>
                        <label htmlFor="manager" className="Manager-class">Manager:</label>
                        <input
                            type="text"
                            id="manager"
                            value={formData.manager}
                            onChange={(e) => {
                                handleInputChange('manager', e.target.value);
                                handleManagerSearch(e.target.value);
                            }}
                            className="input" 
                            style={{ backgroundColor: 'white' }} 
                        />
                        {managerData && (
                            <ul className="manager-list">
                                {managerData.map(manager => (
                                    <li 
                                        key={manager._id} 
                                        onClick={() => handleManagerSelect(manager._id)} 
                                    >
                                        {manager.name}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <button type="submit" className="submit-button">Submit</button>

                </form>
            </div>

            <ModalComponent isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} />

        </Fragment>
    );
};

export default CreateEmployeeForm;
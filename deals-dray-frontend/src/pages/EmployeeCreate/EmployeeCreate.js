// CreateEmployeeForm.js
import React, { Fragment, useState } from 'react';
import EmployeeInput from './EmployeeInput';
import axios from "axios";

const CreateEmployeeForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        designation: 'HR',
        gender: '',
        courses: [],
        img: null
    });

    const handleInputChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('Form Data:', formData);
            const response = await axios.post('https://dealsdray-08a41365016a.herokuapp.com/api/employees', formData); // Send data to the backend endpoint
            console.log('Employee created:', response.data);
            
            // Fetch updated employee list after creating a new employee
            const updatedEmployeeList = await axios.get('https://dealsdray-08a41365016a.herokuapp.com/api/employees');
            console.log('Updated Employee List:', updatedEmployeeList.data);
            
            // Optionally, you can update the UI to display the updated employee list
            
        } catch (error) {
            console.error('Error creating employee:', error);
            console.log('Error response:', error.response);
            // Handle error
        }
    }

    return (
        <Fragment>
            <h1 className="heading-1">Registration Form</h1>
            <div className="form-container">
                <form onSubmit={handleSubmit} className="form">
                    <EmployeeInput label="Name" name="name" type="text" id="name" value={formData.name} onChange={handleInputChange} required />
                    <EmployeeInput label="Email" name="email" type="email" id="email" value={formData.email} onChange={handleInputChange} required />
                    <EmployeeInput label="Mobile No" name="mobile" type="text" pattern="[0-9]{10}" id="mobile" value={formData.mobile} onChange={handleInputChange} required />
                    <EmployeeInput label="Designation" name="designation" type="select" id="designation" value={formData.designation} onChange={handleInputChange} options={[
                        { label: 'HR', value: 'HR' },
                        { label: 'Manager', value: 'Manager' },
                        { label: 'Sales', value: 'Sales' }
                    ]} required />
                    <EmployeeInput label="Gender" name="gender" type="radio" id="gender" value={formData.gender} onChange={handleInputChange} options={[
                        { label: 'Male', value: 'Male' },
                        { label: 'Female', value: 'Female' }
                    ]} required />
                    <EmployeeInput label="Courses" name="courses" type="checkbox" id="courses" value={formData.courses} onChange={handleInputChange} options={[
                        { label: 'MCA', value: 'MCA' },
                        { label: 'BCA', value: 'BCA' },
                        { label: 'BSC', value: 'BSC' }
                    ]} />
                    <EmployeeInput label="Img Upload" name="img" type="file" id="img" onChange={handleInputChange} required />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </Fragment>
    );
};

export default CreateEmployeeForm;

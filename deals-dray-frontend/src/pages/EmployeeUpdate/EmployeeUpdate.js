import React, { Fragment, useState, useEffect } from 'react';
import { useParams,useLocation } from 'react-router-dom';
import EmployeeInput from '../EmployeeCreate/EmployeeInput';
import axios from "axios";

const UpdateEmployeeForm = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        designation: '',
        gender: '',
        courses: [],
        img: null
    });

    useEffect(() => {

    const fetchEmployeeDetails = async () => {
        try {
            const response = await axios.get(`https://dealsdray-08a41365016a.herokuapp.com/api/employees/${id}`);
            const employeeData = response.data;
            setFormData({
                name: employeeData.name,
                email: employeeData.email,
                mobile: employeeData.mobile,
                designation: employeeData.designation,
                gender: employeeData.gender,
                courses: employeeData.courses,
                img: employeeData.img
            });
        } catch (error) {
            console.error('Error fetching employee details:', error);
        }
    }
    fetchEmployeeDetails();
}, [id]);

    const handleInputChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`https://dealsdray-08a41365016a.herokuapp.com/api/edit/${id}`, formData);
            console.log('Employee updated:', response.data);
            // Optionally, you can redirect or show a success message here
        } catch (error) {
            console.error('Error updating employee:', error);
            // Handle error
        }
    }

    return (
        <Fragment>
            <h1 className="heading-1">Update Employee</h1>
            <div className="form-container">
                <form onSubmit={handleSubmit} className="form">
                    <EmployeeInput label="Name" name="name" type="text" value={formData.name} onChange={handleInputChange} required />
                    <EmployeeInput label="Email" name="email" type="email" value={formData.email} onChange={handleInputChange} required />
                    <EmployeeInput label="Mobile No" name="mobile" type="text" pattern="[0-9]{10}" value={formData.mobile} onChange={handleInputChange} required />
                    <EmployeeInput label="Designation" name="designation" type="select" value={formData.designation} onChange={handleInputChange} options={[
                        { label: 'HR', value: 'HR' },
                        { label: 'Manager', value: 'Manager' },
                        { label: 'Sales', value: 'Sales' }
                    ]} required />
                    <EmployeeInput label="Gender" name="gender" type="radio" value={formData.gender} onChange={handleInputChange} options={[
                        { label: 'Male', value: 'Male' },
                        { label: 'Female', value: 'Female' }
                    ]} required />
                    <EmployeeInput label="Courses" name="courses" type="checkbox" value={formData.courses} onChange={handleInputChange} options={[
                        { label: 'MCA', value: 'MCA' },
                        { label: 'BCA', value: 'BCA' },
                        { label: 'BSC', value: 'BSC' }
                    ]} />
                    <EmployeeInput label="Img Upload" name="img" type="file" onChange={handleInputChange} />
                    <button type="submit">Update</button>
                </form>
            </div>
        </Fragment>
    );
};

export default UpdateEmployeeForm;
